// clean up needing to init on adding to scene if scene is already init-ed
// game manager adding player and others
export const PLAYER_INIT_EVENT = 'player.init';
export type PlayerInitEvent = {
  topic: string;
  data: {
    id: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
  }
}

export const OTHER_BOXES_UPDATE_EVENT = 'others.update';
export type OtherBoxesUpdateEvent = {
  topic: string;
  data: ({
    id: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
  })[]
}
