/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable-next-line no-restricted-syntax */
import {
  DynamicDrawUsage,
  Euler,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Object3D,
  Quaternion,
  Vector3,
} from 'three';

// @ts-expect-error expected
import WebWorker from 'web-worker:./worker.ts';
import { capitalize, getUUID, isString, makeTriplet, prepare, setupCollision } from './utils';

import type {
  AtomicName,
  BodyShapeType,
  Buffers,
  CannonWorker,
  CollideBeginEvent,
  CollideEndEvent,
  CollideEvent,
  ConstraintORHingeApi,
  PhysicsContext,
  PhysicsParams,
  PhysicsWorldCreationParams,
  PropValue,
  RaycastVehicleProps,
  RaycastVehiclePublicApi,
  RayhitEvent,
  RayHookOptions,
  RayMode,
  Refs,
  SetOpName,
  SpringApi,
  SubscriptionName,
  SubscriptionTarget,
  VectorName,
  IncomingWorkerMessage,
} from './types';
import {
  Api,
  BodyParams,
  BoxProps,
  Broadphase,
  CompoundBodyProps,
  ConeTwistConstraintOpts,
  ConstraintTypes,
  ConvexPolyhedronArgs,
  ConvexPolyhedronProps,
  CylinderProps,
  DistanceConstraintOpts,
  HeightfieldProps,
  HingeConstraintOpts,
  LockConstraintOpts,
  ParticleProps,
  PlaneProps,
  PointToPointConstraintOpts,
  SphereProps,
  SpringOptns,
  TrimeshProps,
  Triplet,
  WorkerApi,
  WorkerCollideBeginEvent,
  WorkerCollideEndEvent,
  WorkerCollideEvent,
  WorkerFrameMessage,
  WorkerRayhitEvent,
} from './types';

function noop() {
  /* no action taken */
}

const temp = new Object3D();

function subscribe<T extends SubscriptionName>(
  ref: Object3D,
  worker: CannonWorker,
  subscriptions: PhysicsContext['subscriptions'],
  type: T,
  index?: number,
  target: SubscriptionTarget = 'bodies',
) {
  return (callback: (value: PropValue<T>) => void) => {
    const id = subscribe.incrementingId++;
    subscriptions[id] = { [type]: callback };
    const uuid = getUUID(ref, index);
    uuid && worker.postMessage({ topic: 'subscribe', uuid, params: { id, type, target } });
    return () => {
      delete subscriptions[id];
      worker.postMessage({ topic: 'unsubscribe', params: id });
    };
  };
}
subscribe.incrementingId = 0;

type ArgFn<T> = (args: T) => unknown[];

const v = new Vector3();
const s = new Vector3(1, 1, 1);
const q = new Quaternion();
const m = new Matrix4();

function apply(index: number, buffers: Buffers, object?: Object3D) {
  if (index !== undefined) {
    m.compose(
      v.fromArray(buffers.positions, index * 3),
      q.fromArray(buffers.quaternions, index * 4),
      object ? object.scale : s,
    );
    if (object) {
      object.matrixAutoUpdate = false;
      object.matrix.copy(m);
    }
    return m;
  }
  return m.identity();
}

class Physics {
  params: PhysicsParams;

  _worker: Worker = new WebWorker() as Worker;

  get worker(): Worker {
    return this._worker;
  }

  set worker(value: Worker) {
    this._worker = value;
    this._worker.postMessage({ topic: 'setWorker', params: value });
  }

  set axisIndex(value: number) {
    this.params.axisIndex = value;
    this.worker.postMessage({ topic: 'setAxisIndex', params: value });
  }

  set broadphase(value: Broadphase) {
    this.params.broadphase = value;
    this.worker.postMessage({ topic: 'setBroadphase', params: value });
  }

  set gravity(value: Triplet) {
    this.params.gravity = value;
    this.worker.postMessage({ topic: 'setGravity', params: value });
  }

  set iterations(value: number) {
    this.params.iterations = value;
    this.worker.postMessage({ topic: 'setIterations', params: value });
  }

