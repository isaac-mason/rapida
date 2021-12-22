/* eslint-disable max-classes-per-file */
import { describe, expect, it } from '@jest/globals';
import { Component } from './component';
import { System } from './system';

describe('RECS System', () => {
  it('can be constructed', () => {
    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}
    class TestSystem extends System {
      queries = {
        exampleQuery: {
          all: [TestComponentOne, TestComponentTwo],
        },
      };
    }

    const testSystem = new TestSystem();

    expect(testSystem.queries).toEqual({
      exampleQuery: {
        all: [TestComponentOne, TestComponentTwo],
      },
    });
  });
});
