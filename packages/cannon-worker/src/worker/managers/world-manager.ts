import {
  World,
  Vec3,
  GSSolver,
  NaiveBroadphase,
  SAPBroadphase,
  SplitSolver,
  ContactMaterial,
} from 'cannon-es';
import { Body } from '../../cannon';
import { CannonWorldEventName, Triplet } from '../../types';
import { AtomicName } from '../../types/body';
import { PropValue } from '../../types/subscriptions';
import { Broadphase } from '../../types/world';
import { WorkerState } from '../worker-state';
import { PhysicsWorldConfig } from '../types';

export enum WorldWorkerEventTopic {
  INIT = 'init',
  STEP = 'step',
  FRAME = 'frame',
  COLLIDE = 'collide',
  COLLIDE_BEGIN = 'collideBegin',
  COLLIDE_END = 'collideEnd',
  SET_DEFAULT_CONTACT_MATERIAL = 'setDefaultContactMaterial',
  SET_GRAVITY = 'setGravity',
  SET_TOLERANCE = 'setTolerance',
  SET_ITERATIONS = 'setIterations',
  SET_BROADPHASE = 'setBroadphase',
  SET_AXIS_INDEX = 'setAxisIndex',
}

export type InitEvent = {
  topic: WorldWorkerEventTopic.INIT;
  params: PhysicsWorldConfig;
};

export type StepEvent = {
  topic: WorldWorkerEventTopic.STEP;
  timeElapsed: number;
  positions: Float32Array;
  quaternions: Float32Array;
};

export type WorkerCollideEvent = {
  data: {
    topic: WorldWorkerEventTopic.COLLIDE;
    target: string;
    body: string;
    contact: {
      id: string;
      ni: number[];
      ri: number[];
      rj: number[];
      impactVelocity: number;
      bi: string;
      bj: string;
      /** Contact point in world space */
      contactPoint: number[];
      /** Normal of the contact, relative to the colliding body */
      contactNormal: number[];
    };
    collisionFilters: {
      bodyFilterGroup: number;
      bodyFilterMask: number;
      targetFilterGroup: number;
      targetFilterMask: number;
    };
  };
};

export type WorkerCollideBeginEvent = {
  data: {
    topic: WorldWorkerEventTopic.COLLIDE_BEGIN;
    bodyA: string;
    bodyB: string;
  };
};

export type WorkerCollideEndEvent = {
  data: {
    topic: WorldWorkerEventTopic.COLLIDE_END;
    bodyA: string;
    bodyB: string;
  };
};

export type WorkerEventMessage = WorkerCollideEvent | WorkerCollideBeginEvent | WorkerCollideEndEvent;

export type SubscriptionObservation = {
  [K in AtomicName]: [id: number, value: PropValue<K>, type: K];
}[AtomicName];

export type FrameMessage = {
  topic: WorldWorkerEventTopic.FRAME;
  positions: Float32Array;
  quaternions: Float32Array;
  observations: SubscriptionObservation[];
  active: boolean;
  bodies?: string[];
};

export type WorkerFrameMessage = {
  topic: WorldWorkerEventTopic.FRAME;
  data: FrameMessage;
};

export type IncomingWorkerMessage = WorkerFrameMessage | WorkerEventMessage;

const ctx = self as unknown as Worker;

const emitBeginContact = ({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) => {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: WorldWorkerEventTopic.COLLIDE_BEGIN,
    bodyA: bodyA.uuid,
    bodyB: bodyB.uuid,
  } as WorkerCollideBeginEvent['data']);
};

const emitEndContact = ({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) => {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: WorldWorkerEventTopic.COLLIDE_END,
    bodyA: bodyA.uuid,
    bodyB: bodyB.uuid,
  } as WorkerCollideEndEvent['data']);
};