  set tolerance(value: number) {
    this.params.tolerance = value;
    this.worker.postMessage({ topic: 'setTolerance', params: value });
  }

  refs: Refs = {};

  buffers: Buffers;

  events: PhysicsContext['events'] = {};

  subscriptions: PhysicsContext['subscriptions'] = {};

  bodies: { [uuid: string]: number } = {};

  constructor({
    shouldInvalidate,
    stepSize,
    gravity,
    tolerance,
    iterations,
    allowSleep,
    broadphase,
    axisIndex,
    quatNormalizeFast,
    quatNormalizeSkip,
    solver,
    defaultContactMaterial,
    size,
  }: PhysicsWorldCreationParams) {
    this.params = {
      shouldInvalidate: shouldInvalidate || true,
      stepSize: stepSize || 1 / 60,
      gravity: gravity || [0, -10, 0],
      tolerance: tolerance || 0.001,
      iterations: iterations || 5,
      allowSleep: allowSleep || false,
      broadphase: broadphase || 'Naive',
      axisIndex: axisIndex || 0,
      quatNormalizeFast: quatNormalizeFast || false,
      quatNormalizeSkip: quatNormalizeSkip || 0,
      solver: solver || 'GS',
      defaultContactMaterial: defaultContactMaterial || { contactEquationStiffness: 1e6 },
      size: size || 1000,
    };

    this.buffers = {
      positions: new Float32Array(this.params.size * 3),
      quaternions: new Float32Array(this.params.size * 4),
    };
  }

  start(): void {
    this.worker.onmessage = (e: IncomingWorkerMessage) => {
      const { topic } = e.data;

      if (topic === 'frame') {
        this.handleFrame(e as WorkerFrameMessage);
      } else if (topic === 'collide') {
        this.handleCollide(e as WorkerCollideEvent);
      } else if (topic === 'collideBegin') {
        this.handleCollideBegin(e as WorkerCollideBeginEvent);
      } else if (topic === 'collideEnd') {
        this.handleCollideEnd(e as WorkerCollideEndEvent);
      } else if (topic === 'rayhit') {
        this.handleRayhit(e as WorkerRayhitEvent);
      }
    };

    this.worker.postMessage({
      topic: 'init',
      params: {
        gravity: this.params.gravity,
        tolerance: this.params.tolerance,
        stepSize: this.params.stepSize,
        shouldInvalidate: this.params.shouldInvalidate,
        iterations: this.params.iterations,
        broadphase: this.params.broadphase,
        allowSleep: this.params.allowSleep,
        axisIndex: this.params.axisIndex,
        defaultContactMaterial: this.params.defaultContactMaterial,
        quatNormalizeFast: this.params.quatNormalizeFast,
        quatNormalizeSkip: this.params.quatNormalizeSkip,
        solver: this.params.solver,
      },
    });
  }

  destroy(): void {
    this.worker.terminate();
  }

  step(): void {
    if (this.buffers.positions.byteLength !== 0 && this.buffers.quaternions.byteLength !== 0) {
      this.worker.postMessage({ topic: 'step', ...this.buffers }, [
        this.buffers.positions.buffer,
        this.buffers.quaternions.buffer,
      ]);
    }
  }

