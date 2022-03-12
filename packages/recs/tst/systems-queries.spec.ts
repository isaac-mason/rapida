/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { Component, World, System, QueryDescription } from '../src';

class TestComponentOne extends Component {}
class TestComponentTwo extends Component {}
class TestComponentThree extends Component {}
class TestComponentFour extends Component {}
class TestComponentFive extends Component {}
class TestComponentSix extends Component {}

describe('Systems and Queries Integration Tests', () => {
  let world: World;

  beforeEach(() => {
    world = new World();
    world.init();
  });

  describe('Systems', () => {
    it('systems can contain queries for components', () => {
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

    it('systems can be removed, and queries will be removed if they are no longer used by any systems', () => {
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

    it('systems can be removed, and queries will not be removed if they are used standalone outside of systems', () => {
      const description = {
        all: [TestComponentOne],
      };

      //
      class TestSystemOne extends System {
        queries = { example: description };
      }
      class TestSystemTwo extends System {
        queries = { example: description };
      }

      // use the query outside of a system
      const query = world.query(description);

      const systemOne = new TestSystemOne();
      world.addSystem(systemOne);

      const systemTwo = new TestSystemTwo();
      world.addSystem(systemTwo);

      // assert the query exists
      expect(
        world.queryManager.hasQuery({
          all: [TestComponentOne],
        })
      ).toBe(true);

      // destroy both systems using the query
      systemOne.destroy();
      systemTwo.destroy();

      expect(
        world.queryManager.hasQuery({
          all: [TestComponentOne],
        })
      ).toBe(true);

      // remove the query manually
      world.remove(query);

      expect(
        world.queryManager.hasQuery({
          all: [TestComponentOne],
        })
      ).toBe(false);
    });
  });

  describe('Query Creation', () => {
    it('on creating a new query, it should be populated with existing entities', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const space = world.create.space();
      const entity = space.create.entity();
      entity.addComponent(TestComponentOne);

      const query = world.query(description);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entity)).toBeTruthy();
    });

    it('should reuse existing queries', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const queryOne = world.query(description);

      const queryTwo = world.query(description);

      expect(queryOne).toBeTruthy();
      expect(queryTwo).toBeTruthy();

      expect(queryOne).toEqual(queryTwo);
    });

    it('should be able to remove a query from a world and stop updating it', () => {
      const description: QueryDescription = {
        all: [TestComponentOne],
      };

      const space = world.create.space();

      const query = world.query(description);

      const entityOne = space.create.entity();
      entityOne.addComponent(TestComponentOne);

      world.update(1);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entityOne)).toBeTruthy();

      world.remove(query);

      const entityTwo = space.create.entity();
      entityTwo.addComponent(TestComponentOne);

      world.update(1);

      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(query.all.has(entityOne)).toBeTruthy();
      expect(query.all.has(entityTwo)).toBeFalsy();
    });
  });

  describe('Once-off Queries', () => {
    class TestComponent extends Component {}

    it('should by default generate new query results, even if the same query already exists', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const space = world.create.space();

      const entityOne = space.create.entity();
      entityOne.addComponent(TestComponent);

      const query = world.query(description);

      world.update();

      const entityTwo = space.create.entity();
      entityTwo.addComponent(TestComponent);

      const onceOffQueryResults = world.queryOnce(description);

      // persisted query should not have updated yet
      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(onceOffQueryResults.has(entityOne)).toBeTruthy();

      // once of query results should have done a fresh query and have both entities
      expect(onceOffQueryResults).toBeTruthy();
      expect(onceOffQueryResults.size).toBe(2);
      expect(onceOffQueryResults.has(entityOne)).toBeTruthy();
      expect(onceOffQueryResults.has(entityTwo)).toBeTruthy();
    });

    it('should reuse query results if "useExisting" option is true', () => {
      const description: QueryDescription = {
        all: [TestComponent],
      };

      const space = world.create.space();

      const entityOne = space.create.entity();
      entityOne.addComponent(TestComponent);

      const query = world.query(description);

      world.update();

      const entityTwo = space.create.entity();
      entityTwo.addComponent(TestComponent);

      const onceOffQueryResults = world.queryOnce(description, {
        useExisting: true,
      });

      // persisted query should not have updated yet
      expect(query).toBeTruthy();
      expect(query.all.size).toBe(1);
      expect(onceOffQueryResults.has(entityOne)).toBeTruthy();

      // reused query results should not have updated yet
      expect(onceOffQueryResults).toBeTruthy();
      expect(onceOffQueryResults.size).toBe(1);
      expect(onceOffQueryResults.has(entityOne)).toBeTruthy();
    });
  });

  describe('onEntityComponentAdded', () => {
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

  describe('On Entity Component Changes', () => {
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

  describe('Entity Removal', () => {
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

  describe('Query Matching', () => {
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
