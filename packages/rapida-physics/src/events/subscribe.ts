import { State } from '../state';
import { PhysicsEventTopic } from './physics-event-topic';

export type SubscribeEvent = {
  topic: PhysicsEventTopic.SUBSCRIBE;
  uuid: string;
  params: {
    id: number;
    type: string;
    target: string;
  };
};

export const handleSubscribe = (e: SubscribeEvent, state: State): void => {
  const { uuid, params } = e;
  const { id, type, target } = params;
  state.subscriptions[id] = [uuid, type, target];
};
