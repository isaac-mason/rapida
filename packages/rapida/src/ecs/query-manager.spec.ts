/* eslint-disable max-classes-per-file */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Entity } from './entity';
import { Component } from './component';
import { QueryConditionType, QueryDescription } from './query';
import QueryManager from './query-manager';
import { Space } from './space';
import { World } from '..';

describe('QueryManager', () => {
  const mockSpace = {
    id: '123',
    world: {
      queryManager: {
        onEntityComponentAdded: jest.fn(),
        onEntityComponentRemoved: jest.fn(),
      },
    },
    entities: new Map(),
  } as unknown as Space;

  const spacesMap = new Map();
  spacesMap.set(mockSpace.id, mockSpace);
  const mockWorld = {
    spaces: spacesMap,
  } as unknown as World;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getQuery', () => {
    class TestComponent extends Component {}

    it('should create a query if it has not been created', () => {
      const manager = new QueryManager(mockWorld);

      const description: QueryDescription = {
        all: [TestComponent],
      };

      const query = manager.getQuery(description);

      expect(query).toBeTruthy();
    });

    it('should create a query if it has already been created', () => {
      const manager = new QueryManager(mockWorld);

      const description: QueryDescription = {
        all: [TestComponent],
      };

      const queryOne = manager.getQuery(description);

      const queryTwo = manager.getQuery(description);

      expect(queryOne).toBeTruthy();
      expect(queryTwo).toBeTruthy();

      expect(queryOne).toEqual(queryTwo);
    });
  });

  describe('removeQuery', () => {
    class TestComponent extends Component {}

    it('should remove a query by a given query description', () => {
      const manager = new QueryManager(mockWorld);

      const description: QueryDescription = {
        all: [TestComponent],
      };

      const queryOne = manager.getQuery(description);

      const queryTwo = manager.getQuery(description);

      expect(queryOne).toBeTruthy();
      expect(queryTwo).toBeTruthy();

      expect(queryOne).toEqual(queryTwo);

      manager.removeQuery(queryOne);

      const queryThree = manager.getQuery(description);

      expect(queryThree).toBeTruthy();

      expect(queryOne).not.toBe(queryThree);
    });
  });

  class TestComponentOne extends Component {}

  class TestComponentTwo extends Component {}

  describe('onEntityComponentAdded', () => {
    it('should add entities to a query if the entity matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity(mockSpace);
      const componentOne = new TestComponentOne();
      entityOne.addComponent(componentOne);

      const entityTwo = new Entity(mockSpace);
      const componentTwo = new TestComponentTwo();
      entityTwo.addComponent(componentTwo);

      const manager = new QueryManager(mockWorld);
      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(entityOne, componentOne);
      manager.onEntityComponentAdded(entityTwo, componentTwo);

      query = manager.getQuery(description);

      expect(query.entities.size).toBe(1);
      expect(query.entities).toContain(entityOne);
      expect(query.entities).not.toContain(entityTwo);
    });
  });

  describe('onEntityComponentRemoved', () => {
    it('should remove entities from a query if an entity no longer matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity(mockSpace);
      const entityOneComponentOne = new TestComponentOne();
      entityOne.addComponent(entityOneComponentOne);

      const entityTwo = new Entity(mockSpace);
      const entityTwoComponentOne = new TestComponentOne();
      entityTwo.addComponent(entityTwoComponentOne);
      const entityTwoComponentTwo = new TestComponentTwo();
      entityTwo.addComponent(entityTwoComponentTwo);

      const manager = new QueryManager(mockWorld);
      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(entityOne, entityOneComponentOne);
      manager.onEntityComponentAdded(entityTwo, entityTwoComponentOne);
      manager.onEntityComponentAdded(entityTwo, entityTwoComponentTwo);

      expect(query.entities.size).toBe(2);
      expect(query.entities).toContain(entityOne);
      expect(query.entities).toContain(entityTwo);

      entityOne.removeComponent(entityOneComponentOne);
      entityTwo.removeComponent(entityTwoComponentTwo);

      manager.onEntityComponentRemoved(entityOne, entityOneComponentOne);
      manager.onEntityComponentRemoved(entityTwo, entityTwoComponentTwo);

      query = manager.getQuery(description);

      expect(query.entities.size).toBe(1);
      expect(query.entities).not.toContain(entityOne);
      expect(query.entities).toContain(entityTwo);
    });
  });

  describe('onEntityRemoved', () => {
    it('should remove the entity from all queries', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity(mockSpace);
      const entityOneComponentOne = new TestComponentOne();
      entityOne.addComponent(entityOneComponentOne);

      const entityTwo = new Entity(mockSpace);
      const entityTwoComponentOne = new TestComponentOne();
      entityTwo.addComponent(entityTwoComponentOne);
      const entityTwoComponentTwo = new TestComponentTwo();
      entityTwo.addComponent(entityTwoComponentTwo);

      const manager = new QueryManager(mockWorld);
      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(entityOne, entityOneComponentOne);
      manager.onEntityComponentAdded(entityTwo, entityTwoComponentOne);
      manager.onEntityComponentAdded(entityTwo, entityTwoComponentTwo);

      expect(query.entities.size).toBe(2);
      expect(query.entities).toContain(entityOne);
      expect(query.entities).toContain(entityTwo);

      manager.onEntityRemoved(entityOne);

      query = manager.getQuery(description);

      expect(query.entities.size).toBe(1);
      expect(query.entities).not.toContain(entityOne);
      expect(query.entities).toContain(entityTwo);
    });
  });
});
