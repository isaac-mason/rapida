/* eslint-disable max-classes-per-file */
import { describe, it, expect } from '@jest/globals';
import { recs, RECS } from '../src';

describe('Spaces', () => {
  let R: RECS;

  beforeEach(() => {
    R = recs();
  });

  it('should be able to register event handlers and emit events', () => {
    const space = R.create.space();

    R.init();

    const mockFn = jest.fn();

    const subscription = space.on('event-name', () => mockFn());

    expect(mockFn).toBeCalledTimes(0);

    space.emit({
      topic: 'event-name',
    });

    R.update(1);

    expect(mockFn).toBeCalledTimes(1);

    subscription.unsubscribe();

    space.emit({
      topic: 'event-name',
    });

    R.update(1);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should initialise entities and add the entity event system tick method to the entity update pool', () => {
    const space = R.create.space();

    R.init();

    space.create.entity();

    expect(R._entitiesToUpdate.size).toBe(1);
  });

  it('should should remove dead entities on update', () => {
    const space = R.create.space();

    const entity = space.create.entity();

    R.init();

    R.update(1);

    expect(space.entities.size).toBe(1);

    entity.destroy();

    R.update(1);

    expect(space.entities.size).toBe(0);
  });

  it('should destroy contained entities when destroying the space', () => {
    const space = R.create.space();
    expect(space.recs).toBe(R);

    const entity = space.create.entity();
    expect(R.spaces.size).toBe(1);
    expect(entity.space).toBe(space);

    space.destroy();

    expect(entity.alive).toBeFalsy();
    expect(R.spaces.size).toBe(0);
  });
});
