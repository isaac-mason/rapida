import { Object3D } from 'three';
import type { WorkerCollideEvent, WorldWorkerEventTopic } from '../worker/managers/world-manager';

export enum CannonWorldEventName {
  BEGIN_CONTACT = 'beginContact',
  END_CONTACT = 'endContact',
}

export enum CannonBodyEventName {
  COLLIDE = 'collide',
}

export type CollideEvent = Omit<WorkerCollideEvent['data'], 'body' | 'target' | 'contact'> & {
  topic: WorldWorkerEventTopic.COLLIDE;
  body: Object3D;
  target: Object3D;
  contact: Omit<WorkerCollideEvent['data']['contact'], 'bi' | 'bj'> & {
    bi: Object3D;
    bj: Object3D;
  };
};

export type CollideBeginEvent = {
  topic: WorldWorkerEventTopic.COLLIDE_BEGIN;
  target: Object3D;
  body: Object3D;
};

export type CollideEndEvent = {
  topic: WorldWorkerEventTopic.COLLIDE_END;
  target: Object3D;
  body: Object3D;
};

type CannonEvent = CollideBeginEvent | CollideEndEvent | CollideEvent;

type CallbackByTopic<T extends { topic: string }> = {
  [K in T['topic']]?: T extends { topic: K } ? (e: T) => void : never;
};

export type CannonEvents = { [uuid: string]: Partial<CallbackByTopic<CannonEvent>> };
