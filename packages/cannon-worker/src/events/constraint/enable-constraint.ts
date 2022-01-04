import { ConstraintWithId } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type EnableConstraintEvent = {
  topic: PhysicsEventTopic.ENABLE_CONSTRAINT;
  uuid: string;
};

export const handleEnableConstraint = (e: EnableConstraintEvent, state: State): void => {
  const { uuid } = e;
  (state.world.constraints as ConstraintWithId[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.enable());
};
