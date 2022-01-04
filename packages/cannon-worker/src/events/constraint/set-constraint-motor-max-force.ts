import { HingeConstraintWithId } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetConstraintMotorMaxForceEvent = {
  topic: PhysicsEventTopic.SET_CONSTRAINT_MOTOR_MAX_FORCE;
  uuid: string;
  params: number;
};

export const handleSetConstraintMotorMaxForce = (e: SetConstraintMotorMaxForceEvent, state: State): void => {
  const { uuid, params } = e;
  (state.world.constraints as HingeConstraintWithId[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.setMotorMaxForce(params));
};