export const handleInit = (e: InitEvent, state: WorkerState): void => {
  const { params } = e;

  const {
    gravity,
    tolerance,
    iterations,
    allowSleep,
    broadphase,
    axisIndex,
    defaultContactMaterial,
    quatNormalizeFast,
    quatNormalizeSkip,
    solver,
    maxSubSteps,
    delta,
  } = params;
  state.config.maxSubSteps = maxSubSteps;
  state.config.delta = delta;

  state.world = new World({
    gravity: new Vec3(gravity[0], gravity[1], gravity[2]),
    quatNormalizeFast,
    quatNormalizeSkip,
    allowSleep,
    solver: solver === 'Split' ? new SplitSolver(new GSSolver()) : undefined,
  });

  if (broadphase === Broadphase.SAP) {
    state.world.broadphase = new SAPBroadphase(state.world);
    (state.world.broadphase as SAPBroadphase).axisIndex = (
      axisIndex === undefined || axisIndex === null ? 0 : axisIndex
    ) as 0 | 1 | 2;
  } else {
    state.world.broadphase = new NaiveBroadphase();
  }

  (state.world.solver as SplitSolver | GSSolver).tolerance = tolerance;
  (state.world.solver as SplitSolver | GSSolver).iterations = iterations;

  state.world.addEventListener(CannonWorldEventName.BEGIN_CONTACT, emitBeginContact);
  state.world.addEventListener(CannonWorldEventName.END_CONTACT, emitEndContact);

  Object.assign(state.world.defaultContactMaterial, defaultContactMaterial);
};

export type SetDefaultContactMaterialEvent = {
  topic: WorldWorkerEventTopic.SET_DEFAULT_CONTACT_MATERIAL;
  params: Partial<PhysicsWorldConfig['defaultContactMaterial']>;
};

const setDefaultContactMaterial = (e: SetDefaultContactMaterialEvent, state: WorkerState): void => {
  const { params } = e;
  state.world.defaultContactMaterial = params as ContactMaterial;
};

export type SetAxisIndexEvent = {
  topic: WorldWorkerEventTopic.SET_AXIS_INDEX;
  params: 0 | 1 | 2;
};

const setAxisIndex = (e: SetAxisIndexEvent, state: WorkerState): void => {
  const { params } = e;

  // @ts-expect-error accessing private property
  state.world.broadphase.axisIndex = params === undefined || params === null ? 0 : params;
};

export type SetBroadphaseEvent = {
  topic: WorldWorkerEventTopic.SET_BROADPHASE;
  params: Broadphase;
};

const setBroadphase = (e: SetBroadphaseEvent, state: WorkerState): void => {
  const { params } = e;
  const broadphases = { NaiveBroadphase, SAPBroadphase };
  state.world.broadphase = new (broadphases[`${params}Broadphase`] || NaiveBroadphase)(state.world);
};

export type SetGravityEvent = {
  topic: WorldWorkerEventTopic.SET_GRAVITY;
  params: Triplet;
};

const setGravity = (e: SetGravityEvent, state: WorkerState): void => {
  const { params } = e;
  state.world.gravity.set(params[0], params[1], params[2]);
};

export type SetIterationsEvent = {
  topic: WorldWorkerEventTopic.SET_ITERATIONS;
  params: number;
};

export const setIterations = (e: SetIterationsEvent, state: WorkerState): void => {
  const { params } = e;
  // @ts-expect-error accessing private property
  state.world.solver.iterations = params;
};

export type SetToleranceEvent = {
  topic: WorldWorkerEventTopic.SET_TOLERANCE;
  params: number;
};

export const setTolerance = (e: SetToleranceEvent, state: WorkerState): void => {
  const { params } = e;
  // @ts-expect-error accessing private property
  state.world.solver.tolerance = params;
};

const handlers = {
  [WorldWorkerEventTopic.SET_DEFAULT_CONTACT_MATERIAL]: setDefaultContactMaterial,
  [WorldWorkerEventTopic.SET_AXIS_INDEX]: setAxisIndex,
  [WorldWorkerEventTopic.SET_BROADPHASE]: setBroadphase,
  [WorldWorkerEventTopic.SET_GRAVITY]: setGravity,
  [WorldWorkerEventTopic.SET_ITERATIONS]: setIterations,
  [WorldWorkerEventTopic.SET_TOLERANCE]: setTolerance,
};

export default handlers;
