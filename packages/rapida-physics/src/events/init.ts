import { GSSolver, NaiveBroadphase, SAPBroadphase, SplitSolver, Vec3, World } from 'cannon-es';
import { PhysicsWorldConfig } from '../types';
import { PhysicsEventTopic } from './physics-event-topic';
import { State } from '../state';

export type InitEvent = {
  topic: PhysicsEventTopic.INIT;
  params: PhysicsWorldConfig;
};

const ctx = self as unknown as Worker;

function emitBeginContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: PhysicsEventTopic.EVENT,
    type: PhysicsEventTopic.COLLIDE_BEGIN,
    // @ts-expect-error using added untyped uuid
    bodyA: bodyA.uuid,
    // @ts-expect-error using added untyped uuid
    bodyB: bodyB.uuid,
  });
}

function emitEndContact({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) {
  if (!bodyA || !bodyB) return;
  ctx.postMessage({
    topic: PhysicsEventTopic.COLLIDE_END,
    // @ts-expect-error using added untyped uuid
    bodyA: bodyA.uuid,
    // @ts-expect-error using added untyped uuid
    bodyB: bodyB.uuid,
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

  // @ts-expect-error accessing private property
  state.world.solver.tolerance = tolerance;

  // @ts-expect-error accessing private property
  state.world.solver.iterations = iterations;

  // @ts-expect-error accessing private property
  state.world.broadphase.axisIndex = axisIndex === undefined || axisIndex === null ? 0 : axisIndex;

  state.world.addEventListener('beginContact', emitBeginContact);
  state.world.addEventListener('endContact', emitEndContact);
  Object.assign(state.world.defaultContactMaterial, defaultContactMaterial);
};
