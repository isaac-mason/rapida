/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import {
  World,
  NaiveBroadphase,
  SAPBroadphase,
  Vec3,
  PointToPointConstraint,
  ConeTwistConstraint,
  HingeConstraint,
  DistanceConstraint,
  LockConstraint,
  Constraint,
  Spring,
  Quaternion,
  Ray,
  RaycastResult,
  RaycastVehicle,
  GSSolver,
  SplitSolver,
  Body,
} from 'cannon-es';
import { Observation, AtomicName, FrameMessage, SerializableBodyProps } from './types';
import paramsToBody from './paramsToBody';

export type ShapeType =
  | 'Plane'
  | 'Box'
  | 'Cylinder'
  | 'Heightfield'
  | 'Particle'
  | 'Sphere'
  | 'Trimesh'
  | 'ConvexPolyhedron';
export type BodyShapeType = ShapeType | 'Compound';

let initialised = false;
let preInitEventQueue: any[] = [];

class State {
  bodies: { [id: string]: Body } = {};

  vehicles: { [id: string]: RaycastVehicle } = {};

  springs: { [id: string]: () => void } = {};

  springInstances: { [id: string]: Spring } = {};

  rays: { [id: string]: () => void } = {};

  _world: World | undefined = undefined;

  get world(): World {
    return this._world as World;
  }

  config: { stepSize: number } = { stepSize: 1 / 60 };

  subscriptions: { [id: string]: [number, string, string] } = {};

  tempVector: Vec3 = new Vec3();

  bodiesNeedSyncing = false;

  lastCallTime: number | undefined = undefined;
}

const state = new State();

// eslint-disable-next-line no-restricted-globals
const ctx = self as unknown as Worker;

function syncBodies() {
  state.bodiesNeedSyncing = true;
  state.bodies = state.world.bodies.reduce(
    (acc, body) => ({
      ...acc,
      // @ts-expect-error using added untyped uuid
      [body.uuid]: body,
    }),
    {},
  );
}

function emitBeginContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: 'event',
    type: 'collideBegin',
    // @ts-expect-error using added untyped uuid
    bodyA: bodyA.uuid,
    // @ts-expect-error using added untyped uuid
    bodyB: bodyB.uuid,
  });
}

function emitEndContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: 'collideEnd',
    // @ts-expect-error using added untyped uuid
    bodyA: bodyA.uuid,
    // @ts-expect-error using added untyped uuid
    bodyB: bodyB.uuid,
  });
}

const handleInit = (e: any) => {
  const { params } = e.data;

  const {
    gravity,
    tolerance,
    stepSize,
    iterations,
    allowSleep,
    broadphase,
    axisIndex,
    defaultContactMaterial,
    quatNormalizeFast,
    quatNormalizeSkip,
    solver,
  } = params;
  const broadphases = { NaiveBroadphase, SAPBroadphase };

  state._world = new World({
    gravity: new Vec3(gravity[0], gravity[1], gravity[2]),
    quatNormalizeFast,
    quatNormalizeSkip,
    allowSleep,
    solver: solver === 'Split' ? new SplitSolver(new GSSolver()) : undefined,
    // @ts-expect-error constructing class name from string
    broadphase: new (broadphases[`${broadphase}Broadphase`] || NaiveBroadphase)(state.world),
  });

  // @ts-expect-error accessing private property
  state.world.solver.tolerance = tolerance;

  // @ts-expect-error accessing private property
  state.world.solver.iterations = iterations;

  // @ts-expect-error accessing private property
  state.world.broadphase.axisIndex = axisIndex === undefined || axisIndex === null ? 0 : axisIndex;

  state.world.addEventListener('beginContact', emitBeginContact);
  state.world.addEventListener('endContact', emitEndContact);
  Object.assign(state.world.defaultContactMaterial, defaultContactMaterial);
  state.config.stepSize = stepSize;
};

