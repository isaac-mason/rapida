import { describe, it, expect, jest } from '@jest/globals';
import { Component } from './component';
import { Entity } from './entity';

jest.mock('../scene');

describe('Component', () => {
  let scene: any;

  class TestComponent extends Component {
    init = jest.fn();

    destroy = jest.fn();

    update = jest.fn();
  }

  it('should construct', () => {
    const testComponent = new TestComponent('name');
    expect(testComponent).toBeTruthy();
  });

  it('should be able to get and set its entity, scene and network manager', () => {
    const testComponent = new TestComponent('name');

    scene = { networkManager: {} };

    const entity: Entity = {
      id: '123',
      name: 'testEntity',
      getComponent: () => testComponent,
      scene,
    } as unknown as Entity;

    testComponent.entity = entity;

    const getEntityResult = testComponent.entity;

    expect(getEntityResult).toBeTruthy();
    expect(getEntityResult.name).toBe('testEntity');

    const getSceneResult = testComponent.scene;

    expect(getSceneResult).toBeTruthy();

    const getNetworkManager = testComponent.networkManager;

    expect(getNetworkManager).toBeTruthy();
  });
});
