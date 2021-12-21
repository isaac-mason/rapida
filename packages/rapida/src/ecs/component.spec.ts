import { describe, it, expect, jest } from '@jest/globals';
import { Component } from './component';
import { Entity } from './entity';

describe('Component', () => {
  let space: any;

  class TestComponent extends Component {
    onInit = jest.fn();

    onDestroy = jest.fn();

    onUpdate = jest.fn();
  }

  it('should construct', () => {
    const testComponent = new TestComponent();
    expect(testComponent).toBeTruthy();
  });

  it('should be able to get and set its entity and space', () => {
    const testComponent = new TestComponent();

    space = {};

    const entity: Entity = {
      id: '123',
      get: () => testComponent,
      space,
    } as unknown as Entity;

    testComponent.entity = entity;

    const getEntityResult = testComponent.entity;

    expect(getEntityResult).toBeTruthy();
    expect(getEntityResult.id).toBe('123');

    const getSceneResult = testComponent.space;

    expect(getSceneResult).toBeTruthy();
  });

  describe('getComponentNames', () => {
    it('should passthrough a string component name', () => {
      expect(Component.getComponentName('value')).toBe('value');
    });

    it('should return a component instances name', () => {
      const instance = new TestComponent();
      expect(Component.getComponentName(instance)).toBe('TestComponent');
    });

    it('should return a component constructors name', () => {
      expect(Component.getComponentName(TestComponent)).toBe('TestComponent');
    });
  });
});