const handleStep = (e: any) => {
  const { positions, quaternions } = e.data;

  const now = performance.now() / 1000;
  if (!state.lastCallTime) {
    state.world.step(state.config.stepSize, 5);
  } else {
    const timeSinceLastCall = now - state.lastCallTime;
    state.world.step(state.config.stepSize, timeSinceLastCall, 5);
  }
  state.lastCallTime = now;

  const numberOfBodies = state.world.bodies.length;
  for (let i = 0; i < numberOfBodies; i++) {
    const b = state.world.bodies[i];
    const p = b.position;
    const q = b.quaternion;
    positions[3 * i + 0] = p.x;
    positions[3 * i + 1] = p.y;
    positions[3 * i + 2] = p.z;
    quaternions[4 * i + 0] = q.x;
    quaternions[4 * i + 1] = q.y;
    quaternions[4 * i + 2] = q.z;
    quaternions[4 * i + 3] = q.w;
  }

  const observations: Observation[] = [];

  for (const id of Object.keys(state.subscriptions)) {
    const [uuid, type, target = 'bodies'] = state.subscriptions[id];
    let stateObject;
    if (target === 'vehicles') {
      stateObject = state.vehicles;
    } else if (target === 'springInstances') {
      stateObject = state.springInstances;
    } else {
      stateObject = state.bodies;
    }

    if (!stateObject || !stateObject[uuid]) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // @ts-expect-error accessing property via 'type' string
    let value = stateObject[uuid][type];
    if (value instanceof Vec3) {
      value = value.toArray();
    } else if (value instanceof Quaternion) {
      value.toEuler(state.tempVector);
      value = state.tempVector.toArray();
    }

    observations.push([Number(id), value, type as AtomicName]);
  }

  const message: FrameMessage = {
    topic: 'frame',
    positions,
    quaternions,
    observations,
    active: state.world.hasActiveBodies,
  };

  if (state.bodiesNeedSyncing) {
    // @ts-expect-error extra untyped uuid property
    message.bodies = state.world.bodies.map((body) => body.uuid);
    state.bodiesNeedSyncing = false;
  }

  ctx.postMessage(message, [positions.buffer, quaternions.buffer]);
};

const handleAddBodies = (e: {
  data: {
    topic: 'addBodies';
    type: BodyShapeType;
    uuid: string;
    params: SerializableBodyProps[];
  };
}) => {
  const { uuid, type, params } = e.data;
  for (let i = 0; i < uuid.length; i++) {
    const body = paramsToBody(uuid[i], params[i] as any, type);
    state.world.addBody(body);
    if (params[i].onCollide)
      // TODO: add types for collide event
      body.addEventListener('collide', ({ b, target, contact }: { b: any; target: any; contact: any }) => {
        const { ni, ri, rj, bi, bj, id } = contact;
        const contactPoint = bi.position.vadd(ri);
        const contactNormal = bi === body ? ni : ni.scale(-1);
        ctx.postMessage({
          topic: 'collide',
          body: b.uuid,
          target: target.uuid,
          contact: {
            ni: ni.toArray(),
            ri: ri.toArray(),
            rj: rj.toArray(),
            bi: bi.uuid,
            bj: bj.uuid,
            impactVelocity: contact.getImpactVelocityAlongNormal(),
            // World position of the contact
            contactPoint: contactPoint.toArray(),
            // Normal of the contact, relative to the colliding body
            contactNormal: contactNormal.toArray(),
            id,
          },
          collisionFilters: {
            bodyFilterGroup: body.collisionFilterGroup,
            bodyFilterMask: body.collisionFilterMask,
            targetFilterGroup: target.collisionFilterGroup,
            targetFilterMask: target.collisionFilterMask,
          },
        });
      });
  }
  syncBodies();
};

const handleRemoveBodies = (e: any) => {
  const { uuid } = e.data;
  for (let i = 0; i < uuid.length; i++) state.world.removeBody(state.bodies[uuid[i]]);
  syncBodies();
};

const handleSubscribe = (e: any) => {
  const { uuid, params } = e.data;
  const { id, type, target } = params;
  state.subscriptions[id] = [uuid, type, target];
};

const handleUnsubscribe = (e: any) => {
  const { params } = e.data;
  delete state.subscriptions[params];
};

const handleSetPosition = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].position.set(params[0], params[1], params[2]);
};

const handleSetQuaternion = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].quaternion.setFromEuler(params[0], params[1], params[2]);
};

const handleSetVelocity = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].velocity.set(params[0], params[1], params[2]);
};

const handleSetAngularVelocity = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].angularVelocity.set(params[0], params[1], params[2]);
};

const handleSetLinearVelocity = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].linearFactor.set(params[0], params[1], params[2]);
};

