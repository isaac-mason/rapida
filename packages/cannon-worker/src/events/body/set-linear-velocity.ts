import { State } from '../../state';

export type SetLinearVelocityEvent = {
  uuid: string;
  params: [number, number, number];
};

export const handleSetLinearVelocity = (e: SetLinearVelocityEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].linearFactor.set(params[0], params[1], params[2]);
};
