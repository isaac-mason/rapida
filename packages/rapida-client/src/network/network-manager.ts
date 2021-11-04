import { Event, EventHandler, Events, uuid } from '@isaacmason/rapida-common';
import { io, Socket } from 'socket.io-client';
import logger from '../common/logger';
import { Room } from './room';

class NetworkManager {
  /**
   * The current room
   */
  room?: Room;

  /**
   * The clients unique id. Set after the room has been joined.
   */
  clientId?: string;

  /**
   * Handlers for the room
   */
  private handlers: {
    [eventName: string]: { [handlerName: string]: EventHandler };
  } = {};

  /**
   * A buffer of events waiting to be emitted
   */
  private emitBuffer: Event[] = [];

  /**
   * A buffer of events waiting to be processed
   */
  private processBuffer: Event[] = [];

  /**
   * The client socket.io socket
   */
  protected socket?: Socket;

  /**
   * Emits events in the emit buffer, broadcasts events in the process buffer
   */
  tick = (): void => {
    if (this.socket === undefined) {
      throw new Error('cannot emit an event as socket undefined');
    }

    // process all events in the process buffer
    this.processBuffer
      .splice(0, this.processBuffer.length)
      .forEach((event: Event) => {
        logger.debug('processing event', event);

        const handlers = this.handlers[event.topic];
        if (handlers === undefined) {
          logger.debug(
            `event "${event.topic}" received but dropped due to no handlers`
          );
          return;
        }
        Object.values(handlers).forEach((handler) => handler(event));
      });

    // emit all events in the emit buffer
    const eventsToEmit = this.emitBuffer.splice(0, this.emitBuffer.length);
    if (eventsToEmit.length > 0) {
      const batchEvent: Events.BatchEvent = {
        topic: Events.BATCH_EVENT_NAME,
        data: eventsToEmit,
      };
      logger.debug('emitting batch event %o', batchEvent);
      this.socket.emit(Events.BATCH_EVENT_NAME, batchEvent);
    }
  };

  /**
   * Joins the room
   * @param id the id of the room to join
   * @param endpoint the game server endpoint
   */
  join = (id: string, endpoint: string): void => {
    this.room = {
      id,
      endpoint,
    };

    const connectionString = `${endpoint}/${id}`;
    logger.debug('connecting to %s', connectionString);
    this.socket = io(connectionString, {
      reconnection: true,
    });

    // add the client connection event handler
    this.on(
      Events.CLIENT_CONNECTION_EVENT_NAME,
      (event: Events.ClientConnectionEvent) => {
        logger.debug('ClientConnectionEvent received %o', event);
        this.clientId = event.data.clientId;
      }
    );

    // set up event handling
    this.socket.onAny((eventName: string, event: Event) => {
      logger.debug('received event', event);
      if (eventName === Events.BATCH_EVENT_NAME) {
        this.processBuffer.push(...(event as Events.BatchEvent).data);
      } else {
        this.processBuffer.push(event);
      }
    });
  };

  /**
   * Adds a room handler
   * @param eventName the event name
   * @param handler the handler function
   * @returns the id of the created room handler
   */
  on = (eventName: string, handler: EventHandler): string => {
    const id = uuid();
    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = {};
    }
    this.handlers[eventName][id] = handler;
    return id;
  };

  /**
   * Removes an event handler by handler id
   * @param eventName the name of the event
   * @param handlerId the id of the event handler
   */
  removeHandler(eventName: string, handlerId: string): void {
    if (this.handlers[eventName] !== undefined) {
      delete this.handlers[eventName][handlerId];
    }
  }

  /**
   * Emits an event to the room
   * @param event the event to emit
   */
  emit = <E extends Event | Event>(event: E): void => {
    this.emitBuffer.push(event);
  };
}

export { NetworkManager };
