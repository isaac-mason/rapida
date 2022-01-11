import {
  Body,
  BodyWithId,
  GSSolver,
  NaiveBroadphase,
  SAPBroadphase,
  SplitSolver,
  Vec3,
  World,
} from 'cannon-es';
import { State } from '../state';
import type { PhysicsWorldConfig } from '../types';
import { PhysicsEventTopic } from './physics-event-topic';

export type InitEvent = {
  topic: PhysicsEventTopic.INIT;
  params: PhysicsWorldConfig;
};

const ctx = self as unknown as Worker;

function emitBeginContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: PhysicsEventTopic.COLLIDE_BEGIN,
    bodyA: (bodyA as BodyWithId).uuid,
    bodyB: (bodyB as BodyWithId).uuid,
  });
}

function emitEndContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: PhysicsEventTopic.COLLIDE_END,
    bodyA: (bodyA as BodyWithId).uuid,
    bodyB: (bodyB as BodyWithId).uuid,
  });
}

export const handleInit = (e: InitEvent, state: State): void => {
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
  const broadphases = { NaiveBroadphase, SAPBroadphase };

  state.config.maxSubSteps = maxSubSteps;
  state.config.delta = delta;

  state._world = new World({
    gravity: new Vec3(gravity[0], gravity[1], gravity[2]),
    quatNormalizeFast,
    quatNormalizeSkip,
    allowSleep,
    solver: solver === 'Split' ? new SplitSolver(new GSSolver()) : undefined,
    broadphase: new (broadphases[`${broadphase}Broadphase`] || NaiveBroadphase)(state.world),
  });

  (state.world.solver as SplitSolver | GSSolver).tolerance = tolerance;
  (state.world.solver as SplitSolver | GSSolver).iterations = iterations;

  if (broadphase === 'SAP') {
    (state.world.broadphase as SAPBroadphase).axisIndex = (
      axisIndex === undefined || axisIndex === null ? 0 : axisIndex
    ) as 0 | 1 | 2;
  }

  state.world.addEventListener('beginContact', emitBeginContact);
  state.world.addEventListener('endContact', emitEndContact);
  Object.assign(state.world.defaultContactMaterial, defaultContactMaterial);
};
