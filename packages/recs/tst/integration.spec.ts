/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { recs, Component, RECS, System } from '../src';

describe('RECS Integration Tests', () => {
  let R: RECS;

  beforeEach(() => {
    R = recs();
  });

  it('recs should be able to create a new space and add entities, then destroy the space', () => {
    const space = R.create.space();
    expect(space.recs).toBe(R);

    const entity = space.create.entity();
    expect(R.spaces.size).toBe(1);
    expect(entity.space).toBe(space);

    space.destroy();

    expect(entity.alive).toBeFalsy();
    expect(R.spaces.size).toBe(0);
  });

  it('components can be added and removed from entities', () => {
    const space = R.create.space();
    const entity = space.create.entity();

    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}

    entity.addComponent(TestComponentOne);

    const testComponentTwo = new TestComponentTwo();
    entity.addComponent(testComponentTwo);

    expect(entity.has(TestComponentOne)).toBeTruthy();
    expect(entity.has(TestComponentOne.name)).toBeTruthy();

    expect(entity.has(TestComponentTwo)).toBeTruthy();
    expect(entity.has(TestComponentTwo.name)).toBeTruthy();
    expect(entity.has(testComponentTwo)).toBeTruthy();

    entity.removeComponent(TestComponentOne);
    entity.removeComponent(testComponentTwo);

    expect(entity.has(TestComponentOne)).toBeFalsy();
    expect(entity.has(TestComponentTwo)).toBeFalsy();
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
    const system = R.add.system(new TestSystem());

    const space = R.create.space();

    const entity = space.create.entity();

    entity.addComponent(TestComponentOne).addComponent(TestComponentTwo);

    expect(system.results.testQueryName.entities.size).toBe(1);

    entity.removeComponent(TestComponentOne);

    expect(system.results.testQueryName.entities.size).toBe(0);
  });

  it('recs will call component and system init, update, and destroy methods', () => {
    const componentInitJestFn = jest.fn();
    const componentUpdateJestFn = jest.fn();
    const componentDestroyJestFn = jest.fn();
    class TestComponentOne extends Component {
      onInit = componentInitJestFn;

      onUpdate = componentUpdateJestFn;

      onDestroy = componentDestroyJestFn;
    }

    const systemInitJestFn = jest.fn();
    const systemUpdateJestFn = jest.fn();
    const systemDestroyJestFn = jest.fn();
    class TestSystem extends System {
      onInit = systemInitJestFn;

      onUpdate = systemUpdateJestFn;

      onDestroy = systemDestroyJestFn;
    }
    R.add.system(new TestSystem());

    const space = R.create.space();

    const entity = space.create.entity();

    entity.addComponent(TestComponentOne);

    R.init();

    expect(R.initialised).toBe(true);
    expect(componentInitJestFn).toHaveBeenCalledTimes(1);
    expect(systemInitJestFn).toHaveBeenCalledTimes(1);

    const timeElapsed = 1001;
    R.update(timeElapsed);

    expect(componentUpdateJestFn).toHaveBeenCalledTimes(1);
    expect(systemUpdateJestFn).toHaveBeenCalledTimes(1);

    expect(componentUpdateJestFn.mock.calls[0][0]).toBe(timeElapsed);
    expect(systemUpdateJestFn.mock.calls[0][0]).toBe(timeElapsed);

    R.destroy();

    expect(componentDestroyJestFn).toHaveBeenCalledTimes(1);
    expect(systemDestroyJestFn).toHaveBeenCalledTimes(1);
  });
});