  body<B extends BodyParams<unknown>>(
    type: BodyShapeType,
    params: B,
    argsFn: ArgFn<B['args']>,
    ref: Object3D | null,
  ): Api {
    const object = ref || new Object3D();

    const currentWorker = this.worker;

    const objectCount =
      object instanceof InstancedMesh ? (object.instanceMatrix.setUsage(DynamicDrawUsage), object.count) : 1;

    const uuid =
      object instanceof InstancedMesh
        ? new Array(objectCount).fill(0).map((_, i) => `${object.uuid}/${i}`)
        : [object.uuid];

    const bodyParams: (B & { args: unknown })[] =
      object instanceof InstancedMesh
        ? uuid.map((id, i) => {
            prepare(temp, params);
            object.setMatrixAt(i, temp.matrix);
            object.instanceMatrix.needsUpdate = true;
            this.refs[id] = object;

            setupCollision(this.events, params, id);

            return { ...params, args: argsFn(params.args) };
          })
        : uuid.map((id, _) => {
            prepare(object, params);
            this.refs[id] = object;

            setupCollision(this.events, params, id);

            return { ...params, args: argsFn(params.args) };
          });

    // Register on mount, unregister on unmount
    currentWorker.postMessage({
      topic: 'addBodies',
      type,
      uuid,
      params: bodyParams.map(
        ({
          onCollide,
          onCollideBegin: _onCollideBegin,
          onCollideEnd: _onCollideEnd,
          ...serializableProps
        }) => {
          return { onCollide: Boolean(onCollide), ...serializableProps };
        },
      ),
    });

    const api = () => {
      const makeVec = (type: VectorName, index?: number) => {
        const topic: SetOpName<VectorName> = `set${capitalize(type)}`;
        return {
          set: (x: number, y: number, z: number) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic, params: [x, y, z], uuid });
          },
          copy: ({ x, y, z }: Vector3 | Euler) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic, params: [x, y, z], uuid });
          },
          subscribe: subscribe(object, this.worker, this.subscriptions, type, index),
        };
      };

      const makeAtomic = <T extends AtomicName>(type: T, index?: number) => {
        const topic: SetOpName<T> = `set${capitalize(type)}`;
        return {
          set: (value: PropValue<T>) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic, params: value, uuid });
          },
          subscribe: subscribe(object, this.worker, this.subscriptions, type, index),
        };
      };

      const makeApi = (index?: number): WorkerApi => {
        return {
          // Vectors
          position: makeVec('position', index),
          rotation: makeVec('quaternion', index),
          velocity: makeVec('velocity', index),
          angularVelocity: makeVec('angularVelocity', index),
          linearFactor: makeVec('linearFactor', index),
          angularFactor: makeVec('angularFactor', index),
          // Atomic params
          allowSleep: makeAtomic('allowSleep', index),
          angularDamping: makeAtomic('angularDamping', index),
          collisionFilterGroup: makeAtomic('collisionFilterGroup', index),
          collisionFilterMask: makeAtomic('collisionFilterMask', index),
          collisionResponse: makeAtomic('collisionResponse', index),
          isTrigger: makeAtomic('isTrigger', index),
          fixedRotation: makeAtomic('fixedRotation', index),
          linearDamping: makeAtomic('linearDamping', index),
          mass: makeAtomic('mass', index),
          material: makeAtomic('material', index),
          sleepSpeedLimit: makeAtomic('sleepSpeedLimit', index),
          sleepTimeLimit: makeAtomic('sleepTimeLimit', index),
          userData: makeAtomic('userData', index),
          // Apply functions
          applyForce: (force: Triplet, worldPoint: Triplet) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'applyForce', params: [force, worldPoint], uuid });
          },
          applyImpulse: (impulse: Triplet, worldPoint: Triplet) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'applyImpulse', params: [impulse, worldPoint], uuid });
          },
          applyLocalForce: (force: Triplet, localPoint: Triplet) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'applyLocalForce', params: [force, localPoint], uuid });
          },
          applyLocalImpulse: (impulse: Triplet, localPoint: Triplet) => {
            const uuid = getUUID(object, index);
            uuid &&
              this.worker.postMessage({ topic: 'applyLocalImpulse', params: [impulse, localPoint], uuid });
          },
          applyTorque: (torque: Triplet) => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'applyTorque', params: [torque], uuid });
          },
          // force particular sleep state
          wakeUp: () => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'wakeUp', uuid });
          },
          sleep: () => {
            const uuid = getUUID(object, index);
            uuid && this.worker.postMessage({ topic: 'sleep', uuid });
          },
          // destroy
          destroy: () => {
            uuid.forEach((id) => {
              delete this.refs[id];
              delete this.events[id];
            });
            this.worker.postMessage({ topic: 'removeBodies', uuid });
          },
        };
      };

      const cache: { [index: number]: WorkerApi } = {};

      return {
        ...makeApi(undefined),
        at: (index: number) => cache[index] || (cache[index] = makeApi(index)),
      };
    };

    return [object, api()];
  }

  plane(params: PlaneProps, ref: Object3D | null = null) {
    return this.body<PlaneProps>('Plane', params, () => [], ref);
  }

  box(params: BoxProps, ref: Object3D | null = null) {
    const defaultBoxArgs: Triplet = [1, 1, 1];
    return this.body<BoxProps>('Box', params, (args = defaultBoxArgs): Triplet => args, ref);
  }

  cylinder(params: CylinderProps, ref: Object3D | null = null) {
    return this.body<CylinderProps>('Cylinder', params, (args = [] as []) => args, ref);
  }

  heightfield(params: HeightfieldProps, ref: Object3D | null = null) {
    return this.body<HeightfieldProps>('Heightfield', params, (args) => args, ref);
  }

  particle(params: ParticleProps, ref: Object3D | null = null) {
    return this.body<ParticleProps>('Particle', params, () => [], ref);
  }

  sphere(params: SphereProps, ref: Object3D | null = null) {
    return this.body<SphereProps>('Sphere', params, (radius = 1): [number] => [radius], ref);
  }

  trimesh(params: TrimeshProps, ref: Object3D | null = null) {
    return this.body<TrimeshProps>('Trimesh', params, (args) => args, ref);
  }

  convexPolyhedron(params: ConvexPolyhedronProps, ref: Object3D | null = null) {
    return this.body<ConvexPolyhedronProps>(
      'ConvexPolyhedron',
      params,
      ([vertices, faces, normals, axes, boundingSphereRadius] = []): ConvexPolyhedronArgs<Triplet> => [
        vertices && vertices.map(makeTriplet),
        faces,
        normals && normals.map(makeTriplet),
        axes && axes.map(makeTriplet),
        boundingSphereRadius,
      ],
      ref,
    );
  }

  compoundBody(params: CompoundBodyProps, ref: Object3D | null = null) {
    return this.body('Compound', params, (args) => args as unknown[], ref);
  }

  ray(mode: RayMode, options: RayHookOptions, callback: (e: RayhitEvent) => void) {
    const uuid = MathUtils.generateUUID();

    this.events[uuid] = { rayhit: callback };
    this.worker.postMessage({ topic: 'addRay', uuid, params: { mode, ...options } });

    const api = {
      destroy: () => {
        this.worker.postMessage({ topic: 'removeRay', uuid });
        delete this.events[uuid];
      },
    };

    return [uuid, api];
  }

  raycastClosest(options: RayHookOptions, callback: (e: RayhitEvent) => void) {
    this.ray('Closest', options, callback);
  }

  raycastAny(options: RayHookOptions, callback: (e: RayhitEvent) => void) {
    this.ray('Any', options, callback);
  }

  raycastAll(options: RayHookOptions, callback: (e: RayhitEvent) => void) {
    this.ray('All', options, callback);
  }

  raycastVehicle(
    params: RaycastVehicleProps,
    ref: Object3D | null = null,
  ): [Object3D, RaycastVehiclePublicApi] {
    const object = ref || new Object3D();

    const currentWorker = this.worker;
    const uuid: string[] = [object.uuid];
    const raycastVehicleProps = params;

    const chassisBodyUUID = getUUID(raycastVehicleProps.chassisBody);

    const wheelUUIDs = raycastVehicleProps.wheels.map((ref) => getUUID(ref));

    if (!chassisBodyUUID || !wheelUUIDs.every(isString)) {
      throw new Error('missing uuids');
    }

    currentWorker.postMessage({
      topic: 'addRaycastVehicle',
      uuid,
      params: [
        chassisBodyUUID,
        wheelUUIDs,
        raycastVehicleProps.wheelInfos,
        raycastVehicleProps?.indexForwardAxis || 2,
        raycastVehicleProps?.indexRightAxis || 0,
        raycastVehicleProps?.indexUpAxis || 1,
      ],
    });

    const api: () => RaycastVehiclePublicApi = () => {
      return {
        sliding: {
          subscribe: subscribe(object, this.worker, this.subscriptions, 'sliding', undefined, 'vehicles'),
        },
        setSteeringValue: (value: number, wheelIndex: number) => {
          const uuid = getUUID(object);
          uuid &&
            this.worker.postMessage({
              topic: 'setRaycastVehicleSteeringValue',
              params: [value, wheelIndex],
              uuid,
            });
        },
        applyEngineForce: (value: number, wheelIndex: number) => {
          const uuid = getUUID(object);
          uuid &&
            this.worker.postMessage({
              topic: 'applyRaycastVehicleEngineForce',
              params: [value, wheelIndex],
              uuid,
            });
        },
        setBrake: (brake: number, wheelIndex: number) => {
          const uuid = getUUID(object);
          uuid &&
            this.worker.postMessage({ topic: 'setRaycastVehicleBrake', params: [brake, wheelIndex], uuid });
        },
        destroy: () => {
          currentWorker.postMessage({ topic: 'removeRaycastVehicle', uuid });
        },
      };
    };
    return [object, api()];
  }

  constraint<T extends 'Hinge' | ConstraintTypes>(
    type: T,
    bodyA: Object3D,
    bodyB: Object3D,
    optns: any = {},
  ): ConstraintORHingeApi<T> {
    const uuid = MathUtils.generateUUID();

    if (bodyA && bodyB) {
      this.worker.postMessage({
        topic: 'addConstraint',
        params: [bodyA.uuid, bodyB.uuid, optns],
        type,
        uuid,
      });
    }

    const api = () => {
      const common = {
        enable: () => this.worker.postMessage({ topic: 'enableConstraint', uuid }),
        disable: () => this.worker.postMessage({ topic: 'disableConstraint', uuid }),
        destroy: () => this.worker.postMessage({ topic: 'removeConstraint', uuid }),
      };

      if (type === 'Hinge') {
        return {
          ...common,
          enableMotor: () => this.worker.postMessage({ topic: 'enableConstraintMotor', uuid }),
          disableMotor: () => this.worker.postMessage({ topic: 'disableConstraintMotor', uuid }),
          setMotorSpeed: (value: number) =>
            this.worker.postMessage({ topic: 'setConstraintMotorSpeed', uuid, params: value }),
          setMotorMaxForce: (value: number) =>
            this.worker.postMessage({ topic: 'setConstraintMotorMaxForce', uuid, params: value }),
        };
      }

      return common;
    };

    return [bodyA, bodyB, api()] as ConstraintORHingeApi<T>;
  }

  pointToPointConstraint(bodyA: Object3D, bodyB: Object3D, optns: PointToPointConstraintOpts) {
    return this.constraint('PointToPoint', bodyA, bodyB, optns);
  }

  coneTwistConstraint(bodyA: Object3D, bodyB: Object3D, optns: ConeTwistConstraintOpts) {
    return this.constraint('ConeTwist', bodyA, bodyB, optns);
  }

  distanceConstraint(bodyA: Object3D, bodyB: Object3D, optns: DistanceConstraintOpts) {
    return this.constraint('Distance', bodyA, bodyB, optns);
  }

  hingeConstraint(bodyA: Object3D, bodyB: Object3D, optns: HingeConstraintOpts) {
    return this.constraint('Hinge', bodyA, bodyB, optns);
  }

  lockConstraint(bodyA: Object3D, bodyB: Object3D, optns: LockConstraintOpts) {
    return this.constraint('Lock', bodyA, bodyB, optns);
  }

  spring(bodyA: Object3D, bodyB: Object3D, optns: SpringOptns): SpringApi {
    const uuid = MathUtils.generateUUID();

    this.worker.postMessage({
      topic: 'addSpring',
      uuid,
      params: [bodyA.uuid, bodyB.uuid, optns],
    });

    const api = () => ({
      uuid,
      setStiffness: (value: number) =>
        this.worker.postMessage({ topic: 'setSpringStiffness', params: value, uuid }),
      setRestLength: (value: number) =>
        this.worker.postMessage({ topic: 'setSpringRestLength', params: value, uuid }),
      setDamping: (value: number) =>
        this.worker.postMessage({ topic: 'setSpringDamping', params: value, uuid }),
      destroy: () => {
        this.worker.postMessage({ topic: 'removeSpring', uuid });
      },
    });

    return [uuid, bodyA, bodyB, api()];
  }

  private handleFrame(e: WorkerFrameMessage) {
    this.buffers.positions = e.data.positions;
    this.buffers.quaternions = e.data.quaternions;
    if (e.data.bodies) {
      for (let i = 0; i < e.data.bodies.length; i++) {
        const body = e.data.bodies[i];
        this.bodies[body] = e.data.bodies.indexOf(body);
      }
    }

    e.data.observations.forEach(([id, value, type]) => {
      const subscription = this.subscriptions[id] || {};
      const callback = subscription[type] || noop;
      // HELP: We clearly know the type of the callback, but typescript can't deal with it
      callback(value as never);
    });

    if (e.data.active) {
      for (const ref of Object.values(this.refs)) {
        if (ref instanceof InstancedMesh) {
          for (let r = 0; r < ref.count; r++) {
            const index = this.bodies[`${ref.uuid}/${r}`];
            if (index !== undefined) {
              ref.setMatrixAt(r, apply(index, this.buffers));
            }
            ref.instanceMatrix.needsUpdate = true;
          }
        } else {
          apply(this.bodies[ref.uuid], this.buffers, ref);
        }
      }
    }
    // if (shouldInvalidate) {
    //   invalidate()
    // }
  }

  private handleCollide(e: WorkerCollideEvent) {
    const callback: (value: any) => void = this.events[e.data.target]?.collide || noop;
    callback({
      ...e.data,
      target: this.refs[e.data.target],
      body: this.refs[e.data.body],
      contact: {
        ...e.data.contact,
        bi: this.refs[e.data.contact.bi],
        bj: this.refs[e.data.contact.bj],
      },
    } as CollideEvent);
  }

  private handleCollideBegin(e: WorkerCollideBeginEvent) {
    const callbackA: (value: any) => void = this.events[e.data.bodyA]?.collideBegin || noop;
    callbackA({
      topic: 'collideBegin',
      target: this.refs[e.data.bodyA],
      body: this.refs[e.data.bodyB],
    } as CollideBeginEvent);
    const callbackB: (value: any) => void = this.events[e.data.bodyB]?.collideBegin || noop;
    callbackB({
      topic: 'collideBegin',
      target: this.refs[e.data.bodyB],
      body: this.refs[e.data.bodyA],
    } as CollideBeginEvent);
  }

  private handleCollideEnd(e: WorkerCollideEndEvent) {
    const callbackA: (value: any) => void = this.events[e.data.bodyA]?.collideEnd || noop;
    callbackA({
      topic: 'collideEnd',
      target: this.refs[e.data.bodyA],
      body: this.refs[e.data.bodyB],
    } as CollideEndEvent);
    const callbackB: (value: any) => void = this.events[e.data.bodyB]?.collideEnd || noop;
    callbackB({
      topic: 'collideEnd',
      target: this.refs[e.data.bodyB],
      body: this.refs[e.data.bodyA],
    } as CollideEndEvent);
  }

  private handleRayhit(e: WorkerRayhitEvent) {
    const callback: (e: any) => void = this.events[e.data.ray.uuid]?.rayhit || noop;
    callback({
      ...e.data,
      body: e.data.body ? this.refs[e.data.body] : null,
    } as RayhitEvent);
  }
}

export default Physics;
