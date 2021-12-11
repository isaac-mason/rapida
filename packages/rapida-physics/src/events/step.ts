import { Vec3, Quaternion } from 'cannon-es';
import { State } from '../state';
import { PhysicsEventTopic } from './physics-event-topic';
import { Observation, AtomicName, FrameMessage } from '../types';

const ctx = self as unknown as Worker;

export type StepEvent = {
  topic: PhysicsEventTopic.STEP;
  timeElapsed: number;
  positions: Float32Array;
  quaternions: Float32Array;
};

/**
 * Handler for the step event
 * @param e the step event
 * @param state the current world state
 */
export const handleStep = (e: StepEvent, state: State): void => {
  const { timeElapsed, positions, quaternions } = e;

  state.world.step(state.config.delta, timeElapsed, state.config.maxSubSteps);

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
    topic: PhysicsEventTopic.FRAME,
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
