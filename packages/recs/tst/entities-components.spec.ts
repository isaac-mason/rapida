/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { recs, Component, RECS } from '../src';

describe('Entities And Components Integration Tests', () => {
  let R: RECS;

  beforeEach(() => {
    R = recs();
  });

  it('entities should be able to register event handlers and emit events', () => {
    const entity = R.create.space().create.entity();

    const mockFn = jest.fn();

    R.init();

    const subscription = entity.on('event-name', () => mockFn());

    expect(mockFn).toBeCalledTimes(0);

    entity.emit({
      topic: 'event-name',
    });

    R.update(1);

    expect(mockFn).toBeCalledTimes(1);

    subscription.unsubscribe();

    entity.emit({
      topic: 'event-name',
    });

    R.update(1);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('components can be added and removed from entities', () => {
    const space = R.create.space();
    const entity = space.create.entity();

    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}

    entity.addComponent(TestComponentOne);

    expect(entity.has(TestComponentOne)).toBeTruthy();
    expect(entity.has(TestComponentOne.name)).toBeTruthy();
    expect(entity.has(TestComponentTwo)).toBeFalsy();

    entity.removeComponent(TestComponentOne);

    expect(entity.has(TestComponentOne)).toBeFalsy();
    expect(entity.has(TestComponentTwo)).toBeFalsy();
  });

  it('components can be added with parameters', () => {
    const space = R.create.space();
    const entity = space.create.entity();

    class TestComponentWithConstructParams extends Component {
      position!: { x: number; y: number };

      construct = (x: number, y: number): void => {
        this.position = { x, y };
      };
    }

    entity.addComponent(TestComponentWithConstructParams, 1, 2);

    expect(entity.has(TestComponentWithConstructParams)).toBeTruthy();
    expect(entity.has(TestComponentWithConstructParams.name)).toBeTruthy();

    const component = entity.get(TestComponentWithConstructParams);
    expect(component.position.x).toBe(1);
    expect(component.position.y).toBe(2);

    entity.removeComponent(TestComponentWithConstructParams);

    expect(entity.has(TestComponentWithConstructParams)).toBeFalsy();
    expect(entity.has(TestComponentWithConstructParams.name)).toBeFalsy();
  });

  it('on re-adding a component to an entity, it will be newly constructed properly', () => {
    const space = R.create.space();
    const entity = space.create.entity();

    class TestComponentWithConstructParams extends Component {
      position!: { x: number; y: number };

      construct = (x: number, y: number): void => {
        this.position = { x, y };
      };
    }

    entity.addComponent(TestComponentWithConstructParams, 1, 2);

    expect(entity.has(TestComponentWithConstructParams)).toBeTruthy();
    expect(entity.has(TestComponentWithConstructParams.name)).toBeTruthy();

    const componentOne = entity.get(TestComponentWithConstructParams);
    expect(componentOne.position.x).toBe(1);
    expect(componentOne.position.y).toBe(2);

    entity.removeComponent(TestComponentWithConstructParams);

    expect(entity.has(TestComponentWithConstructParams)).toBeFalsy();
    expect(entity.has(TestComponentWithConstructParams.name)).toBeFalsy();

    entity.addComponent(TestComponentWithConstructParams, 3, 4);
    const componentTwo = entity.get(TestComponentWithConstructParams);
    expect(componentTwo.position.x).toBe(3);
    expect(componentTwo.position.y).toBe(4);
  });

  it('recs will call component onInit, onUpdate, and onDestroy methods', () => {
    const componentInitJestFn = jest.fn();
    const componentUpdateJestFn = jest.fn();
    const componentDestroyJestFn = jest.fn();

    class TestComponentOne extends Component {
      onInit = componentInitJestFn;

      onUpdate = componentUpdateJestFn;

      onDestroy = componentDestroyJestFn;
    }

    const space = R.create.space();

    const entity = space.create.entity();

    entity.addComponent(TestComponentOne);

    R.init();

    expect(R.initialised).toBe(true);
    expect(componentInitJestFn).toHaveBeenCalledTimes(1);

    const timeElapsed = 1001;
    R.update(timeElapsed);

    expect(componentUpdateJestFn).toHaveBeenCalledTimes(1);

    expect(componentUpdateJestFn.mock.calls[0][0]).toBe(timeElapsed);

    R.destroy();

    expect(componentDestroyJestFn).toHaveBeenCalledTimes(1);
  });
});
