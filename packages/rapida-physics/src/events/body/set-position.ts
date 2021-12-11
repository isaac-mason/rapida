import { State } from '../../state';

export type SetPositionEvent = {
  uuid: string;
  params: [number, number, number];
};

export const handleSetPosition = (e: SetPositionEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].position.set(params[0], params[1], params[2]);
};
