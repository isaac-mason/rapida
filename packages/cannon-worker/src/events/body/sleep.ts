import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SleepEvent = {
  topic: PhysicsEventTopic.SLEEP;
  uuid: string;
};

export const handleSleep = (e: SleepEvent, state: State): void => {
  const { uuid } = e;
  state.bodies[uuid].sleep();
};
