import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetSleepTimeLimitEvent = {
  topic: PhysicsEventTopic.SET_SLEEP_TIME_LIMIT;
  uuid: string;
  params: number;
};

export const handleSetSleepTimeLimit = (e: SetSleepTimeLimitEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].sleepTimeLimit = params;
};
