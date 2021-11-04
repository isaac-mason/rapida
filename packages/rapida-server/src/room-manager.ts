/* eslint-disable max-classes-per-file */
import { Logger } from 'pino';
import { Namespace } from 'socket.io';
import Connection from './connection';
import Room from './room';

type RoomManagerProvider = (room: Room) => RoomManager;

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

export default RoomManager;

export { RoomManagerProvider };
