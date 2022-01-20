import { Quaternion, Vec3 } from 'cannon-es';
import { Body } from '../cannon';
import { AtomicName } from '../types/body';
import eventHandlers, { EventTopicName } from './event-handlers';
import {
  FrameMessage,
  handleInit,
  StepEvent,
  SubscriptionObservation,
  WorldWorkerEventTopic,
} from './managers/world-manager';
import { WorkerState } from './worker-state';

let initialised = false;

const preInitEventQueue: any[] = [];

const state = new WorkerState();

const ctx = self as unknown as Worker;

/**
 * Handler for the step event
 * @param e the step event
 * @param state the current world state
 */
const handleStep = (e: StepEvent): void => {
  const { timeElapsed, positions, quaternions } = e;

  // step the physics world
  state.world.step(state.config.delta, timeElapsed, state.config.maxSubSteps);

  // update positions and quaternions buffers
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

  // get subscription observations
  const observations: SubscriptionObservation[] = [];
  for (const [subscriptionId, val] of state.subscriptions.entries()) {
    const [uuid, type, target = 'bodies'] = val;

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

    // @ts-expect-error accessing property of object via 'type' string
    let value = stateObject[uuid][type];
    if (value instanceof Vec3) {
      value = value.toArray();
    } else if (value instanceof Quaternion) {
      value.toEuler(state.tempVector);
      value = state.tempVector.toArray();
    }

    observations.push([Number(subscriptionId), value, type as AtomicName]);
  }

  const message: FrameMessage = {
    topic: WorldWorkerEventTopic.FRAME,
    positions,
    quaternions,
    observations,
    active: state.world.hasActiveBodies,
  };
  if (state.bodiesNeedSyncing) {
    message.bodies = (state.world.bodies as Body[]).map((body) => body.uuid);
    state.bodiesNeedSyncing = false;
  }

  ctx.postMessage(message, [positions.buffer, quaternions.buffer]);
};

const handleEvent = (event: MessageEvent<any>) => {
  const topic = event.data.topic as EventTopicName | WorldWorkerEventTopic.STEP;

  if (topic === WorldWorkerEventTopic.STEP) {
    handleStep(event.data);
    return;
  }

  const handler = eventHandlers[topic];
  if (handler !== undefined) {
    handler(event.data, state);
  }
};

ctx.onmessage = (event: MessageEvent<any>): void => {
  const { topic } = event.data;

  if (initialised) {
    handleEvent(event);
    return;
  }

  if (topic === WorldWorkerEventTopic.INIT) {
    handleInit(event.data, state);
    initialised = true;
    preInitEventQueue.splice(0, preInitEventQueue.length).forEach((e) => {
      handleEvent(e);
    });
  } else {
    preInitEventQueue.push(event);
  }
};
