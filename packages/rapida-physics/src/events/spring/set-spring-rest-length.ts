import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetSpringRestLengthEvent = {
  topic: PhysicsEventTopic.SET_SPRING_REST_LENGTH;
  uuid: string;
  params: number;
};

export const handleSetSpringRestLength = (e: SetSpringRestLengthEvent, state: State): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].restLength = params;
};
