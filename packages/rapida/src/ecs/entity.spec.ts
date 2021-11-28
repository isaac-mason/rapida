/* eslint-disable max-classes-per-file */
import { describe, it, expect, jest } from '@jest/globals';
import { Space } from '.';
import { Component } from './component';
import { Entity } from './entity';

describe('Entity', () => {
  const mockSpace = {
    world: {
      queryManager: {
        onEntityComponentAdded: jest.fn(),
        onEntityComponentRemoved: jest.fn(),
      },
    },
  } as unknown as Space;

  it('should construct with default params if none are given', () => {
    const entity = new Entity(mockSpace);
    expect(entity.id).toBeTruthy();
    expect(entity.components.size).toBe(0);
    expect(entity.componentNames.size).toBe(0);
  });

  describe('get', () => {
    class TestComponentOne extends Component {}

    it('should return null if the component is not in the entity', () => {
      const entity = new Entity(mockSpace);

      expect(entity.get(TestComponentOne)).toBeNull();
    });

    it('should return the component instance if the component is in the entity', () => {
      const entity = new Entity(mockSpace);
      const component = new TestComponentOne();

      entity.addComponent(component);

      expect(entity.get(TestComponentOne)).toBe(component);
    });
  });

  describe('has', () => {
    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}

    it('should return true if the entity has the given component', () => {
      const entity = new Entity(mockSpace);
      const component = new TestComponentOne();
      entity.addComponent(component);

      expect(entity.has(component)).toBe(true);
      expect(entity.has(TestComponentOne)).toBe(true);
      expect(entity.has(TestComponentOne.name)).toBe(true);
    });

    it('should return false if the entity does not have the given component', () => {
      const entity = new Entity(mockSpace);
      const componentOne = new TestComponentOne();
      const componentTwo = new TestComponentTwo();
      entity.addComponent(componentOne);

      expect(entity.has(componentOne)).toBe(true);
      expect(entity.has(TestComponentOne)).toBe(true);
      expect(entity.has(TestComponentOne.name)).toBe(true);

      expect(entity.has(componentTwo)).toBe(false);
      expect(entity.has(TestComponentTwo)).toBe(false);
      expect(entity.has(TestComponentTwo.name)).toBe(false);

      entity.removeComponent(componentOne);

      expect(entity.has(componentOne)).toBe(false);
      expect(entity.has(TestComponentOne)).toBe(false);
      expect(entity.has(TestComponentOne.name)).toBe(false);
    });
  });
});
