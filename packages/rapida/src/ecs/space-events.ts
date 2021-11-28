import { Entity } from './entity';

const ADD_ENTITY_TO_SPACE_EVENT_NAME = 'space.e.add';

type AddEntityToSpaceEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};

const REMOVE_ENTITY_FROM_SPACE_EVENT_NAME = 'space.e.remove';

type RemoveEntityFromSpaceEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};

export {
  ADD_ENTITY_TO_SPACE_EVENT_NAME,
  AddEntityToSpaceEvent,
  REMOVE_ENTITY_FROM_SPACE_EVENT_NAME,
  RemoveEntityFromSpaceEvent,
};
