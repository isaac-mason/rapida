import { Vec3 } from 'cannon-es';
import { Body } from '../../cannon';
import { propsToBody } from '../../props-to-body';
import { CannonBodyEventName } from '../../types';
import { SerializableBodyProps } from '../../types/body';
import { BodyShapeType } from '../../types/shapes';
import { Triplet } from '../../types/vec';
import { WorkerState } from '../worker-state';
import { WorldWorkerEventTopic } from './world-manager';

const ctx = self as unknown as Worker;

export enum BodyWorkerEventTopic {
  ADD_BODIES = 'addBodies',
  REMOVE_BODIES = 'removeBodies',
  APPLY_IMPULSE = 'applyImpulse',
  APPLY_LOCAL_IMPULSE = 'applyLocalImpulse',
  APPLY_TORQUE = 'applyTorque',
  APPLY_FORCE = 'applyForce',
  APPLY_LOCAL_FORCE = 'applyLocalForce',
  SET_ALLOW_SLEEP = 'setAllowSleep',
  SET_ANGULAR_DAMPING = 'setAngularDamping',
  SET_ANGULAR_FACTOR = 'setAngularFactor',
  SET_ANGULAR_VELOCITY = 'setAngularVelocity',
  SET_COLLISION_FILTER_GROUP = 'setCollisionFilterGroup',
  SET_COLLISION_FILTER_MASK = 'setCollisionFilterMask',
  SET_COLLISION_RESPONSE = 'setCollisionResponse',
  SET_FIXED_ROTATION = 'setFixedRotation',
  SET_IS_TRIGGER = 'setIsTrigger',
  SET_LINEAR_DAMPING = 'setLinearDamping',
  SET_LINEAR_FACTOR = 'setLinearFactor',
  SET_MASS = 'setMass',
  SET_POSITION = 'setPosition',
  SET_QUATERNION = 'setQuaternion',
  SET_SLEEP_SPEED_LIMIT = 'setSleepSpeedLimit',
  SET_SLEEP_TIME_LIMIT = 'setSleepTimeLimit',
  SET_VELOCITY = 'setVelocity',
  WAKE_UP = 'wakeUp',
  SLEEP = 'sleep',
}

const syncBodies = (state: WorkerState): void => {
  state.bodiesNeedSyncing = true;
  state.bodies = (state.world.bodies as Body[]).reduce(
    (acc, body) => ({
      ...acc,
      [body.uuid]: body,
    }),
    {},
  );
};

export type AddBodiesEvent = {
  topic: BodyWorkerEventTopic.ADD_BODIES;
  type: BodyShapeType;
  uuid: string[];
  params: SerializableBodyProps[];
};