const handleSetAngularFactor = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].angularFactor.set(params[0], params[1], params[2]);
};

const handleSetMass = (e: any) => {
  const { uuid, params } = e.data;
  // @ts-expect-error todo
  if (params !== 0 && state.bodies[uuid].type === 0) {
    state.bodies[uuid].type = 1;
  }
  state.bodies[uuid].mass = params;
  state.bodies[uuid].updateMassProperties();
};

const handleSetLinearDamping = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].linearDamping = params;
};

const handleSetAngularDamping = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].angularDamping = params;
};

const handleSetAllowSleep = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].allowSleep = params;
};

const handleSetSleepSpeedLimit = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].sleepSpeedLimit = params;
};

const handleSetSleepTimeLimit = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].sleepTimeLimit = params;
};

const handleSetCollisionFilterGroup = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].collisionFilterGroup = params;
};

const handleSetCollisionFilterMask = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].collisionFilterMask = params;
};

const handleSetCollisionResponse = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].collisionResponse = params;
};

const handleSetFixedRotation = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].fixedRotation = params;
};

const handleSetIsTrigger = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].isTrigger = params;
};

const handleSetGravity = (e: any) => {
  const { params } = e.data;
  state.world.gravity.set(params[0], params[1], params[2]);
};

const handleSetTolerance = (e: any) => {
  const { params } = e.data;
  // @ts-expect-error accessing private property
  state.world.solver.tolerance = params;
};

const handleSetStepSize = (e: any) => {
  const { params } = e.data;
  state.config.stepSize = params;
};

const handleSetIterations = (e: any) => {
  const { params } = e.data;
  // @ts-expect-error accessing private property
  state.world.solver.iterations = params;
};

const handleSetBroadphase = (e: any) => {
  const { params } = e.data;
  const broadphases = { NaiveBroadphase, SAPBroadphase };
  // @ts-expect-error constructing class name from string
  state.world.broadphase = new (broadphases[`${params}Broadphase`] || NaiveBroadphase)(state.world);
};

const handleSetAxisIndex = (e: any) => {
  const { params } = e.data;
  // @ts-expect-error accessing private property
  state.world.broadphase.axisIndex = params === undefined || params === null ? 0 : params;
};

const handleApplyForce = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].applyForce(new Vec3(...params[0]), new Vec3(...params[1]));
};

const handleApplyImpulse = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].applyImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};

const handleApplyLocalForce = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].applyLocalForce(new Vec3(...params[0]), new Vec3(...params[1]));
};

const handleApplyLocalImpulse = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].applyLocalImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};

const handleApplyTorque = (e: any) => {
  const { uuid, params } = e.data;
  state.bodies[uuid].applyTorque(new Vec3(...params[0]));
};

const handleAddConstraint = (e: any) => {
  const { uuid, params, type } = e.data;
  const [bodyA, bodyB, optns] = params;
  const { ...options } = optns;
  let { pivotA, pivotB, axisA, axisB } = optns;

  // is there a better way to enforce defaults?
  pivotA = Array.isArray(pivotA) ? new Vec3(...pivotA) : undefined;
  pivotB = Array.isArray(pivotB) ? new Vec3(...pivotB) : undefined;
  axisA = Array.isArray(axisA) ? new Vec3(...axisA) : undefined;
  axisB = Array.isArray(axisB) ? new Vec3(...axisB) : undefined;

  let constraint;

  switch (type) {
    case 'PointToPoint':
      constraint = new PointToPointConstraint(
        state.bodies[bodyA],
        pivotA,
        state.bodies[bodyB],
        pivotB,
        optns.maxForce,
      );
      break;
    case 'ConeTwist':
      constraint = new ConeTwistConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        pivotA,
        pivotB,
        axisA,
        axisB,
        ...options,
      });
      break;
    case 'Hinge':
      constraint = new HingeConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        pivotA,
        pivotB,
        axisA,
        axisB,
        ...options,
      });
      break;
    case 'Distance':
      constraint = new DistanceConstraint(
        state.bodies[bodyA],
        state.bodies[bodyB],
        optns.distance,
        optns.maxForce,
      );
      break;
    case 'Lock':
      constraint = new LockConstraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
    default:
      constraint = new Constraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
  }
  // @ts-expect-error extra untyped uuid property
  constraint.uuid = uuid;
  state.world.addConstraint(constraint);
};

