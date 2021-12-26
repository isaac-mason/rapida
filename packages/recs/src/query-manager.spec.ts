/* eslint-disable max-classes-per-file */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Entity } from './entity';
import { Component } from './component';
import { QueryDescription } from './query';
import { QueryManager } from './query-manager';
import { Space } from './space';
import { RECS } from './recs';

class TestComponentOne extends Component {}

class TestComponentTwo extends Component {}

describe('QueryManager', () => {
  let manager: QueryManager;

  const mockRECS = {
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
    spaces: new Map<string, Space>(),
  } as unknown as RECS;

  const mockSpace = {
    id: '123',
    recs: mockRECS,
    entities: new Map(),
  } as unknown as Space;

  const spacesMap = new Map();
  spacesMap.set(mockSpace.id, mockSpace);

  mockRECS.spaces = spacesMap;

  beforeEach(() => {
    jest.resetAllMocks();
    mockSpace.entities.clear();

    manager = new QueryManager(mockRECS);
    mockRECS.queryManager = manager;
  });

  describe('hasQuery', () => {
    class TestComponent extends Component {}
    it('should return whether the query manager has a query', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      expect(manager.hasQuery(description)).toBe(false);

      const query = manager.getQuery(description);

      expect(manager.hasQuery(description)).toBe(true);

      manager.removeQuery(query);

      expect(manager.hasQuery(description)).toBe(false);
    });
  });

  describe('getQuery', () => {
    class TestComponent extends Component {}

    it('should create a query if it has not been created', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const query = manager.getQuery(description);

      expect(query).toBeTruthy();
    });

    it('should populate a new query with existing entities', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const componentsMap = new Map<string, Component>();
      const component = new TestComponent();
      componentsMap.set(TestComponent.name, component);
      const entity = {
        id: 'entity-id',
        has: (_v: never) => true,
      } as unknown as Entity;
      mockSpace.entities.set('entity-id', entity);

      const query = manager.getQuery(description);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entity)).toBeTruthy();
    });

    it('should get the existing query if it has already been created', () => {
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

  describe('onEntityComponentAdded', () => {
    it('should add entities to a query if the entity matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity();
      entityOne.space = mockSpace;

      entityOne.addComponent(TestComponentOne);

      const entityTwo = new Entity();
      entityTwo.space = mockSpace;

      entityTwo.addComponent(TestComponentTwo);

      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(
        entityOne,
        entityOne.get(TestComponentOne)
      );
      manager.onEntityComponentAdded(
        entityTwo,
        entityTwo.get(TestComponentTwo)
      );

      query = manager.getQuery(description);

      manager.update();

      expect(query.all.size).toBe(1);
      expect(query.all).toContain(entityOne);
      expect(query.all).not.toContain(entityTwo);
    });
  });

  describe('onEntityComponentRemoved', () => {
    it('should remove entities from a query if an entity no longer matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity();
      entityOne.space = mockSpace;

      entityOne.addComponent(TestComponentOne);

      const entityTwo = new Entity();
      entityTwo.space = mockSpace;

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(
        entityOne,
        entityOne.get(TestComponentOne)
      );
      manager.onEntityComponentAdded(
        entityTwo,
        entityTwo.get(TestComponentOne)
      );
      manager.onEntityComponentAdded(
        entityTwo,
        entityTwo.get(TestComponentTwo)
      );

      expect(query.all.size).toBe(0);

      manager.update();

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      const entityOneComponentOne = entityOne.get(TestComponentOne);
      entityOne.removeComponent(entityOneComponentOne);

      const entityTwoComponentTwo = entityTwo.get(TestComponentTwo);
      entityTwo.removeComponent(entityTwoComponentTwo);

      manager.onEntityComponentRemoved(entityOne, entityOneComponentOne);
      manager.onEntityComponentRemoved(entityTwo, entityTwoComponentTwo);

      manager.update();

      query = manager.getQuery(description);

      expect(query.all.size).toBe(1);
      expect(query.all).not.toContain(entityOne);
      expect(query.all).toContain(entityTwo);
    });
  });

  describe('onEntityRemoved', () => {
    it('should remove the entity from all queries', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const entityOne = new Entity();
      entityOne.space = mockSpace;

      entityOne.addComponent(TestComponentOne);

      const entityTwo = new Entity();
      entityTwo.space = mockSpace;

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      let query = manager.getQuery(description);

      expect(manager.queries.size).toBe(1);

      manager.onEntityComponentAdded(
        entityOne,
        entityOne.get(TestComponentOne)
      );
      manager.onEntityComponentAdded(
        entityTwo,
        entityTwo.get(TestComponentOne)
      );
      manager.onEntityComponentAdded(
        entityTwo,
        entityTwo.get(TestComponentTwo)
      );

      expect(query.all.size).toBe(0);

      manager.update();

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      manager.onEntityRemoved(entityOne);

      manager.update();

      query = manager.getQuery(description);

      expect(query.all.size).toBe(1);
      expect(query.all).not.toContain(entityOne);
      expect(query.all).toContain(entityTwo);
    });
  });
});
