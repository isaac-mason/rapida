import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type RemoveSpringEvent = {
  topic: PhysicsEventTopic.REMOVE_SPRING;
  uuid: string;
};

export const handleRemoveSpring = (e: RemoveSpringEvent, state: State): void => {
  const { uuid } = e;
  state.world.removeEventListener('postStep', state.springs[uuid]);
};
