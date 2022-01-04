import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetConstraintMotorSpeedEvent = {
  topic: PhysicsEventTopic.SET_CONSTRAINT_MOTOR_SPEED;
  uuid: string;
  params: number;
};

export const handleSetConstraintMotorSpeed = (e: SetConstraintMotorSpeedEvent, state: State): void => {
  const { uuid, params } = e;
  // @ts-expect-error extra untyped uuid property
  state.world.constraints.filter(({ uuid: thisId }) => thisId === uuid).map((c) => c.setMotorSpeed(params));
};
