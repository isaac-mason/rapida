import logger, { Logger } from 'pino';
import { Socket } from 'socket.io';
import { EventHandler, Event, Events } from '@rapidajs/rapida-common';
import Room from './room';

interface ConnectionParams {
  connectionId: string;
  socket: Socket;
  room: Room;
  connectionLogger?: Logger;
}

/**
 * A class for managing a connection from the client
 */
class Connection {
  /**
   * The connection id
   */
  id: string;

  /**
   * The socketio socket
   */
  socket: Socket;

  /**
   * The room the connection belong to
   */
  room: Room;

  /**
   * Handlers for the connection
   */
  private handlers: {
    [eventName: string]: { [handlerName: string]: EventHandler };
  } = {};

  /**
   * A buffer of events waiting to be emitted
   */
  private emitBuffer: Event[] = [];

  /**
   * The logger for the connection
   */
  private logger: Logger;

  constructor({
    connectionId,
    socket,
    room,
    connectionLogger,
  }: ConnectionParams) {
    this.logger = connectionLogger || logger();
    this.id = connectionId;
    this.socket = socket;
    this.room = room;
  }

  /**
   * Emits all events in the emit buffer
   */
  tick = (): void => {
    // emit all events in the emit buffer as a batch event
    const eventsToEmit = this.emitBuffer.splice(0, this.emitBuffer.length);
    if (eventsToEmit.length > 0) {
      this.socket.emit(Events.BATCH_EVENT_NAME, {
        topic: Events.BATCH_EVENT_NAME,
        data: eventsToEmit,
      } as Events.BatchEvent);
    }
  };

  /**
   * Adds a room handler.
   * @param eventName the event name
   * @param handlerName the name for the handler. Must be unique for the eventName.
   * @param handler the handler function
   */
  addHandler = (
    eventName: string,
    handlerName: string,
    handler: EventHandler
  ): void => {
    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = {};
    }

    this.handlers[eventName][handlerName] = handler;
  };

  /**
   * Processes an event
   * @param event the event to emit
   */
  process = (event: Event): void => {
    this.logger.debug(
      'Connection %s handling event %o with handlers %o',
      this.id,
      event,
      this.handlers
    );
    const connectionHandlers = this.handlers[event.topic];
    if (connectionHandlers !== undefined) {
      Object.values(connectionHandlers).forEach((handler) => handler(event));
    }
  };

  /**
   * Emits an event to the connection
   * @param event the event to emit
   */
  emit = <E extends Event | Event>(event: E): void => {
    this.emitBuffer.push(event);
  };

  /**
   * Clears all handlers
   */
  clearHandlers = (): void => {
    this.handlers = {};
  };
}

export default Connection;
