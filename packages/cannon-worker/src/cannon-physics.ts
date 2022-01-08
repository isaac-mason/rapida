/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */

// @ts-expect-error expected
// eslint-disable-next-line import/no-unresolved, import/extensions
import WebWorker from 'web-worker:./worker.ts';

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
import { AddBodiesEvent } from './events/body/add-bodies';
import { InitEvent } from './events/init';
import { PhysicsEventTopic } from './events/physics-event-topic';
import { StepEvent } from './events/step';
import { AddRaycastVehicleEvent } from './events/vehicle/add-raycast-vehicle';
import type {
  AtomicName,
  BodyShapeType,
  Buffers,
  CannonWorker,
  CollideBeginEvent,
  CollideEndEvent,
  CollideEvent,
  ConstraintORHingeApi,
  DefaultContactMaterial,
  IncomingWorkerMessage,
  PhysicsContext,
  CannonPhysicsParams,
  PhysicsWorldConfig,
  PropValue,
  RaycastVehicleParams,
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
} from './types';
import {
  Api,
  BodyParams,
  BoxParams,
  Broadphase,
  CompoundBodyParams,
  ConeTwistConstraintOpts,
  ConstraintTypes,
  ConvexPolyhedronArgs,
  ConvexPolyhedronParams,
  CylinderParams,
  DebugApi,
  DistanceConstraintOpts,
  HeightfieldParams,
  HingeConstraintOpts,
  LockConstraintOpts,
  ParticleParams,
  PlaneParams,
  PointToPointConstraintOpts,
  SphereParams,
  SpringOptns,
  TrimeshParams,
  Triplet,
  WorkerApi,
  WorkerCollideBeginEvent,
  WorkerCollideEndEvent,
  WorkerCollideEvent,
  WorkerFrameMessage,
  WorkerRayhitEvent,
} from './types';
import { capitalize, getUUID, isString, makeTriplet, prepare, setupCollision } from './utils';

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
    uuid && worker.postMessage({ topic: PhysicsEventTopic.SUBSCRIBE, uuid, params: { id, type, target } });
    return () => {
      delete subscriptions[id];
      worker.postMessage({ topic: PhysicsEventTopic.UNSUBSCRIBE, params: id });
    };
  };
}
subscribe.incrementingId = 0;

type ArgFn<T> = (args: T) => unknown;

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

/**
 * Cannon Physics World that runs in a web worker
 */
class CannonPhysics {
  /**
   * A name for the physics world
   */
  id: string;

  /**
   * The physics world parameters
   */
  config: PhysicsWorldConfig;

  /**
   * A debugger for the physics world that if set, will be called on adding to and removing from the world
   */
  debugger: DebugApi | undefined;

