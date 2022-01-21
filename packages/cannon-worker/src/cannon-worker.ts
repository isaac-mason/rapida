import { ContactMaterial } from 'cannon-es';
import {
  DynamicDrawUsage,
  Euler,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  Object3D,
  Quaternion,
  Vector3,
} from 'three';
// @ts-expect-error import handled by rollup
// eslint-disable-next-line import/order, import/no-unresolved, import/extensions
import CannonWebWorker from 'web-worker:./worker/worker.ts';
import { DebuggerApi } from './debugger';
import { threeToCannon, ThreeToCannonShapeOptions } from './three-to-cannon';
import {
  AtomicName,
  BodyApi,
  BodyProps,
  BodyShapeType,
  BoxProps,
  Broadphase,
  CannonEvents,
  CollideBeginEvent,
  CollideEndEvent,
  CollideEvent,
  CompoundBodyProps,
  ConvexPolyhedronProps,
  CylinderProps,
  ExtendsBodyProps,
  HeightfieldProps,
  PropValue,
  ParticleProps,
  PlaneProps,
  ShapeType,
  SingleBodyApi,
  Solver,
  SphereProps,
  Subscription,
  SubscriptionName,
  TrimeshProps,
  Triplet,
  VectorName,
  WorldPropName,
} from './types';
import {
  ConeTwistConstraintProps,
  ConstraintApi,
  ConstraintORHingeApi,
  ConstraintType,
  DistanceConstraintProps,
  HingeConstraintApi,
  HingeConstraintProps,
  LockConstraintProps,
  PointToPointConstraintProps,
} from './types/constraints';
import { SpringApi, SpringProps } from './types/spring';
import { capitalize } from './utils';
import { AddBodiesEvent, BodyWorkerEventTopic } from './worker/managers/body-manager';
import { ConstraintWorkerEventTopic } from './worker/managers/constraint-manager';
import {
  AddSpringEvent,
  RemoveSpringEvent,
  SetSpringDampingEvent,
  SetSpringRestLengthEvent,
  SetSpringStiffnessEvent,
  SpringWorkerEventTopic,
} from './worker/managers/spring-manager';
import {
  SubscribeEvent,
  SubscribeWorkerEventTopic,
  SubscriptionTarget,
  UnsubscribeEvent,
} from './worker/managers/subscription-manager';
import {
  IncomingWorkerMessage,
  InitEvent,
  StepEvent,
  WorkerCollideBeginEvent,
  WorkerCollideEndEvent,
  WorkerCollideEvent,
  WorkerFrameMessage,
  WorldWorkerEventTopic,
} from './worker/managers/world-manager';
import { PhysicsWorldConfig } from './worker/types';

export type SetOpName<T extends AtomicName | VectorName | WorldPropName> = `set${Capitalize<T>}`;

const noop = () => {
  /* ... */
};

function makeTriplet(v: Vector3 | Triplet): Triplet {
  return v instanceof Vector3 ? [v.x, v.y, v.z] : v;
}

const temp = new Object3D();

const v = new Vector3();
const s = new Vector3(1, 1, 1);
const q = new Quaternion();
const m = new Matrix4();

export type GetPropsByIndex<T extends BodyProps> = (index?: number) => T;

