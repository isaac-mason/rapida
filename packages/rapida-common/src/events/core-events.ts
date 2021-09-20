import { Event, EventHandler } from './index';

/**
 * The client connection event type
 */
interface ClientConnectionEvent {
  topic: string;
  data: {
    clientId: string;
  };
}

/**
 * The client connection event name
 */
const CLIENT_CONNECTION_EVENT_NAME = 'client-connection';

/**
 * The batch event type
 */
interface BatchEvent {
  topic: string;
  data: Event[];
}

/**
 * The name of the batch event
 */
const BATCH_EVENT_NAME = 'batch';

export {
  Event,
  EventHandler,
  ClientConnectionEvent,
  CLIENT_CONNECTION_EVENT_NAME,
  BatchEvent,
  BATCH_EVENT_NAME,
};
