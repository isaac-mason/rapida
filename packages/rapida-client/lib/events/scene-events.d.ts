import { Entity } from '../core/entity';
declare const ADD_ENTITY_TO_SCENE_EVENT_NAME = "scene.e.add";
declare type AddEntityToSceneEvent = {
    topic: string;
    data: {
        entity: Entity;
    };
};
declare const REMOVE_ENTITY_FROM_SCENE_EVENT_NAME = "scene.e.remove";
declare type RemoveEntityFromSceneEvent = {
    topic: string;
    data: {
        entity: Entity;
    };
};
export { ADD_ENTITY_TO_SCENE_EVENT_NAME, AddEntityToSceneEvent, REMOVE_ENTITY_FROM_SCENE_EVENT_NAME, RemoveEntityFromSceneEvent, };