export type CannonWorldFactories = {
  /**
   * Converts a three Mesh or Object3D into a cannon shape
   * @param three the three Mesh or Object3D
   * @param options optional options for the conversion and ref
   * @returns the converted cannon shape
   */
  three: (
    three: Mesh | Object3D,
    fn: GetPropsByIndex<BodyProps>,
    options?: {
      conversion?: ThreeToCannonShapeOptions;
      ref?: Object3D | undefined;
    },
  ) => { api: BodyApi; object: Object3D };
  /**
   * Creates a new box in the physics world
   * @param props props for the box body
   * @param object an optional Object3D
   */
  box: (fn: GetPropsByIndex<BoxProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new plane in the physics world
   * @param props props for the plane
   * @param object an optional Object3D
   */
  plane: (fn: GetPropsByIndex<PlaneProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new cylinder in the physics world
   * @param props props for the cylinder
   * @param object an optional Object3D
   */
  cylinder: (fn: GetPropsByIndex<CylinderProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new heightfield in the physics world
   * @param props props for the heightfield
   * @param object an optional Object3D
   */
  heightfield: (
    fn: GetPropsByIndex<HeightfieldProps>,
    object?: Object3D,
  ) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new particle in the physics world
   * @param props props for the particle
   * @param object an optional Object3D
   */
  particle: (fn: GetPropsByIndex<ParticleProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new sphere in the physics world
   * @param props props for the sphere
   * @param object an optional Object3D
   */
  sphere: (fn: GetPropsByIndex<SphereProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new trimesh in the physics world
   * @param props props for the trimesh
   * @param object an optional Object3D
   */
  trimesh: (fn: GetPropsByIndex<TrimeshProps>, object?: Object3D) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new convexPolyhedron in the physics world
   * @param props props for the convexPolyhedron
   * @param object an optional Object3D
   */
  convexPolyhedron: (
    fn: GetPropsByIndex<ConvexPolyhedronProps>,
    object?: Object3D,
  ) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new compound body in the physics world
   * @param props props for the compound body
   * @param object an optional Object3D
   */
  compoundBody: (
    fn: GetPropsByIndex<CompoundBodyProps>,
    object?: Object3D,
  ) => { api: BodyApi; object: Object3D };

  /**
   * Creates a new point to point constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props additional properties for the constraint
   */
  pointToPointConstraint: (
    bodyA: Object3D,
    bodyB: Object3D,
    props: PointToPointConstraintProps,
  ) => ConstraintApi;

  /**
   * Creates a new cone twist constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props additional properties for the constraint
   */
  coneTwistConstraint: (bodyA: Object3D, bodyB: Object3D, props: ConeTwistConstraintProps) => ConstraintApi;

  /**
   * Creates a new distance constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props additional properties for the constraint
   */
  distanceConstraint: (bodyA: Object3D, bodyB: Object3D, props: DistanceConstraintProps) => ConstraintApi;

  /**
   * Creates a new lock constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props additional properties for the constraint
   */
  lockConstraint: (bodyA: Object3D, bodyB: Object3D, props?: LockConstraintProps) => ConstraintApi;

  /**
   * Creates a new hinge constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props additional properties for the hinge constraint
   */
  hingeConstraint: (bodyA: Object3D, bodyB: Object3D, props: HingeConstraintProps) => HingeConstraintApi;

  /**
   * Creates a new spring
   * @param bodyA the first body for the spring
   * @param bodyB the second body for the spring
   * @param props additional properties for the spring
   */
  spring: (bodyA: Object3D, bodyB: Object3D, optns: SpringProps) => SpringApi;
};

/**
 * Params for creating the CannonWorker
 */
export type CannonWorkerProps = {
  tolerance?: number;
  iterations?: number;
  allowSleep?: boolean;
  broadphase?: Broadphase;
  gravity?: Triplet;
  quatNormalizeFast?: boolean;
  quatNormalizeSkip?: number;
  solver?: Solver;
  axisIndex?: number;
  defaultContactMaterial?: Partial<ContactMaterial>;
  size?: number;
  maxSubSteps?: number;
  delta?: number;
};

/**
 * CannonWorker manages a cannon physics world running inside a Web Worker
 */
export class CannonWorker {
  /**
   * A unique id for the physics world
   */
  id = MathUtils.generateUUID();

  /**
   * A map of body uuids to their ordered position
   */
  bodies: { [uuid: string]: number } = {};

  /**
   * A map of object uuid to Object3D
   */
  objects: Map<string, Object3D> = new Map();

  /**
   * Whether all bodies are sleeping
   */
  allBodiesSleeping = false;

  /**
   * The debugger for the cannon world. If set, `add` will be called on adding bodies, `remove` will be called on removing bodies, and `update` will be called on each step.
   */
  debugger?: DebuggerApi;

  /**
   * Configuration for the physics world
   */
  private config: PhysicsWorldConfig;

  /**
   * A map of uuids to callbacks for cannon events
   */
  private events: CannonEvents = {};

  /**
   * Map of subscription ids to subscriptions
   */
  private subscriptions: {
    [id: number]: Subscription;
  } = {};

  /**
   * A counter for creating incrementing subscription ids
   */
  private incrementingSubscriptionId = 0;

  /**
   * Buffers of data used for communication with the worker
   */
  private buffers: {
    positions: Float32Array;
    quaternions: Float32Array;
  };

  /**
   * The web worker for the cannon world
   */
  private worker = new CannonWebWorker();

  /**
   * Constructor for the CannonWorker
   * @param props configuration for the Cannon world
   */
  constructor(props: CannonWorkerProps) {
    this.config = {
      gravity: props.gravity || [0, -10, 0],
      tolerance: props.tolerance || 0.0001,
      iterations: props.iterations || 5,
      allowSleep: props.allowSleep || false,
      broadphase: props.broadphase || Broadphase.NAIVE,
      axisIndex: props.axisIndex || 0,
      quatNormalizeFast: props.quatNormalizeFast || false,
      quatNormalizeSkip: props.quatNormalizeSkip || 0,
      solver: props.solver || Solver.GS,
      defaultContactMaterial: props.defaultContactMaterial || { contactEquationStiffness: 1e6 },
      size: props.size || 1000,
      maxSubSteps: props.maxSubSteps || 20,
      delta: props.delta || 1 / 60,
    };

    this.buffers = {
      positions: new Float32Array(this.config.size * 3),
      quaternions: new Float32Array(this.config.size * 4),
    };

    this.worker.onmessage = (e: IncomingWorkerMessage) => {
      const { topic } = e.data;

      if (topic === WorldWorkerEventTopic.FRAME) {
        this.handleFrame(e as unknown as WorkerFrameMessage);
      } else if (topic === WorldWorkerEventTopic.COLLIDE) {
        this.handleCollide(e as unknown as WorkerCollideEvent);
      } else if (topic === WorldWorkerEventTopic.COLLIDE_BEGIN) {
        this.handleCollideBegin(e as unknown as WorkerCollideBeginEvent);
      } else if (topic === WorldWorkerEventTopic.COLLIDE_END) {
        this.handleCollideEnd(e as unknown as WorkerCollideEndEvent);
      }
    };

    this.worker.postMessage({
      topic: WorldWorkerEventTopic.INIT,
      params: {
        gravity: this.config.gravity,
        tolerance: this.config.tolerance,
        iterations: this.config.iterations,
        broadphase: this.config.broadphase,
        allowSleep: this.config.allowSleep,
        axisIndex: this.config.axisIndex,
        defaultContactMaterial: this.config.defaultContactMaterial,
        quatNormalizeFast: this.config.quatNormalizeFast,
        quatNormalizeSkip: this.config.quatNormalizeSkip,
        solver: this.config.solver,
        maxSubSteps: this.config.maxSubSteps,
        delta: this.config.delta,
      },
    } as InitEvent);
  }

  /**
   * Returns methods for creating something new in the cannon world
   */
  get create(): CannonWorldFactories {
    return {
      three: (three, fn, options): { object: Object3D; api: BodyApi } => {
        const ref = options?.ref !== undefined ? options.ref : new Object3D();

        const conversionResult = threeToCannon(three, options?.conversion);

        if (!conversionResult) {
          throw new Error('Three Mesh or Object3D could not be converted to a cannon body');
        }

        const resultFn = (index?: number) => ({
          ...conversionResult.params,
          ...fn(index),
        });

        return this.createBody(conversionResult.type, resultFn, (p) => p, ref);
      },
      box: (fn, object) => {
        const defaultBoxArgs: Triplet = [1, 1, 1];
        return this.createBody(
          ShapeType.Box,
          fn,
          (props) => {
            if (!props.args) {
              props.args = defaultBoxArgs;
            }

            return props;
          },
          object,
        );
      },
      plane: (fn, object) => {
        return this.createBody(ShapeType.Plane, fn, (props) => props, object);
      },
      cylinder: (fn, object) => {
        return this.createBody<CylinderProps>(ShapeType.Cylinder, fn, (props) => props, object);
      },
      heightfield: (fn, object) => {
        return this.createBody<HeightfieldProps>(ShapeType.Heightfield, fn, (props) => props, object);
      },
      particle: (fn, object) => {
        return this.createBody<ParticleProps>(ShapeType.Particle, fn, (props) => props, object);
      },
      sphere: (fn, object) => {
        return this.createBody<SphereProps>(
          ShapeType.Sphere,
          fn,
          (props) => {
            if (props.args === undefined) {
              const defaultSphereRadius = 1;
              props.args = [defaultSphereRadius];
            } else if (!Array.isArray(props.args)) {
              props.args = [props.args];
            }
            return props;
          },
          object,
        );
      },
      trimesh: (fn, object) => {
        return this.createBody<TrimeshProps>(ShapeType.Trimesh, fn, (props) => props, object);
      },
      convexPolyhedron: (fn, object) => {
        return this.createBody<ConvexPolyhedronProps>(
          ShapeType.ConvexPolyhedron,
          fn,
          (props) => {
            const [vertices, faces, normals, axes, boundingSphereRadius] = props.args;
            props.args = [
              vertices && vertices.map(makeTriplet),
              faces,
              normals && normals.map(makeTriplet),
              axes && axes.map(makeTriplet),
              boundingSphereRadius,
            ];

            return props;
          },
          object,
        );
      },
      compoundBody: (fn, object) => {
        return this.createBody(ShapeType.Compound, fn, (props) => props, object);
      },
      pointToPointConstraint: (bodyA, bodyB, props?) => {
        return this.createConstraint(ConstraintType.PointToPoint, bodyA, bodyB, props);
      },
      coneTwistConstraint: (bodyA, bodyB, props?) => {
        return this.createConstraint(ConstraintType.ConeTwist, bodyA, bodyB, props);
      },
      distanceConstraint: (bodyA, bodyB, props?) => {
        return this.createConstraint(ConstraintType.Distance, bodyA, bodyB, props);
      },
      hingeConstraint: (bodyA, bodyB, props?) => {
        return this.createConstraint(ConstraintType.Hinge, bodyA, bodyB, props);
      },
      lockConstraint: (bodyA, bodyB, props?) => {
        return this.createConstraint(ConstraintType.Lock, bodyA, bodyB, props);
      },
      spring: (bodyA, bodyB, props?): SpringApi => {
        const uuid = MathUtils.generateUUID();

        this.worker.postMessage({
          topic: SpringWorkerEventTopic.ADD_SPRING,
          uuid,
          params: [bodyA.uuid, bodyB.uuid, props],
        } as AddSpringEvent);

        const api = () => ({
          uuid,
          setStiffness: (value: number) =>
            this.worker.postMessage({
              topic: SpringWorkerEventTopic.SET_SPRING_STIFFNESS,
              params: value,
              uuid,
            } as SetSpringStiffnessEvent),
          setRestLength: (value: number) =>
            this.worker.postMessage({
              topic: SpringWorkerEventTopic.SET_SPRING_REST_LENGTH,
              params: value,
              uuid,
            } as SetSpringRestLengthEvent),
          setDamping: (value: number) =>
            this.worker.postMessage({
              topic: SpringWorkerEventTopic.SET_SPRING_DAMPING,
              params: value,
              uuid,
            } as SetSpringDampingEvent),
          destroy: () => {
            this.worker.postMessage({
              topic: SpringWorkerEventTopic.REMOVE_SPRING,
              uuid,
            } as RemoveSpringEvent);
          },
        });

        return { uuid, bodyA, bodyB, api: api() };
      },
    };
  }

  /**
   * Sets the axis angle
   */
  get axisIndex(): number {
    return this.config.axisIndex;
  }

  /**
   * Sets the axis angle
   */
  set axisIndex(value: number) {
    this.config.axisIndex = value;
    this.worker.postMessage({ topic: WorldWorkerEventTopic.SET_AXIS_INDEX, params: value });
  }

  /**
   * Gets the broadphase for the world
   */
  get broadphase(): PhysicsWorldConfig['broadphase'] {
    return this.config.broadphase;
  }

  /**
   * Sets the broadphase for the world
   */
  set broadphase(value: PhysicsWorldConfig['broadphase']) {
    this.config.broadphase = value;
    this.worker.postMessage({ topic: WorldWorkerEventTopic.SET_BROADPHASE, params: value });
  }

  /**
   * Gets the gravity for the world
   */
  get gravity(): Triplet {
    return this.config.gravity;
  }

  /**
   * Sets the gravity for the world
   */
  set gravity(value: Triplet) {
    this.config.gravity = value;
    this.worker.postMessage({ topic: WorldWorkerEventTopic.SET_GRAVITY, params: value });
  }

  /**
   * Gets the iterations for the world
   */
  get iterations(): number {
    return this.config.iterations;
  }

  /**
   * Sets the iterations for the world
   */
  set iterations(value: number) {
    this.config.iterations = value;
    this.worker.postMessage({ topic: WorldWorkerEventTopic.SET_ITERATIONS, params: value });
  }

  /**
   * Gets the tolerance for the world
   */
  get tolerance(): number {
    return this.config.tolerance;
  }

  /**
   * Sets the tolerance for the world
   */
  set tolerance(value: number) {
    this.config.tolerance = value;
    this.worker.postMessage({ topic: WorldWorkerEventTopic.SET_TOLERANCE, params: value });
  }

  /**
   * Gets the default contact material for the world
   */
  get defaultContactMaterial(): PhysicsWorldConfig['defaultContactMaterial'] {
    return this.config.defaultContactMaterial;
  }

  /**
   * Sets the default contact material for the world
   */
  set defaultContactMaterial(value: PhysicsWorldConfig['defaultContactMaterial']) {
    this.config.defaultContactMaterial = value;
    this.worker.postMessage({
      topic: WorldWorkerEventTopic.SET_DEFAULT_CONTACT_MATERIAL,
      params: this.config.defaultContactMaterial,
    });
  }

  /**
   * Steps the physics world
   * @param timeElapsed the time elapsed
   * @returns a promise for the step, will wait to resolve until the next frame if `waitToResolve` is true
   */
  step(timeElapsed?: number): void {
    if (this.buffers.positions.byteLength === 0 || this.buffers.quaternions.byteLength === 0) {
      return;
    }

    this.worker.postMessage(
      {
        topic: WorldWorkerEventTopic.STEP,
        timeElapsed: timeElapsed || this.config.delta,
        ...this.buffers,
      } as StepEvent,
      [this.buffers.positions.buffer, this.buffers.quaternions.buffer],
    );

    if (this.debugger) {
      this.debugger.update();
    }
  }

  /**
   * Terminates the physics web worker
   */
  terminate(): void {
    this.worker.terminate();
  }

  /**
   * Creates a new body in the physics world
   * @param type the body shape type
   * @param fn a function for getting props by index
   * @param propsFn a function for transforming props, used for providing default values for props
   * @param object an optional object3d
   * @returns the body api
   */
  private createBody<B extends BodyProps>(
    type: BodyShapeType,
    fn: GetPropsByIndex<B>,
    propsFn: (props: B) => B,
    object3D?: Object3D,
  ): { api: BodyApi; object: Object3D } {
    const { worker } = this;

    const object = object3D || new Object3D();

    let objectCount: number;
    if (object instanceof InstancedMesh) {
      object.instanceMatrix.setUsage(DynamicDrawUsage);
      objectCount = object.count;
    } else {
      objectCount = 1;
    }

    const uuids =
      object instanceof InstancedMesh
        ? new Array(objectCount).fill(0).map((_, i) => `${object.uuid}/${i}`)
        : [object.uuid];

    let bodyProps: ExtendsBodyProps[] = [];
    if (object instanceof InstancedMesh) {
      bodyProps = uuids.map((id, i) => {
        const props = propsFn(fn(i));
        CannonWorker.prepareObject(temp, props);

        object.setMatrixAt(i, temp.matrix);
        object.instanceMatrix.needsUpdate = true;
        this.objects.set(id, object);

        this.setupBodyCollisionCallbacks(id, props);

        this.debugger?.add(id, props, type);

        return props;
      });
    } else {
      bodyProps = uuids.map((id, _) => {
        const props = propsFn(fn());
        CannonWorker.prepareObject(object, props);

        this.objects.set(id, object);

        this.setupBodyCollisionCallbacks(id, props);

        this.debugger?.add(id, props, type);

        return props;
      });
    }

    // post a message to the web worker to create the bodies
    worker.postMessage({
      topic: BodyWorkerEventTopic.ADD_BODIES,
      type,
      uuid: uuids,
      params: bodyProps.map(
        ({
          onCollide,
          onCollideBegin: _onCollideBegin,
          onCollideEnd: _onCollideEnd,
          ...serializableProps
        }) => {
          return { onCollide: Boolean(onCollide), ...serializableProps };
        },
      ),
    } as AddBodiesEvent);

    const api = () => {
      const makeVecApi = (vectorName: VectorName, index?: number) => {
        const topic: SetOpName<VectorName> = `set${capitalize(vectorName)}`;
        return {
          set: (x: number, y: number, z: number) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic, params: [x, y, z], uuid });
            }
          },
          copy: ({ x, y, z }: Vector3 | Euler) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic, params: [x, y, z], uuid });
            }
          },
          subscribe: this.subscribe(object, vectorName, index),
        };
      };

      const makeAtomicApi = <T extends AtomicName>(atomicName: T, index?: number) => {
        const topic: SetOpName<T> = `set${capitalize(atomicName)}`;
        return {
          set: (value: PropValue<T>) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic, params: value, uuid });
            }
          },
          subscribe: this.subscribe(object, atomicName, index),
        };
      };

      const makeBodyApi = (index?: number): SingleBodyApi => {
        return {
          // Vectors
          position: makeVecApi('position', index),
          rotation: makeVecApi('quaternion', index),
          velocity: makeVecApi('velocity', index),
          angularVelocity: makeVecApi('angularVelocity', index),
          linearFactor: makeVecApi('linearFactor', index),
          angularFactor: makeVecApi('angularFactor', index),
          // Atomic params
          allowSleep: makeAtomicApi('allowSleep', index),
          angularDamping: makeAtomicApi('angularDamping', index),
          collisionFilterGroup: makeAtomicApi('collisionFilterGroup', index),
          collisionFilterMask: makeAtomicApi('collisionFilterMask', index),
          collisionResponse: makeAtomicApi('collisionResponse', index),
          isTrigger: makeAtomicApi('isTrigger', index),
          fixedRotation: makeAtomicApi('fixedRotation', index),
          linearDamping: makeAtomicApi('linearDamping', index),
          mass: makeAtomicApi('mass', index),
          material: makeAtomicApi('material', index),
          sleepSpeedLimit: makeAtomicApi('sleepSpeedLimit', index),
          sleepTimeLimit: makeAtomicApi('sleepTimeLimit', index),
          userData: makeAtomicApi('userData', index),
          // Apply functions
          applyForce: (force: Triplet, worldPoint: Triplet) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({
                topic: BodyWorkerEventTopic.APPLY_FORCE,
                params: [force, worldPoint],
                uuid,
              });
            }
          },
          applyImpulse: (impulse: Triplet, worldPoint: Triplet) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({
                topic: BodyWorkerEventTopic.APPLY_IMPULSE,
                params: [impulse, worldPoint],
                uuid,
              });
            }
          },
          applyLocalForce: (force: Triplet, localPoint: Triplet) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({
                topic: BodyWorkerEventTopic.APPLY_LOCAL_FORCE,
                params: [force, localPoint],
                uuid,
              });
            }
          },
          applyLocalImpulse: (impulse: Triplet, localPoint: Triplet) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({
                topic: BodyWorkerEventTopic.APPLY_LOCAL_IMPULSE,
                params: [impulse, localPoint],
                uuid,
              });
            }
          },
          applyTorque: (torque: Triplet) => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic: BodyWorkerEventTopic.APPLY_TORQUE, params: torque, uuid });
            }
          },
          // force particular sleep state
          wakeUp: () => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic: BodyWorkerEventTopic.WAKE_UP, uuid });
            }
          },
          sleep: () => {
            const uuid = CannonWorker.getUUID(object, index);
            if (uuid) {
              this.worker.postMessage({ topic: BodyWorkerEventTopic.SLEEP, uuid });
            }
          },
          // destroy
          destroy: () => {
            uuids.forEach((id) => {
              this.objects.delete(id);

              this.debugger?.remove(id);

              delete this.events[id];
            });
            this.worker.postMessage({ topic: BodyWorkerEventTopic.REMOVE_BODIES, uuid: uuids });
          },
        };
      };

      const cache: { [index: number]: BodyApi | SingleBodyApi } = {};

      return {
        ...makeBodyApi(undefined),
        at: (index: number) => {
          let apiInCache = cache[index];

          if (apiInCache === undefined) {
            apiInCache = makeBodyApi(index);
            cache[index] = apiInCache;
          }

          return apiInCache;
        },
      };
    };

    return { object, api: api() };
  }

  /**
   * Creates a new constraint in the world
   * @param type the type of constraint
   * @param bodyA the first body for the constraint
   * @param bodyB the second body for the constraint
   * @param props the props for the constraint
   * @returns the api for the constraint
   */
  private createConstraint<T extends ConstraintType>(
    type: T,
    bodyA: Object3D,
    bodyB: Object3D,
    props:
      | PointToPointConstraintProps
      | ConeTwistConstraintProps
      | DistanceConstraintProps
      | LockConstraintProps
      | HingeConstraintProps = {},
  ): ConstraintORHingeApi<T> {
    const uuid = MathUtils.generateUUID();

    if (bodyA && bodyB) {
      this.worker.postMessage({
        topic: ConstraintWorkerEventTopic.ADD_CONSTRAINT,
        params: [bodyA.uuid, bodyB.uuid, props],
        type,
        uuid,
      });
    }

    const api = () => {
      const common = {
        enable: () => this.worker.postMessage({ topic: ConstraintWorkerEventTopic.ENABLE_CONSTRAINT, uuid }),
        disable: () =>
          this.worker.postMessage({ topic: ConstraintWorkerEventTopic.DISABLE_CONSTRAINT, uuid }),
        destroy: () => this.worker.postMessage({ topic: ConstraintWorkerEventTopic.REMOVE_CONSTRAINT, uuid }),
      };

      if (type === ConstraintType.Hinge) {
        return {
          ...common,
          enableMotor: () =>
            this.worker.postMessage({
              topic: ConstraintWorkerEventTopic.ENABLE_HINGE_CONSTRAINT_MOTOR,
              uuid,
            }),
          disableMotor: () =>
            this.worker.postMessage({
              topic: ConstraintWorkerEventTopic.DISABLE_HINGE_CONSTRAINT_MOTOR,
              uuid,
            }),
          setMotorSpeed: (value: number) =>
            this.worker.postMessage({
              topic: ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_SPEED,
              uuid,
              params: value,
            }),
          setMotorMaxForce: (value: number) =>
            this.worker.postMessage({
              topic: ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_MAX_FORCE,
              uuid,
              params: value,
            }),
        };
      }

      return common;
    };

    return { bodyA, bodyB, api: api() } as ConstraintORHingeApi<T>;
  }

  /**
   * Handles a worker frame message
   * @param e the frame message
   */
  private handleFrame(e: WorkerFrameMessage) {
    // store buffer refs
    this.buffers.positions = e.data.positions;
    this.buffers.quaternions = e.data.quaternions;

    // update the order of bodies if necessary
    if (e.data.bodies) {
      for (let i = 0; i < e.data.bodies.length; i++) {
        const body = e.data.bodies[i];
        this.bodies[body] = e.data.bodies.indexOf(body);
      }
    }

    // send subscription updates
    e.data.observations.forEach(([id, value, type]) => {
      const subscription = this.subscriptions[id] || {};
      const callback = subscription[type] || noop;
      callback(value as never);
    });

    // update body positions and rotations
    if (e.data.active) {
      this.objects.forEach((obj) => {
        if (obj instanceof InstancedMesh) {
          for (let r = 0; r < obj.count; r++) {
            const index = this.bodies[`${obj.uuid}/${r}`];
            if (index !== undefined) {
              obj.setMatrixAt(r, this.applyFromBuffers(index));
            }
            obj.instanceMatrix.needsUpdate = true;
          }
        } else {
          this.applyFromBuffers(this.bodies[obj.uuid], obj);
        }
      });

      this.allBodiesSleeping = true;
    } else {
      this.allBodiesSleeping = false;
    }
  }

  /**
   * Handles a collide event from the worker
   * @param e the collide event
   */
  private handleCollide(e: WorkerCollideEvent) {
    const callback: (value: any) => void = this.events[e.data.target]?.collide || noop;
    callback({
      ...e.data,
      target: this.objects.get(e.data.target),
      body: this.objects.get(e.data.body),
      contact: {
        ...e.data.contact,
        bi: this.objects.get(e.data.contact.bi),
        bj: this.objects.get(e.data.contact.bj),
      },
    } as CollideEvent);
  }

  /**
   * Handles a collide begin event from the worker
   * @param e the worker collide begin event
   */
  private handleCollideBegin(e: WorkerCollideBeginEvent) {
    const bodyA = this.objects.get(e.data.bodyA);
    const bodyB = this.objects.get(e.data.bodyB);

    const callbackA: (value: any) => void = this.events[e.data.bodyA]?.collideBegin || noop;
    callbackA({
      topic: WorldWorkerEventTopic.COLLIDE_BEGIN,
      target: bodyA,
      body: bodyB,
    } as CollideBeginEvent);

    const callbackB: (value: any) => void = this.events[e.data.bodyB]?.collideBegin || noop;
    callbackB({
      topic: WorldWorkerEventTopic.COLLIDE_BEGIN,
      target: bodyB,
      body: bodyA,
    } as CollideBeginEvent);
  }

  /**
   * Handles a collide end event from the worker
   * @param e the worker collide end event
   */
  private handleCollideEnd(e: WorkerCollideEndEvent) {
    const bodyA = this.objects.get(e.data.bodyA);
    const bodyB = this.objects.get(e.data.bodyB);

    const callbackA: (value: any) => void = this.events[e.data.bodyA]?.collideEnd || noop;
    callbackA({
      topic: WorldWorkerEventTopic.COLLIDE_END,
      target: bodyA,
      body: bodyB,
    } as CollideEndEvent);

    const callbackB: (value: any) => void = this.events[e.data.bodyB]?.collideEnd || noop;
    callbackB({
      topic: WorldWorkerEventTopic.COLLIDE_END,
      target: bodyB,
      body: bodyA,
    } as CollideEndEvent);
  }

  /**
   * Creates a subscription for a value in the worker
   * @param object the object3D to create the subscription for
   * @param property the property to subscribe to
   * @param index the index, if instanced
   * @param target the target type, defaults to bodies
   * @returns the subscription
   */
  private subscribe<T extends SubscriptionName>(
    object: Object3D,
    property: T,
    index?: number,
    target: SubscriptionTarget = 'bodies',
  ) {
    return (callback: (value: PropValue<T>) => void) => {
      const id = this.incrementingSubscriptionId++;
      this.subscriptions[id] = { [property]: callback };
      const uuid = CannonWorker.getUUID(object, index);

      if (uuid) {
        this.worker.postMessage({
          topic: SubscribeWorkerEventTopic.SUBSCRIBE,
          uuid,
          params: { id, property, target },
        } as SubscribeEvent);
      }

      return () => {
        delete this.subscriptions[id];
        this.worker.postMessage({
          topic: SubscribeWorkerEventTopic.UNSUBSCRIBE,
          params: String(id),
        } as UnsubscribeEvent);
      };
    };
  }

  /**
   * Sets up collision callbacks for a body
   * @param uuid the uuid of the body to set up collision for
   * @param param collision callbacks
   */
  private setupBodyCollisionCallbacks(
    uuid: string,
    {
      onCollide,
      onCollideBegin,
      onCollideEnd,
    }: {
      onCollide?: BodyProps['onCollide'];
      onCollideBegin?: BodyProps['onCollideBegin'];
      onCollideEnd?: BodyProps['onCollideEnd'];
    },
  ) {
    this.events[uuid] = {
      collide: onCollide,
      collideBegin: onCollideBegin,
      collideEnd: onCollideEnd,
    };
  }

  /**
   * Retrieves a UUID from an Object3D
   * @param object the object to retrieve the uuid from
   * @param index the index, optional
   * @returns the uuid
   */
  private static getUUID(object: Object3D, index?: number): string | null {
    const suffix = index === undefined ? '' : `/${index}`;
    if (typeof object === 'function') return null;
    return object && `${object.uuid}${suffix}`;
  }

  /**
   * Apply a position and rotation to an Object3D from the contents of the position and quaternion buffers
   * Updates the Object3D object matrix, rather than updating the objects position and quaternion properties
   * @param index the index of the body in the buffer
   * @param object the Object3D to update
   * @returns the updated Object3D Matrix4
   */
  private applyFromBuffers(index: number, object?: Object3D) {
    if (index !== undefined) {
      m.compose(
        v.fromArray(this.buffers.positions, index * 3),
        q.fromArray(this.buffers.quaternions, index * 4),
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

  /**
   * Prepares an objects initial position and rotation
   * @param object the object
   * @param props the body props to initialise the object with
   */
  private static prepareObject(object: Object3D, params: BodyProps): void {
    object.userData = params.userData || {};
    object.position.set(...(params.position || [0, 0, 0]));
    object.rotation.set(...(params.rotation || [0, 0, 0]));
    object.updateMatrix();
  }
}