const addBodies = (e: AddBodiesEvent, state: WorkerState): void => {
  const { uuid, type, params } = e;

  for (let i = 0; i < uuid.length; i++) {
    // create the body from params
    const body = propsToBody(uuid[i], params[i], type);

    // add the body to the world
    state.world.addBody(body);

    // setup collision
    if (params[i].onCollide)
      body.addEventListener(
        CannonBodyEventName.COLLIDE,
        ({
          body: b,
          target,
          contact,
        }: {
          body: Body;
          target: Body;
          contact: {
            bi: Body;
            bj: Body;
            contactNormal: Vec3;
            contactPoint: Vec3;
            id: number;
            impactVelocity: number;
            ni: Vec3;
            ri: Vec3;
            rj: Vec3;
            getImpactVelocityAlongNormal: () => Vec3;
          };
        }) => {
          const { ni, ri, rj, bi, bj, id } = contact;
          const contactPoint = bi.position.vadd(ri);
          const contactNormal = bi === body ? ni : ni.scale(-1);
          ctx.postMessage({
            topic: WorldWorkerEventTopic.COLLIDE,
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
        },
      );
  }

  syncBodies(state);
};

export type RemoveBodiesEvent = {
  topic: BodyWorkerEventTopic.REMOVE_BODIES;
  uuid: string;
};

const removeBodies = (e: RemoveBodiesEvent, state: WorkerState): void => {
  const { uuid } = e;

  for (let i = 0; i < uuid.length; i++) {
    state.world.removeBody(state.bodies[uuid[i]]);
  }

  syncBodies(state);
};

export type ApplyForceEvent = {
  topic: BodyWorkerEventTopic.APPLY_FORCE;
  uuid: string;
  params: [Triplet, Triplet];
};

const applyForce = (e: ApplyForceEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyForce(new Vec3(...params[0]), new Vec3(...params[1]));
};

export type ApplyImpulseEvent = {
  topic: BodyWorkerEventTopic.APPLY_IMPULSE;
  uuid: string;
  params: [Triplet, Triplet];
};

const applyImpulse = (e: ApplyImpulseEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};

export type ApplyLocalImpulseEvent = {
  topic: BodyWorkerEventTopic.APPLY_LOCAL_IMPULSE;
  uuid: string;
  params: [Triplet, Triplet];
};

const applyLocalImpulse = (e: ApplyLocalImpulseEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyLocalImpulse(new Vec3(...params[0]), new Vec3(...params[1]));
};

export type ApplyTorqueEvent = {
  topic: BodyWorkerEventTopic.APPLY_TORQUE;
  uuid: string;
  params: Triplet;
};

const applyTorque = (e: ApplyTorqueEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyTorque(new Vec3(...params));
};

export type ApplyLocalForceEvent = {
  topic: BodyWorkerEventTopic.APPLY_LOCAL_FORCE;
  uuid: string;
  params: [Triplet, Triplet];
};

const applyLocalForce = (e: ApplyLocalForceEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyLocalForce(new Vec3(...params[0]), new Vec3(...params[1]));
};

export type SetAllowSleepEvent = {
  topic: BodyWorkerEventTopic.SET_ALLOW_SLEEP;
  uuid: string;
  params: boolean;
};

const setAllowSleep = (e: SetAllowSleepEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].allowSleep = params;
};

export type SetAngularDampingEvent = {
  topic: BodyWorkerEventTopic.SET_ANGULAR_DAMPING;
  uuid: string;
  params: number;
};

const setAngularDamping = (e: SetAngularDampingEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularDamping = params;
};

export type SetAngularFactorEvent = {
  topic: BodyWorkerEventTopic.SET_ANGULAR_FACTOR;
  uuid: string;
  params: Triplet;
};

const setAngularFactor = (e: SetAngularFactorEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularFactor.set(params[0], params[1], params[2]);
};

export type SetAngularVelocityEvent = {
  topic: BodyWorkerEventTopic.SET_ANGULAR_VELOCITY;
  uuid: string;
  params: Triplet;
};

const setAngularVelocity = (e: SetAngularVelocityEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularVelocity.set(params[0], params[1], params[2]);
};

export type SetCollisionFilterGroupEvent = {
  topic: BodyWorkerEventTopic.SET_COLLISION_FILTER_GROUP;
  uuid: string;
  params: number;
};

const setCollisionFilterGroup = (e: SetCollisionFilterGroupEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionFilterGroup = params;
};

export type SetCollisionFilterMaskEvent = {
  topic: BodyWorkerEventTopic.SET_COLLISION_FILTER_MASK;
  uuid: string;
  params: number;
};

const setCollisionFilterMask = (e: SetCollisionFilterMaskEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionFilterMask = params;
};

export type SetCollisionResponseEvent = {
  topic: BodyWorkerEventTopic.SET_COLLISION_RESPONSE;
  uuid: string;
  params: boolean;
};

const setCollisionResponse = (e: SetCollisionResponseEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionResponse = params;
};

export type SetFixedRotationEvent = {
  topic: BodyWorkerEventTopic.SET_FIXED_ROTATION;
  uuid: string;
  params: boolean;
};

const setFixedRotation = (e: SetFixedRotationEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].fixedRotation = params;
};

export type SetIsTriggerEvent = {
  topic: BodyWorkerEventTopic.SET_IS_TRIGGER;
  uuid: string;
  params: boolean;
};

const setIsTrigger = (e: SetIsTriggerEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].isTrigger = params;
};

export type SetLinearDampingEvent = {
  topic: BodyWorkerEventTopic.SET_LINEAR_DAMPING;
  uuid: string;
  params: number;
};

const setLinearDamping = (e: SetLinearDampingEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].linearDamping = params;
};

export type SetLinearFactorEvent = {
  topic: BodyWorkerEventTopic.SET_LINEAR_FACTOR;
  uuid: string;
  params: Triplet;
};

const setLinearFactor = (e: SetLinearFactorEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].linearFactor.set(params[0], params[1], params[2]);
};

export type SetMassEvent = {
  topic: BodyWorkerEventTopic.SET_MASS;
  uuid: string;
  params: number;
};

const setMass = (e: SetMassEvent, state: WorkerState): void => {
  const { uuid, params } = e;

  state.bodies[uuid].mass = params;
  state.bodies[uuid].updateMassProperties();
};

