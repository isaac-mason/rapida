import type { WorkerState } from '../worker-state';

export enum SubscribeWorkerEventTopic {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export type SubscriptionTarget = 'bodies' | 'vehicles' | 'springInstances';

export type SubscribeEvent = {
  topic: SubscribeWorkerEventTopic.SUBSCRIBE;
  uuid: string;
  params: {
    id: number;
    property: string;
    target: SubscriptionTarget;
  };
};

const subscribe = (e: SubscribeEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  const { id, property, target } = params;
  state.subscriptions.set(String(id), [uuid, property, target]);
};

export type UnsubscribeEvent = {
  topic: SubscribeWorkerEventTopic.UNSUBSCRIBE;
  params: string;
};

const unsubscribe = (e: UnsubscribeEvent, state: WorkerState): void => {
  const { params } = e;
  state.subscriptions.delete(params);
};

const handlers = {
  [SubscribeWorkerEventTopic.SUBSCRIBE]: subscribe,
  [SubscribeWorkerEventTopic.UNSUBSCRIBE]: unsubscribe,
};

export default handlers;
