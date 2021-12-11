import { State } from '../state';

export type UnsubscribeEvent = {
  params: string;
};

export const handleUnsubscribe = (e: UnsubscribeEvent, state: State): void => {
  const { params } = e;
  delete state.subscriptions[params];
};
