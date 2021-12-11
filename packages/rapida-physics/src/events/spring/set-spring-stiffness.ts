import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetSpringStiffnessEvent = {
  topic: PhysicsEventTopic.SET_SPRING_STIFFNESS;
  uuid: string;
  params: number;
};

export const handleSetSpringStiffness = (e: SetSpringStiffnessEvent, state: State): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].stiffness = params;
};
