import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type DisableConstraintEvent = {
  topic: PhysicsEventTopic.DISABLE_CONSTRAINT;
  uuid: string;
};

export const handleDisableConstraint = (e: DisableConstraintEvent, state: State): void => {
  const { uuid } = e;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.disable());
};
