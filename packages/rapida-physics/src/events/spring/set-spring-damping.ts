import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetSpringDampingEvent = {
  topic: PhysicsEventTopic.SET_SPRING_DAMPING;
  uuid: string;
  params: number;
};

export const handleSetSpringDamping = (e: SetSpringDampingEvent, state: State): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].damping = params;
};