const handleRemoveConstraint = (e: any) => {
  const { uuid } = e.data;
  state.world.constraints
    // @ts-expect-error extra untyped uuid property
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => state.world.removeConstraint(c));
};

const handleEnableConstraint = (e: any) => {
  const { uuid } = e.data;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.enable());
};

const handleDisableConstraint = (e: any) => {
  const { uuid } = e.data;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.disable());
};

const handleEnableConstraintMotor = (e: any) => {
  const { uuid } = e.data;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.enableMotor());
};

const handleDisableConstraintMotor = (e: any) => {
  const { uuid } = e.data;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.disableMotor());
};

const handleSetConstraintMotorSpeed = (e: any) => {
  const { uuid, params } = e.data;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.setMotorSpeed(params));
};

const handleSetConstraintMotorMaxForce = (e: any) => {
  const { uuid, params } = e.data;
  state.world.constraints
    // @ts-expect-error extra untyped uuid property
    .filter(({ uuid: thisId }) => thisId === uuid)
    // @ts-expect-error todo
    .map((c) => c.setMotorMaxForce(params));
};

const handleAddSpring = (e: any) => {
  const { uuid, params } = e.data;
  const [bodyA, bodyB, optns] = params;
  const { restLength, stiffness, damping } = optns;
  let { worldAnchorA, worldAnchorB, localAnchorA, localAnchorB } = optns;

  worldAnchorA = Array.isArray(worldAnchorA) ? new Vec3(...worldAnchorA) : undefined;
  worldAnchorB = Array.isArray(worldAnchorB) ? new Vec3(...worldAnchorB) : undefined;
  localAnchorA = Array.isArray(localAnchorA) ? new Vec3(...localAnchorA) : undefined;
  localAnchorB = Array.isArray(localAnchorB) ? new Vec3(...localAnchorB) : undefined;

  const spring = new Spring(state.bodies[bodyA], state.bodies[bodyB], {
    worldAnchorA,
    worldAnchorB,
    localAnchorA,
    localAnchorB,
    restLength,
    stiffness,
    damping,
  });

  // @ts-expect-error extra untyped uuid property
  spring.uuid = uuid;

  const postStepSpring = () => spring.applyForce();

  state.springs[uuid] = postStepSpring;
  state.springInstances[uuid] = spring;

  // Compute the force after each step
  state.world.addEventListener('postStep', state.springs[uuid]);
};

const handleSetSpringStiffness = (e: any) => {
  const { uuid, params } = e.data;
  state.springInstances[uuid].stiffness = params;
};

const handleSetSpringRestLength = (e: any) => {
  const { uuid, params } = e.data;
  state.springInstances[uuid].restLength = params;
};

const handleSetSpringDamping = (e: any) => {
  const { uuid, params } = e.data;
  state.springInstances[uuid].damping = params;
};

const handleRemoveSpring = (e: any) => {
  const { uuid } = e.data;
  state.world.removeEventListener('postStep', state.springs[uuid]);
};

const handleAddRay = (e: any) => {
  const { uuid, params } = e.data;
  const { from, to, ...options } = params;
  const ray = new Ray(from ? new Vec3(...from) : undefined, to ? new Vec3(...to) : undefined);
  // @ts-expect-error should become clear with typing
  options.mode = Ray[options.mode.toUpperCase()];
  options.result = new RaycastResult();
  state.rays[uuid] = () => {
    ray.intersectWorld(state.world, options);
    const { body, shape, rayFromWorld, rayToWorld, hitNormalWorld, hitPointWorld, ...rest } = options.result;
    ctx.postMessage({
      topic: 'event',
      type: 'rayhit',
      ray: {
        from,
        to,
        direction: ray.direction.toArray(),
        collisionFilterGroup: ray.collisionFilterGroup,
        collisionFilterMask: ray.collisionFilterMask,
        uuid,
      },
      body: body ? body.uuid : null,
      shape: shape ? { ...shape, body: body.uuid } : null,
      rayFromWorld: rayFromWorld.toArray(),
      rayToWorld: rayToWorld.toArray(),
      hitNormalWorld: hitNormalWorld.toArray(),
      hitPointWorld: hitPointWorld.toArray(),
      ...rest,
    });
  };
  state.world.addEventListener('preStep', state.rays[uuid]);
};

