import { Event, EventHandler } from '@isaacmason/rapida-common';
import { Logger } from 'pino';
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
declare class Connection {
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
    private handlers;
    /**
     * A buffer of events waiting to be emitted
     */
    private emitBuffer;
    /**
     * The logger for the connection
     */
    private logger;
    constructor({ connectionId, socket, room, connectionLogger, }: ConnectionParams);
    /**
     * Emits all events in the emit buffer
     */
    tick: () => void;
    /**
     * Adds a room handler.
     * @param eventName the event name
     * @param handlerName the name for the handler. Must be unique for the eventName.
     * @param handler the handler function
     */
    addHandler: (eventName: string, handlerName: string, handler: EventHandler) => void;
    /**
     * Processes an event
     * @param event the event to emit
     */
    process: (event: Event) => void;
    /**
     * Emits an event to the connection
     * @param event the event to emit
     */
    emit: <E extends Event>(event: E) => void;
    /**
     * Clears all handlers
     */
    clearHandlers: () => void;
}
declare type RoomManagerProvider = (room: Room) => RoomManager;
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
declare class Room {
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
    connections: {
        [id: string]: Connection;
    };
    /**
     * The logger for the room
     */
    logger: Logger;
    /**
     * The delay time between room updates
     */
    private tickDelay;
    /**
     * Handlers for the room
     */
    private handlers;
    /**
     * A buffer of events waiting to be emitted
     */
    private emitBuffer;
    /**
     * A buffer of events waiting to be processed
     */
    private processBuffer;
    /**
     * The scene manager provider for the room
     */
    private roomManagerProvider;
    constructor({ id, namespace, roomManagerProvider, roomLogger, maxUpdatesPerSecond, }: RoomParams);
    private _run;
    private _schedule;
    /**
     * Processes all events in the process buffer, emits all events in the emit buffer
     */
    tick: () => void;
    /**
     * Adds a connection
     * @param connection the connection to add
     */
    addConnection: (connection: Connection) => void;
    /**
     * Removes a connection
     * @param id the id of the connection to remove
     */
    removeConnection: (id: string) => void;
    /**
     * Adds a room handler.
     * @param eventName the event name
     * @param handlerName the name for the handler. Must be unique for the eventName.
     * @param handler the handler function
     */
    addHandler: (eventName: string, handlerName: string, handler: EventHandler) => void;
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    removeHandler(eventName: string, handlerId: string): void;
    /**
     * Emits an event to the room
     * @param event the event to emit
     */
    emit: <E extends Event>(event: E) => void;
    /**
     * Processes an event
     * @param event the event to emit
     */
    process: (event: Event) => void;
}
/**
 * An abstract class that can be extended to define the behaviour of a room
 */
declare abstract class RoomManager {
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
    get namespace(): Namespace;
    /**
     * The logger for the room managers room
     */
    get logger(): Logger;
    constructor(id: string, room: Room);
    /**
     * Room initialisation logic
     */
    abstract init(): void;
    /**
     * The Room Managers update logic
     * @param timeElapsed the time elapsed in milliseconds
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
