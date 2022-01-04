import { HingeConstraintWithId } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type EnableConstraintMotorEvent = {
  topic: PhysicsEventTopic.ENABLE_CONSTRAINT_MOTOR;
  uuid: string;
};

export const handleEnableConstraintMotor = (e: EnableConstraintMotorEvent, state: State): void => {
  const { uuid } = e;
  (state.world.constraints as HingeConstraintWithId[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.enableMotor());
};
