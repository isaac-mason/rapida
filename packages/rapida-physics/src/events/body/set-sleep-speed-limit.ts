import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

type SetSleepSpeedLimitEvent = {
  topic: PhysicsEventTopic.SET_SLEEP_SPEED_LIMIT;
  uuid: string;
  params: number;
};

export const handleSetSleepSpeedLimit = (e: SetSleepSpeedLimitEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].sleepSpeedLimit = params;
};
