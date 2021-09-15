export const PLAYER_CONNECTION_EVENT = 'connection';
export interface PlayerConnectionEvent {
  topic: string;
  data: {
    id: string;
  }
}
