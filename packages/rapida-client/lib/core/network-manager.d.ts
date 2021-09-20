import { Event, EventHandler } from '@isaacmason/rapida-common';
import { Socket } from 'socket.io-client';
interface Room {
    /**
     * The ID of the room
     */
    id: string;
    /**
     * The endpoint URI for the room, including the port
     */
    endpoint: string;
}
declare class NetworkManager {
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
     * The client socket.io socket
     */
    protected socket?: Socket;
    /**
     * Emits events in the emit buffer, broadcasts events in the process buffer
     */
    tick: () => void;
    /**
     * Joins the room
     * @param id the id of the room to join
     * @param endpoint the game server endpoint
     */
    join: (id: string, endpoint: string) => void;
    /**
     * Adds a room handler
     * @param eventName the event name
     * @param handler the handler function
     * @returns the id of the created room handler
     */
    on: (eventName: string, handler: EventHandler) => string;
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
}
export { NetworkManager, Room };