const handleRemoveRay = (e: any) => {
  const { uuid } = e.data;
  state.world.removeEventListener('preStep', state.rays[uuid]);
  delete state.rays[uuid];
};

const handleAddRaycastVehicle = (e: any) => {
  const { uuid, params } = e.data;
  const [chassisBody, wheels, wheelInfos, indexForwardAxis, indexRightAxis, indexUpAxis] = params;
  const vehicle = new RaycastVehicle({
    chassisBody: state.bodies[chassisBody],
    indexForwardAxis,
    indexRightAxis,
    indexUpAxis,
  });
  vehicle.world = state.world;
  for (let i = 0; i < wheelInfos.length; i++) {
    const wheelInfo = wheelInfos[i];
    wheelInfo.directionLocal = new Vec3(...wheelInfo.directionLocal);
    wheelInfo.chassisConnectionPointLocal = new Vec3(...wheelInfo.chassisConnectionPointLocal);
    wheelInfo.axleLocal = new Vec3(...wheelInfo.axleLocal);
    vehicle.addWheel(wheelInfo);
  }

  // @ts-expect-error add method
  vehicle.preStep = () => {
    state.vehicles[uuid].updateVehicle(state.world.dt);
  };
  // @ts-expect-error add method
  vehicle.postStep = () => {
    for (let i = 0; i < state.vehicles[uuid].wheelInfos.length; i++) {
      state.vehicles[uuid].updateWheelTransform(i);
      const t = state.vehicles[uuid].wheelInfos[i].worldTransform;
      const wheelBody = state.bodies[wheels[i]];
      wheelBody.position.copy(t.position);
      wheelBody.quaternion.copy(t.quaternion);
    }
  };

  state.vehicles[uuid] = vehicle;

  // @ts-expect-error using untyped added method
  state.world.addEventListener('preStep', state.vehicles[uuid].preStep);

  // @ts-expect-error using untyped added method
  state.world.addEventListener('postStep', state.vehicles[uuid].postStep);
};

const handleRemoveRaycastVehicle = (e: any) => {
  const { uuid } = e.data;

  // @ts-expect-error using untyped added method
  state.world.removeEventListener('preStep', state.vehicles[uuid].preStep);

  // @ts-expect-error using untyped added method
  state.world.removeEventListener('postStep', state.vehicles[uuid].postStep);

  state.vehicles[uuid].world = null;
  delete state.vehicles[uuid];
};

const handleSetRaycastVehicleSteeringValue = (e: any) => {
  const { uuid, params } = e.data;
  const [value, wheelIndex] = params;
  state.vehicles[uuid].setSteeringValue(value, wheelIndex);
};

const handleApplyRaycastVehicleEngineForce = (e: any) => {
  const { uuid, params } = e.data;
  const [value, wheelIndex] = params;
  state.vehicles[uuid].applyEngineForce(value, wheelIndex);
};

const handleSetRaycastVehicleBrake = (e: any) => {
  const { uuid, params } = e.data;
  const [brake, wheelIndex] = params;
  state.vehicles[uuid].setBrake(brake, wheelIndex);
};

const handleWakeUp = (e: any) => {
  const { uuid } = e.data;
  state.bodies[uuid].wakeUp();
};

const handleSleep = (e: any) => {
  const { uuid } = e.data;
  state.bodies[uuid].sleep();
};

