import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetAllowSleepEvent = {
  topic: PhysicsEventTopic.SET_ALLOW_SLEEP;
  uuid: string;
  params: boolean;
};

export const handleSetAllowSleep = (e: SetAllowSleepEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].allowSleep = params;
};