export type SetPositionEvent = {
  topic: BodyWorkerEventTopic.SET_POSITION;
  uuid: string;
  params: Triplet;
};

const setPosition = (e: SetPositionEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].position.set(params[0], params[1], params[2]);
};

export type SetQuaternionEvent = {
  topic: BodyWorkerEventTopic.SET_QUATERNION;
  uuid: string;
  params: Triplet;
};

const setQuaternion = (e: SetQuaternionEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].quaternion.setFromEuler(params[0], params[1], params[2]);
};

export type SetSleepSpeedLimitEvent = {
  topic: BodyWorkerEventTopic.SET_SLEEP_SPEED_LIMIT;
  uuid: string;
  params: number;
};

const setSleepSpeedLimit = (e: SetSleepSpeedLimitEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].sleepSpeedLimit = params;
};

export type SetSleepTimeLimitEvent = {
  topic: BodyWorkerEventTopic.SET_SLEEP_TIME_LIMIT;
  uuid: string;
  params: number;
};

const setSleepTimeLimit = (e: SetSleepTimeLimitEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].sleepTimeLimit = params;
};

export type SetVelocityEvent = {
  topic: BodyWorkerEventTopic.SET_VELOCITY;
  uuid: string;
  params: Triplet;
};

const setVelocity = (e: SetVelocityEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.bodies[uuid].velocity.set(params[0], params[1], params[2]);
};

export type SleepEvent = {
  topic: BodyWorkerEventTopic.SLEEP;
  uuid: string;
};

const sleep = (e: SleepEvent, state: WorkerState): void => {
  const { uuid } = e;
  state.bodies[uuid].sleep();
};

export type WakeUpEvent = {
  topic: BodyWorkerEventTopic.WAKE_UP;
  uuid: string;
};

const wakeUp = (e: WakeUpEvent, state: WorkerState): void => {
  const { uuid } = e;
  state.bodies[uuid].wakeUp();
};

const handlers = {
  [BodyWorkerEventTopic.ADD_BODIES]: addBodies,
  [BodyWorkerEventTopic.REMOVE_BODIES]: removeBodies,
  [BodyWorkerEventTopic.APPLY_FORCE]: applyForce,
  [BodyWorkerEventTopic.APPLY_IMPULSE]: applyImpulse,
  [BodyWorkerEventTopic.APPLY_LOCAL_IMPULSE]: applyLocalImpulse,
  [BodyWorkerEventTopic.APPLY_TORQUE]: applyTorque,
  [BodyWorkerEventTopic.APPLY_LOCAL_FORCE]: applyLocalForce,
  [BodyWorkerEventTopic.SET_ALLOW_SLEEP]: setAllowSleep,
  [BodyWorkerEventTopic.SET_ANGULAR_DAMPING]: setAngularDamping,
  [BodyWorkerEventTopic.SET_ANGULAR_FACTOR]: setAngularFactor,
  [BodyWorkerEventTopic.SET_ANGULAR_VELOCITY]: setAngularVelocity,
  [BodyWorkerEventTopic.SET_COLLISION_FILTER_GROUP]: setCollisionFilterGroup,
  [BodyWorkerEventTopic.SET_COLLISION_FILTER_MASK]: setCollisionFilterMask,
  [BodyWorkerEventTopic.SET_COLLISION_RESPONSE]: setCollisionResponse,
  [BodyWorkerEventTopic.SET_FIXED_ROTATION]: setFixedRotation,
  [BodyWorkerEventTopic.SET_IS_TRIGGER]: setIsTrigger,
  [BodyWorkerEventTopic.SET_LINEAR_DAMPING]: setLinearDamping,
  [BodyWorkerEventTopic.SET_LINEAR_FACTOR]: setLinearFactor,
  [BodyWorkerEventTopic.SET_MASS]: setMass,
  [BodyWorkerEventTopic.SET_POSITION]: setPosition,
  [BodyWorkerEventTopic.SET_QUATERNION]: setQuaternion,
  [BodyWorkerEventTopic.SET_SLEEP_SPEED_LIMIT]: setSleepSpeedLimit,
  [BodyWorkerEventTopic.SET_SLEEP_TIME_LIMIT]: setSleepTimeLimit,
  [BodyWorkerEventTopic.SET_VELOCITY]: setVelocity,
  [BodyWorkerEventTopic.SLEEP]: sleep,
  [BodyWorkerEventTopic.WAKE_UP]: wakeUp,
};

export default handlers;
