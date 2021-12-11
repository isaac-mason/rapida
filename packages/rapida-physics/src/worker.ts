import { handleInit } from './events/init';
import { handleStep } from './events/step';
import handlers from './handlers';
import { PhysicsEventTopic } from './events/physics-event-topic';
import { State } from './state';

let initialised = false;
let preInitEventQueue: any[] = [];

const state = new State();

const ctx = self as unknown as Worker;

const handleEvent = (event: MessageEvent<any>) => {
  const { topic } = event.data;

  if (topic === PhysicsEventTopic.STEP) {
    handleStep(event.data, state);
  }

  if (handlers[topic]) {
    handlers[topic](event.data, state);
  }
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
