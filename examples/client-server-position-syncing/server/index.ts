import {
  Connection,
  pino,
  Room,
  RoomManager,
  Server,
} from '@rapidajs/rapida-server';
import { CLIENT_ENDPOINT, SCENE_ID, TESTING_ROOM_ID } from 'common';
import {
  PlayerPositionUpdateEvent,
  PLAYER_POSITION_UPDATE,
} from 'common/events/client-to-server';
import {
  OtherBoxesUpdateEvent,
  OTHER_BOXES_UPDATE_EVENT,
  PlayerInitEvent,
  PLAYER_INIT_EVENT,
} from 'common/events/server-to-client';

const server = new Server({
  port: 3000,
  corsClientOrigin: CLIENT_ENDPOINT,
  serverLogger: pino.default({
    prettyPrint: true,
    level: 'debug',
  }),
});

class ExampleRoomManager extends RoomManager {
  players: {
    [id: string]: { id: string; position: { x: number; y: number; z: number } };
  } = {};

  onConnection = (connection: Connection) => {
    const { id } = connection;
    const newPlayer = {
      id,
      position: { x: 0, y: 0, z: 0 },
    };
    this.players[id] = newPlayer;

    this.room.connections[id].emit({
      topic: PLAYER_INIT_EVENT,
      data: newPlayer,
    } as PlayerInitEvent);

    this.logger.info(`created new player ${id}`);
  };

  onDisconnect = (connection: Connection) => {
    const { id } = connection;
    delete this.players[id];

    this.logger.info(`removed disconnected player ${id}`);
  };

  init = () => {
    this.room.addHandler(
      PLAYER_POSITION_UPDATE,
      'updatePlayerPosition',
      (event: PlayerPositionUpdateEvent) => {
        const { id } = event.data;
        const player = this.players[id];
        if (player === undefined) {
          this.logger.warn(`player with id "${id}" does not exist`);
          return;
        }
        this.logger.debug(`player ${id} position updated`);
        player.position = event.data.position;
      }
    );
  };

  update = (timeElapsed: number) => {
    this.room.emit<OtherBoxesUpdateEvent>({
      topic: OTHER_BOXES_UPDATE_EVENT,
      data: Object.values(this.players),
    });
  };
}

const roomManagerProvider = (room: Room): RoomManager => {
  return new ExampleRoomManager(SCENE_ID, room);
};

server.start();

console.log(`server running on port ${server.port}`);

server.registerRoomManager(SCENE_ID, roomManagerProvider);

console.log(`creating room ${TESTING_ROOM_ID}`);

server.createRoom(SCENE_ID, TESTING_ROOM_ID);
