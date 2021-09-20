import { Logger } from 'pino';
import { Server as SocketServer } from 'socket.io';
import { Room, RoomManager } from './core';
interface StartServerParams {
    port: number;
    corsClientOrigin?: string;
    serverLogger?: Logger;
}
declare class Server {
    /**
     * The port to start the server on
     */
    port: number;
    /**
     * The servers active rooms
     */
    rooms: {
        [id: string]: Room;
    };
    /**
     * The socket io server
     */
    io: SocketServer;
    /**
     * The servers logger
     */
    logger: Logger;
    /**
     * Room manager provider functions
     */
    private roomManagerProviders;
    /**
     * Client endpoints. If specified, cors options will be set on the socket io server
     */
    private corsClientOrigin?;
    /**
     * The http server
     */
    private http;
    constructor({ port, corsClientOrigin, serverLogger }: StartServerParams);
    /**
     * Starts the server
     */
    start: () => void;
    /**
     * Registers a new room manager
     * @param roomManagerId the room manager ID
     * @param roomManagerProvider a function that returns a new room manager for a given room manager id
     */
    registerRoomManager: (roomManagerId: string, roomManagerProvider: (room: Room) => RoomManager) => void;
    /**
     * Creates a new room with a given room manager
     * @param roomManagerId the room manager ID to create a room for. A room manager provider with the given room manager ID must exist
     * @param roomId an optional roomId
     */
    createRoom: (roomManagerId: string, roomId?: string | undefined) => Room;
    /**
     * Retrieves currently active rooms
     */
    getRooms(): Room[];
}
export default Server;
