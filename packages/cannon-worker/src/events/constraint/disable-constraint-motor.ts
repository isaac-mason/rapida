import { HingeConstraintWithId } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type DisableConstraintMotorEvent = {
  topic: PhysicsEventTopic.DISABLE_CONSTRAINT_MOTOR;
  uuid: string;
};

export const handleDisableConstraintMotor = (e: DisableConstraintMotorEvent, state: State): void => {
  const { uuid } = e;
  (state.world.constraints as HingeConstraintWithId[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.disableMotor());
};