const handleEvent = (event: MessageEvent) => {
  const { topic } = event.data;
  if (topic === 'step') {
    handleStep(event);
  } else if (topic === 'addBodies') {
    handleAddBodies(event);
  } else if (topic === 'removeBodies') {
    handleRemoveBodies(event);
  } else if (topic === 'subscribe') {
    handleSubscribe(event);
  } else if (topic === 'unsubscribe') {
    handleUnsubscribe(event);
  } else if (topic === 'setPosition') {
    handleSetPosition(event);
  } else if (topic === 'setQuaternion') {
    handleSetQuaternion(event);
  } else if (topic === 'setVelocity') {
    handleSetVelocity(event);
  } else if (topic === 'setAngularVelocity') {
    handleSetAngularVelocity(event);
  } else if (topic === 'setLinearFactor') {
    handleSetLinearVelocity(event);
  } else if (topic === 'setAngularFactor') {
    handleSetAngularFactor(event);
  } else if (topic === 'setMass') {
    handleSetMass(event);
  } else if (topic === 'setLinearDamping') {
    handleSetLinearDamping(event);
  } else if (topic === 'setAngularDamping') {
    handleSetAngularDamping(event);
  } else if (topic === 'setAllowSleep') {
    handleSetAllowSleep(event);
  } else if (topic === 'setSleepSpeedLimit') {
    handleSetSleepSpeedLimit(event);
  } else if (topic === 'setSleepTimeLimit') {
    handleSetSleepTimeLimit(event);
  } else if (topic === 'setCollisionFilterGroup') {
    handleSetCollisionFilterGroup(event);
  } else if (topic === 'setCollisionFilterMask') {
    handleSetCollisionFilterMask(event);
  } else if (topic === 'setCollisionResponse') {
    handleSetCollisionResponse(event);
  } else if (topic === 'setFixedRotation') {
    handleSetFixedRotation(event);
  } else if (topic === 'setIsTrigger') {
    handleSetIsTrigger(event);
  } else if (topic === 'setGravity') {
    handleSetGravity(event);
  } else if (topic === 'setTolerance') {
    handleSetTolerance(event);
  } else if (topic === 'setStepSize') {
    handleSetStepSize(event);
  } else if (topic === 'setIterations') {
    handleSetIterations(event);
  } else if (topic === 'setBroadphase') {
    handleSetBroadphase(event);
  } else if (topic === 'setAxisIndex') {
    handleSetAxisIndex(event);
  } else if (topic === 'applyForce') {
    handleApplyForce(event);
  } else if (topic === 'applyImpulse') {
    handleApplyImpulse(event);
  } else if (topic === 'applyLocalForce') {
    handleApplyLocalForce(event);
  } else if (topic === 'applyLocalImpulse') {
    handleApplyLocalImpulse(event);
  } else if (topic === 'applyTorque') {
    handleApplyTorque(event);
  } else if (topic === 'addConstraint') {
    handleAddConstraint(event);
  } else if (topic === 'removeConstraint') {
    handleRemoveConstraint(event);
  } else if (topic === 'enableConstraint') {
    handleEnableConstraint(event);
  } else if (topic === 'disableConstraint') {
    handleDisableConstraint(event);
  } else if (topic === 'enableConstraintMotor') {
    handleEnableConstraintMotor(event);
  } else if (topic === 'disableConstraintMotor') {
    handleDisableConstraintMotor(event);
  } else if (topic === 'setConstraintMotorSpeed') {
    handleSetConstraintMotorSpeed(event);
  } else if (topic === 'setConstraintMotorMaxForce') {
    handleSetConstraintMotorMaxForce(event);
  } else if (topic === 'addSpring') {
    handleAddSpring(event);
  } else if (topic === 'setSpringStiffness') {
    handleSetSpringStiffness(event);
  } else if (topic === 'setSpringRestLength') {
    handleSetSpringRestLength(event);
  } else if (topic === 'setSpringDamping') {
    handleSetSpringDamping(event);
  } else if (topic === 'removeSpring') {
    handleRemoveSpring(event);
  } else if (topic === 'addRay') {
    handleAddRay(event);
  } else if (topic === 'removeRay') {
    handleRemoveRay(event);
  } else if (topic === 'addRaycastVehicle') {
    handleAddRaycastVehicle(event);
  } else if (topic === 'removeRaycastVehicle') {
    handleRemoveRaycastVehicle(event);
  } else if (topic === 'setRaycastVehicleSteeringValue') {
    handleSetRaycastVehicleSteeringValue(event);
  } else if (topic === 'applyRaycastVehicleEngineForce') {
    handleApplyRaycastVehicleEngineForce(event);
  } else if (topic === 'setRaycastVehicleBrake') {
    handleSetRaycastVehicleBrake(event);
  } else if (topic === 'wakeUp') {
    handleWakeUp(event);
  } else if (topic === 'sleep') {
    handleSleep(event);
  }
};

ctx.onmessage = (event) => {
  const { topic } = event.data;

  if (!initialised) {
    if (topic === 'init') {
      handleInit(event);
      initialised = true;
      preInitEventQueue.forEach((e) => {
        handleEvent(e);
      });
      preInitEventQueue = [];
    } else {
      preInitEventQueue.push(event);
    }
  } else {
    handleEvent(event);
  }
};
