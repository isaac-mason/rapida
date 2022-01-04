import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type EnableConstraintEvent = {
  topic: PhysicsEventTopic.ENABLE_CONSTRAINT;
  uuid: string;
};

export const handleEnableConstraint = (e: EnableConstraintEvent, state: State): void => {
  const { uuid } = e;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.enable());
};
