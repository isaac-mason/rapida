/* eslint-disable max-classes-per-file */
import { describe, it, expect, jest } from '@jest/globals';
import { emit } from 'process';
import { Space } from './space';
import { Component } from './component';
import { Entity } from './entity';

class TestComponentOne extends Component {
  onInit = jest.fn();
}
class TestComponentTwo extends Component {
  onInit = jest.fn();
}

describe('Entity', () => {
  let entity: Entity;

  const mockSpace = {
    recs: {
      queryManager: {
        onEntityComponentAdded: jest.fn(),
        onEntityComponentRemoved: jest.fn(),
      },
      entityPool: {
        request: jest.fn(),
        release: jest.fn(),
      },
      componentPool: {
        request: (constr: { new (...args: never[]): Component }) =>
          // eslint-disable-next-line new-cap
          new constr(),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        release: (_component: never) => {},
      },
      _entityUpdatePool: new Map(),
      _componentUpdatePool: new Map(),
    },
  } as unknown as Space;

  beforeEach(() => {
    jest.resetAllMocks();
    mockSpace.recs._entityUpdatePool = new Map();
    mockSpace.recs._componentUpdatePool = new Map();

    entity = new Entity();
    entity.space = mockSpace;
  });

  it('should construct with default params if none are given', () => {
    expect(entity.id).toBeTruthy();
    expect(entity.components.size).toBe(0);
  });

  it('should add the entity event system tick method to the entity update pool', () => {
    entity._init();

    expect(mockSpace.recs._entityUpdatePool.size).toBe(1);
  });

  describe('addComponent', () => {
    it('should initialise the component if the entity is already initialised', () => {
      const componentOne = entity.addComponent(TestComponentOne);
      expect(componentOne.onInit).toHaveBeenCalledTimes(0);

      entity._init();

      expect(componentOne.onInit).toHaveBeenCalledTimes(1);

      const componentTwo = entity.addComponent(TestComponentTwo);
      expect(componentTwo.onInit).toHaveBeenCalledTimes(1);
    });

    it('should add the component update method to the component update pool', () => {
      const updateMock = jest.fn();

      class TestComponentWithUpdate extends Component {
        onUpdate = updateMock;
      }

      entity.addComponent(TestComponentWithUpdate);

      expect(mockSpace.recs._componentUpdatePool.size).toBe(0);

      entity._init();

      expect(mockSpace.recs._componentUpdatePool.size).toBe(1);
    });
  });

  describe('removeComponent', () => {
    it('should throw an error if the component is not in the entity', () => {
      expect(() => entity.removeComponent(TestComponentOne)).toThrowError();

      expect(() =>
        entity.removeComponent(new TestComponentOne())
      ).toThrowError();
    });

    it('should run the onDestroy method', () => {
      const onDestroyMockFn = jest.fn();

      class TestComponentWithOnDestroy extends Component {
        onDestroy = onDestroyMockFn;
      }

      entity.addComponent(TestComponentWithOnDestroy);

      entity._init();

      expect(onDestroyMockFn).toHaveBeenCalledTimes(0);

      entity.removeComponent(TestComponentWithOnDestroy);

      expect(onDestroyMockFn).toHaveBeenCalledTimes(1);
    });

    it('should remove the component from the component update pool', () => {
      const updateMockOne = jest.fn();
      const updateMockTwo = jest.fn();

      class TestComponentWithUpdateOne extends Component {
        onUpdate = updateMockOne;
      }

      class TestComponentWithUpdateTwo extends Component {
        onUpdate = updateMockTwo;
      }

      entity.addComponent(TestComponentWithUpdateOne);
      const componentTwo = entity.addComponent(TestComponentWithUpdateTwo);

      expect(mockSpace.recs._componentUpdatePool.size).toBe(0);

      entity._init();

      expect(mockSpace.recs._componentUpdatePool.size).toBe(2);

      entity.removeComponent(TestComponentWithUpdateOne);
      entity.removeComponent(componentTwo);

      expect(mockSpace.recs._componentUpdatePool.size).toBe(0);
    });
  });

  describe('get', () => {
    it('should throw an error if the component is not in the entity', () => {
      expect(() => entity.get(TestComponentOne)).toThrow();
    });

    it('should return the component instance if the component is in the entity', () => {
      entity.addComponent(TestComponentOne);

      expect(entity.get(TestComponentOne)).toBeInstanceOf(TestComponentOne);
    });
  });

  describe('find', () => {
    it('should return undefined if the component is not in the entity', () => {
      expect(entity.find(TestComponentOne)).toBeUndefined();
    });

    it('should return the component instance if the component is in the entity', () => {
      entity.addComponent(TestComponentOne);

      expect(entity.find(TestComponentOne)).toBeInstanceOf(TestComponentOne);
    });
  });

  describe('has', () => {
    it('should return true if the entity has the given component', () => {
      entity.addComponent(TestComponentOne);

      expect(entity.has(TestComponentOne)).toBe(true);
      expect(entity.has(TestComponentOne.name)).toBe(true);
    });

    it('should return false if the entity does not have the given component', () => {
      entity.addComponent(TestComponentOne);

      expect(entity.has(TestComponentOne)).toBe(true);
      expect(entity.has(TestComponentOne.name)).toBe(true);

      expect(entity.has(TestComponentTwo)).toBe(false);
      expect(entity.has(TestComponentTwo.name)).toBe(false);

      entity.removeComponent(TestComponentOne);

      expect(entity.has(TestComponentOne)).toBe(false);
      expect(entity.has(TestComponentOne.name)).toBe(false);

      expect(entity.has(TestComponentTwo)).toBe(false);
      expect(entity.has(TestComponentTwo.name)).toBe(false);
    });
  });
});
