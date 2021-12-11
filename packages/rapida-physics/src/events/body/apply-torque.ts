import { Vec3 } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyTorqueEvent = {
  topic: PhysicsEventTopic.APPLY_TORQUE;
  uuid: string;
  params: [number, number, number];
};

export const handleApplyTorque = (e: ApplyTorqueEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].applyTorque(new Vec3(...params));
};
