import { Entity } from './entity';

export const ADD_ENTITY_TO_SPACE_EVENT_NAME = 'space.e.add';

export type AddEntityToSpaceEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};

export const REMOVE_ENTITY_FROM_SPACE_EVENT_NAME = 'space.e.remove';

export type RemoveEntityFromSpaceEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};
