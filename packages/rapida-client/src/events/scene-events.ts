import { Entity } from '../ecs/entity';

const ADD_ENTITY_TO_SCENE_EVENT_NAME = 'scene.e.add';

type AddEntityToSceneEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};

const REMOVE_ENTITY_FROM_SCENE_EVENT_NAME = 'scene.e.remove';

type RemoveEntityFromSceneEvent = {
  topic: string;
  data: {
    entity: Entity;
  };
};

export {
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  AddEntityToSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
};
