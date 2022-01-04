import { NaiveBroadphase, SAPBroadphase } from 'cannon-es';
import { Broadphase } from '../../types';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetBroadphaseEvent = {
  topic: PhysicsEventTopic.SET_BROADPHASE;
  params: Broadphase;
};

export const handleSetBroadphase = (e: SetBroadphaseEvent, state: State): void => {
  const { params } = e;
  const broadphases = { NaiveBroadphase, SAPBroadphase };
  state.world.broadphase = new (broadphases[`${params}Broadphase`] || NaiveBroadphase)(state.world);
};
