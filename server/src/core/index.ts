/* eslint-disable max-classes-per-file */
import { Event, EventHandler, Events } from '@isaacmason/rapida-common';
import { performance } from 'perf_hooks';
import logger, { Logger } from 'pino';
import { Namespace, Socket } from 'socket.io';

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
      Object.values(connectionHandlers).map((handler) => handler(event));
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

type RoomManagerProvider = (room: Room) => RoomManager;

interface RoomParams {
  id: string;
  namespace: Namespace;
  roomManagerProvider: RoomManagerProvider;
  roomLogger?: Logger;
  maxUpdatesPerSecond?: number;
}

/**
 * A room that rapida clients can join
 */
class Room {
  /**
   * The rooms unique ID
   */
  id: string;

  /**
   * The socket io namespace
   */
  namespace: Namespace;

  /**
   * The scene manager for the room
   */
  roomManager: RoomManager;

  /**
   * The rooms active connections
   */
  connections: { [id: string]: Connection } = {};

  /**
   * The logger for the room
   */
  logger: Logger;

  /**
   * The delay time between room updates
   */
  private tickDelay: number;

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
   * The scene manager provider for the room
   */
  private roomManagerProvider: RoomManagerProvider;

  constructor({
    id,
    namespace,
    roomManagerProvider,
    roomLogger,
    maxUpdatesPerSecond,
  }: RoomParams) {
    this.id = id;
    this.namespace = namespace;
    this.roomManagerProvider = roomManagerProvider;
    this.logger = roomLogger || logger();
    this.tickDelay = 1000 / (maxUpdatesPerSecond || 60);

    // set up namespace room connection handling
    this.namespace.on('connection', (socket: Socket) => {
      this.logger.info(
        `new connection from socket id "${socket.id}" for namespace ${namespace.name}`
      );

      // create a new connection in the room
      const connection = new Connection({
        connectionId: socket.id,
        room: this,
        connectionLogger: this.logger,
        socket,
      });
      this.addConnection(connection);
      this.logger.info(
        `added new connection to room "${this.id}" with id "${connection.id}"`
      );

      // handle disconnects
      socket.on('disconnect', () => {
        // remove the connection from the room
        this.roomManager.onDisconnect(connection);
        this.removeConnection(connection.id);
      });

      // set up event handling for the new connection
      socket.onAny((eventName: string, event: Event) => {
        this.logger.debug(
          'Room %s received event "%s" %o with handlers %o',
          this.id,
          eventName,
          event,
          this.handlers
        );

        if (eventName === Events.BATCH_EVENT_NAME) {
          (event as Events.BatchEvent).data.map((e) => {
            this.process(e);
            connection.process(e);
          });
        } else {
          this.process(event);
          connection.process(event);
        }
      });

      // emit a client connection event
      this.logger.debug('Emitting ClientConnection event for id %s', socket.id);
      connection.emit({
        topic: Events.CLIENT_CONNECTION_EVENT_NAME,
        data: {
          clientId: socket.id,
        },
      } as Events.ClientConnectionEvent);

      // call the room managers on connection method
      this.roomManager.onConnection(connection);
    });

    // create the room manager
    this.roomManager = this.roomManagerProvider(this);

    // run room manager initialisation logic
    this.roomManager.init();

    // start the room update loop
    this._run();
  }

  private _run = () => {
    this._schedule(performance.now());
  };

  private _schedule = (t1: number) => {
    setTimeout(() => {
      const t2 = performance.now();
      this.roomManager.update((t2 - t1) * 0.001);
      this.tick();
      this._schedule(t2);
    }, this.tickDelay);
  };

  /**
   * Processes all events in the process buffer, emits all events in the emit buffer
   */
  tick = (): void => {
    // process all events in the process buffer
    this.processBuffer
      .splice(0, this.processBuffer.length)
      .forEach((event: Event) => this.process(event));

    // emit all events in the emit buffer as a batch event
    const eventsToEmit = this.emitBuffer.splice(0, this.emitBuffer.length);
    if (eventsToEmit.length > 0) {
      this.namespace.emit(Events.BATCH_EVENT_NAME, {
        topic: Events.BATCH_EVENT_NAME,
        data: eventsToEmit,
      } as Events.BatchEvent);
    }

    // tick connections
    Object.values(this.connections).map((c) => c.tick());
  };

  /**
   * Adds a connection
   * @param connection the connection to add
   */
  addConnection = (connection: Connection): void => {
    this.connections[connection.id] = connection;
  };

  /**
   * Removes a connection
   * @param id the id of the connection to remove
   */
  removeConnection = (id: string): void => {
    delete this.connections[id];
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

  /**
   * Processes an event
   * @param event the event to emit
   */
  process = (event: Event): void => {
    this.logger.debug(
      'Room %s handling event %o with handlers %o',
      this.id,
      event,
      this.handlers
    );
    const roomHandlers = this.handlers[event.topic];
    if (roomHandlers !== undefined) {
      Object.values(roomHandlers).map((handler) => handler(event));
    }
  };
}

/**
 * An abstract class that can be extended to define the behaviour of a room
 */
abstract class RoomManager {
  /**
   * The unique ID for the room manager
   */
  id: string;

  /**
   * The room that the room manager is managing
   */
  room: Room;

  /**
   * The namespace for the room managers room
   */
  get namespace(): Namespace {
    if (this.room === undefined) {
      throw new Error('room is not available yet');
    }
    return this.room.namespace;
  }

  /**
   * The logger for the room managers room
   */
  get logger(): Logger {
    if (this.room === undefined) {
      throw new Error('room is not available yet');
    }
    return this.room.logger;
  }

  constructor(id: string, room: Room) {
    this.id = id;
    this.room = room;
  }

  /**
   * Room initialisation logic
   */
  abstract init(): void;

  /**
   * The Room Managers update logic
   * @param timeElapsed the time elapsed in seconds
   */
  abstract update(timeElapsed: number): void;

  /**
   * Logic for handling a new connection
   * @param connection the new connection
   */
  abstract onConnection(connection: Connection): void;

  /**
   * Logic for handling a client disconnecting
   * @param connection the disconnected connection
   */
  abstract onDisconnect(connection: Connection): void;
}

export { RoomManager, RoomManagerProvider, Room, Connection };
