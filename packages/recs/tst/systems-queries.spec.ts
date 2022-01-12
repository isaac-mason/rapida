/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { recs, Component, RECS, System, QueryDescription } from '../src';

describe('Systems and Queries Integration Tests', () => {
  let R: RECS;

  beforeEach(() => {
    R = recs();
  });

  it('systems can contain queries for components', () => {
    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}

    class TestSystem extends System {
      queries = {
        testQueryName: {
          all: [TestComponentOne, TestComponentTwo],
        },
      };
    }

    R.init();

    const system = R.add.system(new TestSystem());

    const space = R.create.space();

    const entity = space.create.entity();

    entity.addComponent(TestComponentOne);
    entity.addComponent(TestComponentTwo);

    expect(system.results.testQueryName.all.size).toBe(0);
    expect(system.results.testQueryName.added.size).toBe(0);
    expect(system.results.testQueryName.removed.size).toBe(0);

    R.update(1);

    expect(system.results.testQueryName.added.size).toBe(1);
    expect(system.results.testQueryName.removed.size).toBe(0);
    expect(system.results.testQueryName.all.size).toBe(1);

    entity.removeComponent(TestComponentOne);

    expect(system.results.testQueryName.all.size).toBe(1);
    expect(system.results.testQueryName.removed.size).toBe(0);
    expect(system.results.testQueryName.all.size).toBe(1);

    R.update(1);

    expect(system.results.testQueryName.all.size).toBe(0);
    expect(system.results.testQueryName.removed.size).toBe(1);
    expect(system.results.testQueryName.all.size).toBe(0);
  });

  it('recs will call system onInit, onUpdate, and onDestroy methods', () => {
    const systemInitJestFn = jest.fn();
    const systemUpdateJestFn = jest.fn();
    const systemDestroyJestFn = jest.fn();
    class TestSystem extends System {
      onInit = systemInitJestFn;

      onUpdate = systemUpdateJestFn;

      onDestroy = systemDestroyJestFn;
    }
    R.add.system(new TestSystem());

    R.init();

    expect(R.initialised).toBe(true);
    expect(systemInitJestFn).toHaveBeenCalledTimes(1);

    const timeElapsed = 1001;
    R.update(timeElapsed);

    expect(systemUpdateJestFn).toHaveBeenCalledTimes(1);

    expect(systemUpdateJestFn.mock.calls[0][0]).toBe(timeElapsed);

    R.destroy();

    expect(systemDestroyJestFn).toHaveBeenCalledTimes(1);
  });

  it('systems can be removed, and queries will be removed if they are no longer used by systems', () => {
    class TestComponentOne extends Component {}
    class TestSystemOne extends System {
      queries = {
        example: {
          all: [TestComponentOne],
        },
      };
    }

    class TestSystemTwo extends System {
      queries = {
        example: {
          all: [TestComponentOne],
        },
      };
    }

    const systemOne = new TestSystemOne();
    R.add.system(systemOne);

    const systemTwo = new TestSystemTwo();
    R.add.system(systemTwo);

    R.init();

    expect(
      R.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(true);

    systemOne.destroy();

    expect(
      R.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(true);

    systemTwo.destroy();

    expect(
      R.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(false);
  });

  describe('getQuery', () => {
    class TestComponent extends Component {}

    it('should create a query if it has not been created', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      R.init();

      const query = R.queryManager.getQuery(description);

      expect(query).toBeTruthy();
    });

    it('should populate a new query with existing entities', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const space = R.create.space();
      const entity = space.create.entity();
      entity.addComponent(TestComponent);

      R.init();

      const query = R.queryManager.getQuery(description);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entity)).toBeTruthy();
    });

    it('should get the existing query if it has already been created', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      R.init();

      const queryOne = R.queryManager.getQuery(description);

      const queryTwo = R.queryManager.getQuery(description);

      expect(queryOne).toBeTruthy();
      expect(queryTwo).toBeTruthy();

      expect(queryOne).toEqual(queryTwo);
    });
  });

  describe('onEntityComponentAdded', () => {
    class TestComponentOne extends Component {}

    class TestComponentTwo extends Component {}

    it('should add entities to a query if the entity matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      R.init();

      let query = R.queryManager.getQuery(description);

      expect(R.queryManager.queries.size).toBe(1);

      const space = R.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentTwo);

      query = R.queryManager.getQuery(description);

      R.update(0.1);

      expect(query.all.size).toBe(1);
      expect(query.all).toContain(entityOne);
      expect(query.all).not.toContain(entityTwo);
    });
  });

  describe('onEntityComponentRemoved', () => {
    class TestComponentOne extends Component {}

    class TestComponentTwo extends Component {}

    it('should remove entities from a query if an entity no longer matches the query', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      R.init();

      let query = R.queryManager.getQuery(description);
      expect(R.queryManager.queries.size).toBe(1);
      expect(query.all.size).toBe(0);

      const space = R.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      R.update(0.1);

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      const entityOneComponentOne = entityOne.get(TestComponentOne);
      entityOne.removeComponent(entityOneComponentOne);

      const entityTwoComponentTwo = entityTwo.get(TestComponentTwo);
      entityTwo.removeComponent(entityTwoComponentTwo);

      R.update(0.1);

      query = R.queryManager.getQuery(description);

      expect(query.all.size).toBe(1);
      expect(query.all).not.toContain(entityOne);
      expect(query.all).toContain(entityTwo);
    });
  });

  describe('onEntityRemoved', () => {
    class TestComponentOne extends Component {}

    class TestComponentTwo extends Component {}

    it('should remove the entity from all queries', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      R.init();

      let query = R.queryManager.getQuery(description);

      expect(R.queryManager.queries.size).toBe(1);

      expect(query.all.size).toBe(0);

      const space = R.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      R.update(0.1);

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      entityOne.destroy();

      R.update(0.1);

      query = R.queryManager.getQuery(description);

      expect(query.all.size).toBe(1);
      expect(query.all).not.toContain(entityOne);
      expect(query.all).toContain(entityTwo);
    });
  });
});
