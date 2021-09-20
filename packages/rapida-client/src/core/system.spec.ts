import { EventHandler, uuid } from '@isaacmason/rapida-common';
import { describe, it, jest, expect, beforeEach } from '@jest/globals';
import { Runtime } from './runtime';
import { NetworkManager } from './network-manager';
import {
  AddEntityToSceneEvent,
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
} from '../events/scene-events';
import { Component } from './component';
import { Entity } from './entity';
import Scene from './scene';
import { System } from './system';

const ENTITY_NAME_FILTER_PASS = '123';
const ENTITY_NAME_FILTER_FAIL = '321';

jest.mock('./scene');

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

  const componentOne: Component = {
    id: '123',
    name: '123',
  } as unknown as Component;

  const entityOne: Entity = {
    id: '123',
    name: ENTITY_NAME_FILTER_PASS,
    getComponent: () => componentOne,
  } as unknown as Entity;

  componentOne.entity = entityOne;

  const componentTwo: Component = {
    id: '123',
    name: '123',
  } as unknown as Component;

  const entityTwo: Entity = {
    id: '123',
    name: ENTITY_NAME_FILTER_FAIL,
    getComponent: () => componentTwo,
  } as unknown as Entity;

  componentTwo.entity = entityTwo;

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

    handlers
      .find((h) => h.topic === ADD_ENTITY_TO_SCENE_EVENT_NAME)
      .handler({
        topic: ADD_ENTITY_TO_SCENE_EVENT_NAME,
        data: {
          entity: entityOne,
        },
      } as AddEntityToSceneEvent);

    handlers
      .find((h) => h.topic === ADD_ENTITY_TO_SCENE_EVENT_NAME)
      .handler({
        topic: ADD_ENTITY_TO_SCENE_EVENT_NAME,
        data: {
          entity: entityTwo,
        },
      } as AddEntityToSceneEvent);

    expect(Object.values(system.entities)).toHaveLength(1);
    expect(Object.values(system.entities)).toContain(entityOne);

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
