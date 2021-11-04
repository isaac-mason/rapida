import { EventHandler, uuid } from '@isaacmason/rapida-common';
import { describe, it, jest, expect, beforeEach } from '@jest/globals';
import { Runtime } from '../runtime';
import { NetworkManager } from '../network/network-manager';
import {
  AddEntityToSceneEvent,
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
} from '../events/scene-events';
import { Entity } from './entity';
import Scene from '../scene';
import { System } from './system';

const ENTITY_ID_FILTER_PASS = 'ENTITY_ONE_ID';
const ENTITY_NAME_FILTER_PASS = 'ENTITY_ONE_NAME';

const ENTITY_ID_FILTER_FAIL = 'ENTITY_TWO_ID';
const ENTITY_NAME_FILTER_FAIL = 'ENTITY_TWO_NAME';

jest.mock('../scene');

describe('System', () => {
  let scene: any;

  const onAdd = jest.fn();
  const onRemove = jest.fn();
  const onUpdate = jest.fn();
  const onSystemInit = jest.fn();
  const onSystemDestroy = jest.fn();

  class TestSystem extends System {
    entityFilter = (e: Entity) => {
      return e.name === ENTITY_NAME_FILTER_PASS;
    };

    onAdd = onAdd;

    onRemove = onRemove;

    onUpdate = onUpdate;

    onSystemInit = onSystemInit;

    onSystemDestroy = onSystemDestroy;
  }

  const entityOne: Entity = {
    id: ENTITY_ID_FILTER_PASS,
    name: ENTITY_NAME_FILTER_PASS,
  } as unknown as Entity;

  const entityTwo: Entity = {
    id: ENTITY_ID_FILTER_FAIL,
    name: ENTITY_NAME_FILTER_FAIL,
  } as unknown as Entity;

  beforeEach(() => {
    jest.clearAllMocks();
    scene = new Scene('scene', {
      runtime: {} as Runtime,
      networkManager: {} as NetworkManager,
    });
  });

  it('should listen to scene add and remove entity events and filter them', () => {
    const system = new TestSystem('testSystem');

    const handlers: any[] = [];

    scene.on.mockImplementation(
      (eventName: string, handler: EventHandler): string => {
        handlers.push({ topic: eventName, handler });
        return uuid();
      }
    );

    system.scene = scene;

    system.init();

    expect(handlers).toHaveLength(2);
    expect(handlers.map((h) => h.topic)).toContain(
      ADD_ENTITY_TO_SCENE_EVENT_NAME
    );
    expect(handlers.map((h) => h.topic)).toContain(
      REMOVE_ENTITY_FROM_SCENE_EVENT_NAME
    );

    expect(Object.values(system.entities)).toHaveLength(0);

    const addEntityHandler = handlers.find(
      (h) => h.topic === ADD_ENTITY_TO_SCENE_EVENT_NAME
    );

    addEntityHandler.handler({
      topic: ADD_ENTITY_TO_SCENE_EVENT_NAME,
      data: {
        entity: entityOne,
      },
    } as AddEntityToSceneEvent);

    addEntityHandler.handler({
      topic: ADD_ENTITY_TO_SCENE_EVENT_NAME,
      data: {
        entity: entityTwo,
      },
    } as AddEntityToSceneEvent);

    expect(system.entities.get(ENTITY_ID_FILTER_PASS)).toBe(entityOne);
    expect(system.entities.has(ENTITY_ID_FILTER_FAIL)).toBeFalsy();

    handlers
      .find((h) => h.topic === REMOVE_ENTITY_FROM_SCENE_EVENT_NAME)
      .handler({
        topic: REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
        data: {
          entity: entityOne,
        },
      } as RemoveEntityFromSceneEvent);

    expect(Object.values(system.entities)).toHaveLength(0);
  });
});
