import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type WakeUpEvent = {
  topic: PhysicsEventTopic.WAKE_UP;
  uuid: string;
};

export const handleWakeUp = (e: WakeUpEvent, state: State): void => {
  const { uuid } = e;
  state.bodies[uuid].wakeUp();
};