  /**
   * The physics web worker
   */
  worker: Worker = new WebWorker() as Worker;

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
    this.worker.postMessage({ topic: PhysicsEventTopic.SET_AXIS_INDEX, params: value });
  }

  /**
   * Gets the broadphase for the world
   */
  get broadphase(): Broadphase {
    return this.config.broadphase;
  }

  /**
   * Sets the broadphase for the world
   */
  set broadphase(value: Broadphase) {
    this.config.broadphase = value;
    this.worker.postMessage({ topic: PhysicsEventTopic.SET_BROADPHASE, params: value });
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
    this.worker.postMessage({ topic: PhysicsEventTopic.SET_GRAVITY, params: value });
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
    this.worker.postMessage({ topic: PhysicsEventTopic.SET_ITERATIONS, params: value });
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
    this.worker.postMessage({ topic: PhysicsEventTopic.SET_TOLERANCE, params: value });
  }

  /**
   * Gets the default contact material for the world
   */
  get defaultContactMaterial(): DefaultContactMaterial {
    return this.config.defaultContactMaterial;
  }

  /**
   * Sets the default contact material for the world
   */
  set defaultContactMaterial(value: DefaultContactMaterial) {
    this.config.defaultContactMaterial = value;
    this.worker.postMessage({
      topic: PhysicsEventTopic.SET_DEFAULT_CONTACT_MATERIAL,
      params: this.config.defaultContactMaterial,
    });
  }

  /**
   * A map of body uuids to their reference Object3D objects
   */
  refs: Refs = {};

  /**
   * The buffers that are shared with the worker
   */
  buffers: Buffers;

  /**
   * A map of body uuids to event handlers for cannon events
   */
  events: PhysicsContext['events'] = {};

  /**
   * Subscriptions to body properties
   */
  subscriptions: PhysicsContext['subscriptions'] = {};

  /**
   * A map of body uuids to their ordered position
   */
  bodies: { [uuid: string]: number } = {};

  /**
   * Counter of how many steps have been made with callbacks
   */
  private stepWithCallbackCounter = 0;

  /**
   * A map of step origins to callback functions that will resolve step promises
   */
  private stepOriginsToCallbacks: { [origin: string]: () => void } = {};

  /**
   * Constructor for a Physics world
   * @param params
   */
  constructor({
    id,
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
    maxSubSteps,
    delta,
  }: CannonPhysicsParams) {
    this.id = id || Date.now().toString();

    this.config = {
      gravity: gravity || [0, -10, 0],
      tolerance: tolerance || 0.0001,
      iterations: iterations || 5,
      allowSleep: allowSleep || false,
      broadphase: broadphase || 'Naive',
      axisIndex: axisIndex || 0,
      quatNormalizeFast: quatNormalizeFast || false,
      quatNormalizeSkip: quatNormalizeSkip || 0,
      solver: solver || 'GS',
      defaultContactMaterial: defaultContactMaterial || { contactEquationStiffness: 1e6 },
      size: size || 1000,
      maxSubSteps: maxSubSteps || 20,
      delta: delta || 1 / 60,
    };

    this.buffers = {
      positions: new Float32Array(this.config.size * 3),
      quaternions: new Float32Array(this.config.size * 4),
    };

    this.worker.onmessage = (e: IncomingWorkerMessage) => {
      const { topic } = e.data;

      if (topic === PhysicsEventTopic.FRAME) {
        this.handleFrame(e as unknown as WorkerFrameMessage);
      } else if (topic === PhysicsEventTopic.COLLIDE) {
        this.handleCollide(e as unknown as WorkerCollideEvent);
      } else if (topic === PhysicsEventTopic.COLLIDE_BEGIN) {
        this.handleCollideBegin(e as unknown as WorkerCollideBeginEvent);
      } else if (topic === PhysicsEventTopic.COLLIDE_END) {
        this.handleCollideEnd(e as unknown as WorkerCollideEndEvent);
      } else if (topic === PhysicsEventTopic.RAYHIT) {
        this.handleRayhit(e as unknown as WorkerRayhitEvent);
      }
    };

    this.worker.postMessage({
      topic: PhysicsEventTopic.INIT,
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

  terminate(): void {
    this.worker.terminate();
  }

  /**
   * Steps the physics world
   * @param timeElapsed the time elapsed
   * @param waitToResolve whether the physics step should wait to receive the frame to resolve
   * @returns a promise for the step, will wait to resolve until the next frame if `waitToResolve` is true
   */
  step(timeElapsed?: number, waitToResolve?: boolean): Promise<void> {
    if (this.buffers.positions.byteLength === 0 || this.buffers.quaternions.byteLength === 0) {
      return Promise.resolve();
    }

    let origin: number | undefined;

    return new Promise((resolve) => {
      if (waitToResolve) {
        this.stepWithCallbackCounter += 1;
        origin = this.stepWithCallbackCounter;

        this.stepOriginsToCallbacks[origin] = () => {
          delete this.stepOriginsToCallbacks[origin as number];
          this.debugger?.update();
          resolve();
        };
      }

      this.worker.postMessage(
        {
          origin,
          topic: PhysicsEventTopic.STEP,
          timeElapsed: timeElapsed || this.config.delta,
          ...this.buffers,
        } as StepEvent,
        [this.buffers.positions.buffer, this.buffers.quaternions.buffer],
      );

      if (!waitToResolve) {
        this.debugger?.update();
        resolve();
      }
    });
  }

  /**
   * Retrieves physics factories
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get create() {
    return this._factories;
  }

  private _factories = {
    body: <B extends BodyParams<unknown>>(
      type: BodyShapeType,
      params: B,
      argsFn: ArgFn<B['args']>,
      ref: Object3D | null,
    ): Api => {
      const object = ref || new Object3D();

      const currentWorker = this.worker;

      let objectCount: number;
      if (object instanceof InstancedMesh) {
        object.instanceMatrix.setUsage(DynamicDrawUsage);
        objectCount = object.count;
      } else {
        objectCount = 1;
      }

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

              this.debugger?.add(id, params, type);

              setupCollision(this.events, params, id);

              return { ...params, args: argsFn(params.args) };
            })
          : uuid.map((id, _) => {
              prepare(object, params);
              this.refs[id] = object;

              setupCollision(this.events, params, id);

              this.debugger?.add(id, params, type);

              return { ...params, args: argsFn(params.args) };
            });

      // Register on mount, unregister on unmount
      currentWorker.postMessage({
        topic: PhysicsEventTopic.ADD_BODIES,
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
      } as AddBodiesEvent);

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
              uuid &&
                this.worker.postMessage({
                  topic: PhysicsEventTopic.APPLY_FORCE,
                  params: [force, worldPoint],
                  uuid,
                });
            },
            applyImpulse: (impulse: Triplet, worldPoint: Triplet) => {
              const uuid = getUUID(object, index);
              uuid &&
                this.worker.postMessage({
                  topic: PhysicsEventTopic.APPLY_IMPULSE,
                  params: [impulse, worldPoint],
                  uuid,
                });
            },
            applyLocalForce: (force: Triplet, localPoint: Triplet) => {
              const uuid = getUUID(object, index);
              uuid &&
                this.worker.postMessage({
                  topic: PhysicsEventTopic.APPLY_LOCAL_FORCE,
                  params: [force, localPoint],
                  uuid,
                });
            },
            applyLocalImpulse: (impulse: Triplet, localPoint: Triplet) => {
              const uuid = getUUID(object, index);
              uuid &&
                this.worker.postMessage({
                  topic: PhysicsEventTopic.APPLY_LOCAL_IMPULSE,
                  params: [impulse, localPoint],
                  uuid,
                });
            },
            applyTorque: (torque: Triplet) => {
              const uuid = getUUID(object, index);
              uuid &&
                this.worker.postMessage({ topic: PhysicsEventTopic.APPLY_TORQUE, params: torque, uuid });
            },
            // force particular sleep state
            wakeUp: () => {
              const uuid = getUUID(object, index);
              uuid && this.worker.postMessage({ topic: PhysicsEventTopic.WAKE_UP, uuid });
            },
            sleep: () => {
              const uuid = getUUID(object, index);
              uuid && this.worker.postMessage({ topic: PhysicsEventTopic.SLEEP, uuid });
            },
            // destroy
            destroy: () => {
              uuid.forEach((id) => {
                delete this.refs[id];

                this.debugger?.remove(id);

                delete this.events[id];
              });
              this.worker.postMessage({ topic: PhysicsEventTopic.REMOVE_BODIES, uuid });
            },
          };
        };

        const cache: { [index: number]: WorkerApi } = {};

        return {
          ...makeApi(undefined),
          at: (index: number) => cache[index] || (cache[index] = makeApi(index)),
        };
      };

      return { ref: object, api: api() };
    },
    plane: (params: PlaneParams, ref: Object3D | null = null) => {
      return this._factories.body<PlaneParams>('Plane', params, () => [], ref);
    },
    box: (params: BoxParams, ref: Object3D | null = null) => {
      const defaultBoxArgs: Triplet = [1, 1, 1];
      return this._factories.body<BoxParams>('Box', params, (args = defaultBoxArgs): Triplet => args, ref);
    },
    cylinder: (params: CylinderParams, ref: Object3D | null = null) => {
      return this._factories.body<CylinderParams>('Cylinder', params, (args = []) => args, ref);
    },
    heightfield: (params: HeightfieldParams, ref: Object3D | null = null) => {
      return this._factories.body<HeightfieldParams>('Heightfield', params, (args) => args, ref);
    },
    particle: (params: ParticleParams, ref: Object3D | null = null) => {
      return this._factories.body<ParticleParams>('Particle', params, () => [], ref);
    },
    sphere: (params: SphereParams, ref: Object3D | null = null) => {
      return this._factories.body<SphereParams>('Sphere', params, (radius = 1): [number] => [radius], ref);
    },
    trimesh: (params: TrimeshParams, ref: Object3D | null = null) => {
      return this._factories.body<TrimeshParams>('Trimesh', params, (args) => args, ref);
    },
    convexPolyhedron: (params: ConvexPolyhedronParams, ref: Object3D | null = null) => {
      return this._factories.body<ConvexPolyhedronParams>(
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
    },
    compoundBody: (params: CompoundBodyParams, ref: Object3D | null = null) => {
      return this._factories.body('Compound', params, (args) => args as unknown[], ref);
    },
    ray: (
      mode: RayMode,
      options: RayHookOptions,
      callback: (e: RayhitEvent) => void,
    ): { uuid: string; api: { destroy: () => void } } => {
      const uuid = MathUtils.generateUUID();

      this.events[uuid] = { rayhit: callback };
      this.worker.postMessage({ topic: PhysicsEventTopic.ADD_RAY, uuid, params: { mode, ...options } });

      const api = {
        destroy: () => {
          this.worker.postMessage({ topic: PhysicsEventTopic.REMOVE_RAY, uuid });
          delete this.events[uuid];
        },
      };

      return { uuid, api };
    },
    raycastClosest: (options: RayHookOptions, callback: (e: RayhitEvent) => void) => {
      this._factories.ray('Closest', options, callback);
    },
    raycastAny: (options: RayHookOptions, callback: (e: RayhitEvent) => void) => {
      this._factories.ray('Any', options, callback);
    },
    raycastAll: (options: RayHookOptions, callback: (e: RayhitEvent) => void) => {
      this._factories.ray('All', options, callback);
    },
    raycastVehicle: (
      params: RaycastVehicleParams,
      ref: Object3D | null = null,
    ): { ref: Object3D; api: RaycastVehiclePublicApi } => {
      const object = ref || new Object3D();

      const currentWorker = this.worker;
      const { uuid } = object;
      const raycastVehicleProps = params;

      const chassisBodyUUID = getUUID(raycastVehicleProps.chassisBody);

      const wheelUUIDs = raycastVehicleProps.wheels.map((ref) => getUUID(ref));

      if (!chassisBodyUUID || !wheelUUIDs.every(isString)) {
        throw new Error('missing uuids');
      }

      currentWorker.postMessage({
        topic: PhysicsEventTopic.ADD_RAYCAST_VEHICLE,
        uuid,
        params: [
          chassisBodyUUID,
          wheelUUIDs,
          raycastVehicleProps.wheelInfos,
          raycastVehicleProps?.indexForwardAxis || 2,
          raycastVehicleProps?.indexRightAxis || 0,
          raycastVehicleProps?.indexUpAxis || 1,
        ],
      } as AddRaycastVehicleEvent);

      const api: () => RaycastVehiclePublicApi = () => {
        return {
          sliding: {
            subscribe: subscribe(object, this.worker, this.subscriptions, 'sliding', undefined, 'vehicles'),
          },
          setSteeringValue: (value: number, wheelIndex: number) => {
            const uuid = getUUID(object);
            uuid &&
              this.worker.postMessage({
                topic: PhysicsEventTopic.SET_RAYCAST_VEHICLE_STEERING_VALUE,
                params: [value, wheelIndex],
                uuid,
              });
          },
          applyEngineForce: (value: number, wheelIndex: number) => {
            const uuid = getUUID(object);
            uuid &&
              this.worker.postMessage({
                topic: PhysicsEventTopic.APPLY_RAYCAST_VEHICLE_ENGINE_FORCE,
                params: [value, wheelIndex],
                uuid,
              });
          },
          setBrake: (brake: number, wheelIndex: number) => {
            const uuid = getUUID(object);
            uuid &&
              this.worker.postMessage({
                topic: PhysicsEventTopic.SET_RAYCAST_VEHICLE_BRAKE,
                params: [brake, wheelIndex],
                uuid,
              });
          },
          destroy: () => {
            currentWorker.postMessage({ topic: PhysicsEventTopic.REMOVE_RAYCAST_VEHICLE, uuid });
          },
        };
      };
      return { ref: object, api: api() };
    },
    constraint: <T extends 'Hinge' | ConstraintTypes>(
      type: T,
      bodyA: Object3D,
      bodyB: Object3D,
      optns: any = {},
    ): ConstraintORHingeApi<T> => {
      const uuid = MathUtils.generateUUID();

      if (bodyA && bodyB) {
        this.worker.postMessage({
          topic: PhysicsEventTopic.ADD_CONSTRAINT,
          params: [bodyA.uuid, bodyB.uuid, optns],
          type,
          uuid,
        });
      }

      const api = () => {
        const common = {
          enable: () => this.worker.postMessage({ topic: PhysicsEventTopic.ENABLE_CONSTRAINT, uuid }),
          disable: () => this.worker.postMessage({ topic: PhysicsEventTopic.DISABLE_CONSTRAINT, uuid }),
          destroy: () => this.worker.postMessage({ topic: PhysicsEventTopic.REMOVE_CONSTRAINT, uuid }),
        };

        if (type === 'Hinge') {
          return {
            ...common,
            enableMotor: () =>
              this.worker.postMessage({ topic: PhysicsEventTopic.ENABLE_CONSTRAINT_MOTOR, uuid }),
            disableMotor: () =>
              this.worker.postMessage({ topic: PhysicsEventTopic.DISABLE_CONSTRAINT_MOTOR, uuid }),
            setMotorSpeed: (value: number) =>
              this.worker.postMessage({
                topic: PhysicsEventTopic.SET_CONSTRAINT_MOTOR_SPEED,
                uuid,
                params: value,
              }),
            setMotorMaxForce: (value: number) =>
              this.worker.postMessage({
                topic: PhysicsEventTopic.SET_CONSTRAINT_MOTOR_MAX_FORCE,
                uuid,
                params: value,
              }),
          };
        }

        return common;
      };

      return { bodyA, bodyB, api: api() } as ConstraintORHingeApi<T>;
    },
    pointToPointConstraint: (bodyA: Object3D, bodyB: Object3D, optns: PointToPointConstraintOpts) => {
      return this._factories.constraint('PointToPoint', bodyA, bodyB, optns);
    },
    coneTwistConstraint: (bodyA: Object3D, bodyB: Object3D, optns: ConeTwistConstraintOpts) => {
      return this._factories.constraint('ConeTwist', bodyA, bodyB, optns);
    },
    distanceConstraint: (bodyA: Object3D, bodyB: Object3D, optns: DistanceConstraintOpts) => {
      return this._factories.constraint('Distance', bodyA, bodyB, optns);
    },
    hingeConstraint: (bodyA: Object3D, bodyB: Object3D, optns: HingeConstraintOpts) => {
      return this._factories.constraint('Hinge', bodyA, bodyB, optns);
    },
    lockConstraint: (bodyA: Object3D, bodyB: Object3D, optns: LockConstraintOpts) => {
      return this._factories.constraint('Lock', bodyA, bodyB, optns);
    },
    spring: (bodyA: Object3D, bodyB: Object3D, optns: SpringOptns): SpringApi => {
      const uuid = MathUtils.generateUUID();

      this.worker.postMessage({
        topic: PhysicsEventTopic.ADD_SPRING,
        uuid,
        params: [bodyA.uuid, bodyB.uuid, optns],
      });

      const api = () => ({
        uuid,
        setStiffness: (value: number) =>
          this.worker.postMessage({ topic: PhysicsEventTopic.SET_SPRING_STIFFNESS, params: value, uuid }),
        setRestLength: (value: number) =>
          this.worker.postMessage({ topic: PhysicsEventTopic.SET_SPRING_REST_LENGTH, params: value, uuid }),
        setDamping: (value: number) =>
          this.worker.postMessage({ topic: PhysicsEventTopic.SET_SPRING_DAMPING, params: value, uuid }),
        destroy: () => {
          this.worker.postMessage({ topic: PhysicsEventTopic.REMOVE_SPRING, uuid });
        },
      });

      return { uuid, bodyA, bodyB, api: api() };
    },
  };

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

    // call the step callback for the origin if it is present
    const { origin } = e.data;
    if (origin) {
      this.stepOriginsToCallbacks[origin]();
    }
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

export { CannonPhysics };
