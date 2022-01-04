import { ConstraintWithId } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type RemoveConstraintEvent = {
  topic: PhysicsEventTopic.REMOVE_CONSTRAINT;
  uuid: string;
};

export const handleRemoveConstraint = (e: RemoveConstraintEvent, state: State): void => {
  const { uuid } = e;
  (state.world.constraints as ConstraintWithId[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => state.world.removeConstraint(c));
};
