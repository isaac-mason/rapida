import { uuid } from '@rapidajs/rapida-common';
import { createServer, Server as HttpServer } from 'http';
import logger, { Logger } from 'pino';
import { Server as SocketServer } from 'socket.io';
import RoomManager, { RoomManagerProvider } from './room-manager';
import Room from './room';

interface StartServerParams {
  port: number;
  corsClientOrigin?: string;
  serverLogger?: Logger;
}

class Server {
  /**
   * The port to start the server on
   */
  port: number;

  /**
   * The servers active rooms
   */
  rooms: { [id: string]: Room };

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
  private roomManagerProviders: { [id: string]: RoomManagerProvider };

  /**
   * Client endpoints. If specified, cors options will be set on the socket io server
   */
  private corsClientOrigin?: string;

  /**
   * The http server
   */
  private http: HttpServer;

  constructor({ port, corsClientOrigin, serverLogger }: StartServerParams) {
    this.logger = serverLogger || logger();
    this.port = port;
    this.corsClientOrigin = corsClientOrigin;
    this.rooms = {};
    this.roomManagerProviders = {};

    const cors =
      this.corsClientOrigin !== undefined
        ? {
            origin: this.corsClientOrigin,
            methods: ['GET', 'POST'],
          }
        : undefined;

    this.http = createServer();

    this.io = new SocketServer(this.http, {
      cors,
    });
  }

  /**
   * Starts the server
   */
  start = (): void => {
    this.http.listen(this.port);
  };

  /**
   * Registers a new room manager
   * @param roomManagerId the room manager ID
   * @param roomManagerProvider a function that returns a new room manager for a given room manager id
   */
  registerRoomManager = (
    roomManagerId: string,
    roomManagerProvider: (room: Room) => RoomManager
  ): void => {
    this.roomManagerProviders[roomManagerId] = roomManagerProvider;
  };

  /**
   * Creates a new room with a given room manager
   * @param roomManagerId the room manager ID to create a room for. A room manager provider with the given room manager ID must exist
   * @param roomId an optional roomId
   */
  createRoom = (roomManagerId: string, roomId?: string): Room => {
    // check if the socket io server is available
    if (this.io === undefined) {
      throw new Error('Server io socket server is not ready');
    }

    // get the room id
    const id = roomId || uuid();
    if (this.rooms[id] !== undefined) {
      throw new Error(`A room with the room id ${id} already exists`);
    }

    // get the room manager
    const roomManagerProvider = this.roomManagerProviders[roomManagerId];
    if (roomManagerProvider === undefined) {
      throw new Error(
        'no room manager provider registered for the given room manager id'
      );
    }

    // create a new io namespace with the room id
    const namespace = this.io.of(`/${id}`);

    // create a new room
    const room = new Room({
      id,
      roomManagerProvider,
      namespace,
      roomLogger: this.logger,
    });
    this.rooms[room.id] = room;

    return room;
  };

  /**
   * Retrieves currently active rooms
   */
  getRooms(): Room[] {
    return Object.values(this.rooms);
  }
}

export default Server;
