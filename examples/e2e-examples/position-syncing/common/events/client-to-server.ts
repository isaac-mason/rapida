export const PLAYER_POSITION_UPDATE = 'player.position.update';
export interface PlayerPositionUpdateEvent {
  topic: string;
  data: {
    id: string;
    position: {
      x: number;
      y: number;
      z: number;
    }
  }
}
