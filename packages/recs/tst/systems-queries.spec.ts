/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { recs, Component, RECS, System } from '../src';

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

  it('systems can be removed', () => {
    class TestComponentOne extends Component {}
    class TestSystem extends System {
      queries = {
        example: {
          all: [TestComponentOne],
        },
      };
    }
    const system = new TestSystem();
    R.add.system(system);

    R.init();

    expect(
      R.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(true);

    system.destroy();

    expect(
      R.queryManager.hasQuery({
        all: [TestComponentOne],
      })
    ).toBe(false);
  });
});
