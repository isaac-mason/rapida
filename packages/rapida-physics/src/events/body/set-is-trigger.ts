import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetIsTriggerEvent = {
  topic: PhysicsEventTopic.SET_IS_TRIGGER;
  uuid: string;
  params: boolean;
};

export const handleSetIsTrigger = (e: SetIsTriggerEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].isTrigger = params;
};
