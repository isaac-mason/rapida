/* eslint-disable max-classes-per-file */
import { describe, expect, it } from '@jest/globals';
import { Component, System } from '.';

describe('System', () => {
  it('can be constructed', () => {
    class TestComponentOne extends Component {}
    class TestComponentTwo extends Component {}
    class TestSystem extends System {
      constructor() {
        super({
          queries: {
            exampleQuery: {
              all: [TestComponentOne, TestComponentTwo],
            },
          },
        });
      }
    }

    const testSystem = new TestSystem();

    expect(testSystem.queryDescriptions).toEqual({
      exampleQuery: {
        all: [TestComponentOne, TestComponentTwo],
      },
    });
  });
});
