/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { Component, World, System, QueryDescription } from '../src';

describe('Systems and Queries Integration Tests', () => {
  let world: World;

  beforeEach(() => {
    world = new World();
    world.init();
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

    const system = world.addSystem(new TestSystem());

    const space = world.create.space();

    const entity = space.create.entity();

    entity.addComponent(TestComponentOne);
    entity.addComponent(TestComponentTwo);

    expect(system.results.testQueryName.all.size).toBe(0);
    expect(system.results.testQueryName.added.size).toBe(0);
    expect(system.results.testQueryName.removed.size).toBe(0);

    world.update(1);

    expect(system.results.testQueryName.added.size).toBe(1);
    expect(system.results.testQueryName.removed.size).toBe(0);
    expect(system.results.testQueryName.all.size).toBe(1);

    entity.removeComponent(TestComponentOne);

    expect(system.results.testQueryName.all.size).toBe(1);
    expect(system.results.testQueryName.removed.size).toBe(0);
    expect(system.results.testQueryName.all.size).toBe(1);

    world.update(1);

    expect(system.results.testQueryName.all.size).toBe(0);
    expect(system.results.testQueryName.removed.size).toBe(1);
    expect(system.results.testQueryName.all.size).toBe(0);
  });

  it('recs will call system onInit, onUpdate, and onDestroy methods', () => {
    const systemInitJestFn = jest.fn();
    const systemUpdateJestFn = jest.fn();
    const systemDestroyJestFn = jest.fn();
    class TestSystem extends System {
      onDestroy(): void {
        systemDestroyJestFn();
      }

      onInit(): void {
        systemInitJestFn();
      }

      onUpdate(timeElapsed: number): void {
        systemUpdateJestFn(timeElapsed);
      }
    }
    world.addSystem(new TestSystem());

    expect(world.initialised).toBe(true);
    expect(systemInitJestFn).toHaveBeenCalledTimes(1);

    const timeElapsed = 1001;
    world.update(timeElapsed);

    expect(systemUpdateJestFn).toHaveBeenCalledTimes(1);

    expect(systemUpdateJestFn.mock.calls[0][0]).toBe(timeElapsed);

    world.destroy();

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
    world.addSystem(systemOne);

    const systemTwo = new TestSystemTwo();
    world.addSystem(systemTwo);

    expect(
      world.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(true);

    systemOne.destroy();

    expect(
      world.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(true);

    systemTwo.destroy();

    expect(
      world.queryManager.hasQuery({
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

      const query = world.queryManager.getQuery(description);

      expect(query).toBeTruthy();
    });

    it('should populate a new query with existing entities', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const space = world.create.space();
      const entity = space.create.entity();
      entity.addComponent(TestComponent);

      const query = world.queryManager.getQuery(description);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entity)).toBeTruthy();
    });

    it('should get the existing query if it has already been created', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const queryOne = world.queryManager.getQuery(description);

      const queryTwo = world.queryManager.getQuery(description);

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

      let query = world.queryManager.getQuery(description);

      expect(world.queryManager.queries.size).toBe(1);

      const space = world.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentTwo);

      query = world.queryManager.getQuery(description);

      world.update(1);

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

      let query = world.queryManager.getQuery(description);
      expect(world.queryManager.queries.size).toBe(1);
      expect(query.all.size).toBe(0);

      const space = world.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      world.update(1);

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      const entityOneComponentOne = entityOne.get(TestComponentOne);
      entityOne.removeComponent(entityOneComponentOne);

      const entityTwoComponentTwo = entityTwo.get(TestComponentTwo);
      entityTwo.removeComponent(entityTwoComponentTwo);

      world.update(1);

      query = world.queryManager.getQuery(description);

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

      let query = world.queryManager.getQuery(description);

      expect(world.queryManager.queries.size).toBe(1);

      expect(query.all.size).toBe(0);

      const space = world.create.space();

      const entityOne = space.create.entity();

      entityOne.addComponent(TestComponentOne);

      const entityTwo = space.create.entity();

      entityTwo.addComponent(TestComponentOne);
      entityTwo.addComponent(TestComponentTwo);

      world.update(1);

      expect(query.all.size).toBe(2);
      expect(query.all).toContain(entityOne);
      expect(query.all).toContain(entityTwo);

      entityOne.destroy();

      world.update(1);

      query = world.queryManager.getQuery(description);

      expect(query.all.size).toBe(1);
      expect(query.all).not.toContain(entityOne);
      expect(query.all).toContain(entityTwo);
    });
  });

  describe('Advanced Query Tests', () => {
    class TestComponentOne extends Component {}

    class TestComponentTwo extends Component {}

    class TestComponentThree extends Component {}

    class TestComponentFour extends Component {}

    class TestComponentFive extends Component {}

    class TestComponentSix extends Component {}

    it('updates system query results if an entity matches a query with the ONE condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            one: [TestComponentOne, TestComponentTwo],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);

      world.update(1);

      expect(system.results.test.added.size).toBe(1);
      expect(system.results.test.all.size).toBe(1);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeTruthy();
      expect(system.results.test.added.has(entity)).toBeTruthy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });

    it('does not update system query results an entity does not match a query with the ONE condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            one: [TestComponentOne, TestComponentTwo],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);

      world.update(1);

      expect(system.results.test.added.size).toBe(1);
      expect(system.results.test.all.size).toBe(1);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeTruthy();
      expect(system.results.test.added.has(entity)).toBeTruthy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();

      entity.removeComponent(TestComponentOne);

      world.update(1);

      expect(system.results.test.added.size).toBe(0);
      expect(system.results.test.all.size).toBe(0);
      expect(system.results.test.removed.size).toBe(1);

      expect(system.results.test.all.has(entity)).toBeFalsy();
      expect(system.results.test.added.has(entity)).toBeFalsy();
      expect(system.results.test.removed.has(entity)).toBeTruthy();
    });

    it('updates system query results if an entity matches a query with the NOT condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            not: [TestComponentOne],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentTwo);

      world.update(1);

      expect(system.results.test.added.size).toBe(1);
      expect(system.results.test.all.size).toBe(1);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeTruthy();
      expect(system.results.test.added.has(entity)).toBeTruthy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });

    it('does not update system query results if an entity does not match a query with the NOT condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            not: [TestComponentOne],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);

      world.update(1);

      expect(system.results.test.added.size).toBe(0);
      expect(system.results.test.all.size).toBe(0);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeFalsy();
      expect(system.results.test.added.has(entity)).toBeFalsy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });

    it('updates system query results if an entity matches a query with the ALL condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            all: [TestComponentOne, TestComponentTwo, TestComponentThree],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);
      entity.addComponent(TestComponentTwo);
      entity.addComponent(TestComponentThree);

      world.update(1);

      expect(system.results.test.added.size).toBe(1);
      expect(system.results.test.all.size).toBe(1);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeTruthy();
      expect(system.results.test.added.has(entity)).toBeTruthy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });

    it('does not update system query results if an entity does not match a query with the ALL condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            all: [TestComponentOne, TestComponentTwo, TestComponentThree],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);
      entity.addComponent(TestComponentTwo);
      entity.addComponent(TestComponentFour);

      world.update(1);

      expect(system.results.test.added.size).toBe(0);
      expect(system.results.test.all.size).toBe(0);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeFalsy();
      expect(system.results.test.added.has(entity)).toBeFalsy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });

    it('updates system query results if an entity matches a query with multiple condition', () => {
      class TestSystem extends System {
        queries = {
          test: {
            all: [TestComponentOne, TestComponentTwo],
            one: [TestComponentThree, TestComponentFour],
            not: [TestComponentFive, TestComponentSix],
          },
        };
      }

      const system = world.addSystem(new TestSystem());

      const space = world.create.space();

      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);
      entity.addComponent(TestComponentTwo);
      entity.addComponent(TestComponentFour);

      world.update(1);

      expect(system.results.test.added.size).toBe(1);
      expect(system.results.test.all.size).toBe(1);
      expect(system.results.test.removed.size).toBe(0);

      expect(system.results.test.all.has(entity)).toBeTruthy();
      expect(system.results.test.added.has(entity)).toBeTruthy();
      expect(system.results.test.removed.has(entity)).toBeFalsy();
    });
  });
});
