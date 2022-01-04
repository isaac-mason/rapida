import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetMassEvent = {
  topic: PhysicsEventTopic.SET_MASS;
  uuid: string;
  params: number;
};

export const handleSetMass = (e: SetMassEvent, state: State): void => {
  const { uuid, params } = e;

  // @ts-expect-error todo
  if (params !== 0 && state.bodies[uuid].type === 0) {
    state.bodies[uuid].type = 1;
  }

  state.bodies[uuid].mass = params;
  state.bodies[uuid].updateMassProperties();
};
