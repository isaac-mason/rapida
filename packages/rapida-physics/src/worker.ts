import { Quaternion, Vec3 } from 'cannon-es';
import { handleInit } from './events/init';
import { PhysicsEventTopic } from './events/physics-event-topic';
import handlers from './handlers';
import { State } from './state';
import type { AtomicName, FrameMessage, Observation } from './types';

let initialised = false;
let preInitEventQueue: any[] = [];

const state = new State();

const ctx = self as unknown as Worker;

/**
 * Handler for the step event
 * @param e the step event
 * @param state the current world state
 */
const handleStep = (e: StepEvent): void => {
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

/**
 * Handles events from the Physics worker manager
 * @param event the event to handle
 */
const handleEvent = (event: MessageEvent<any>) => {
  const { topic } = event.data;

  if (topic === PhysicsEventTopic.STEP) {
    handleStep(event.data);
  }

  if (handlers[topic]) {
    handlers[topic](event.data, state);
  }
};

export type StepEvent = {
  topic: PhysicsEventTopic.STEP;
  timeElapsed: number;
  positions: Float32Array;
  quaternions: Float32Array;
};

ctx.onmessage = (event: MessageEvent<any>) => {
  const { topic } = event.data;

  if (initialised) {
    handleEvent(event);
  }

  if (topic === PhysicsEventTopic.INIT) {
    handleInit(event.data, state);
    initialised = true;
    preInitEventQueue.forEach((e) => {
      handleEvent(e);
    });
    preInitEventQueue = [];
  } else {
    preInitEventQueue.push(event);
  }
};
