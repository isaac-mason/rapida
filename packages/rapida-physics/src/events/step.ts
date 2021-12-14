import { PhysicsEventTopic } from './physics-event-topic';

export type StepEvent = {
  topic: PhysicsEventTopic.STEP;
  timeElapsed: number;
  positions: Float32Array;
  quaternions: Float32Array;
};
