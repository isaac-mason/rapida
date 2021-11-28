/* eslint-disable max-classes-per-file */
import { describe, it, expect, jest } from '@jest/globals';
import { fail } from 'assert';
import { Component, Entity, Query, Space } from '.';
import { QueryConditionType, QueryDescription } from './query';

jest.mock('./entity');

class TestComponentOne extends Component {}

class TestComponentTwo extends Component {}

class TestComponentThree extends Component {}

class TestComponentFour extends Component {}

class TestComponentFive extends Component {}

class TestComponentSix extends Component {}

describe('Query', () => {
  const mockSpace = {} as unknown as Space;

  it('should throw an error when constructing if there are no query conditions', () => {
    const queryDescription: QueryDescription = {};

    expect(() => new Query(queryDescription)).toThrowError();
  });

  it('can have entities added and removed from the query', () => {
    const entity = new Entity(mockSpace);

    const queryDescription: QueryDescription = {
      all: [TestComponentOne, TestComponentTwo],
    };

    const query = new Query(queryDescription);

    query.addEntity(entity);

    expect(query.entities.has(entity)).toBeTruthy();

    query.removeEntity(entity);

    expect(query.entities.has(entity)).toBeFalsy();
  });

  it('should store all components referenced in the query', () => {
    const entity = new Entity(mockSpace);

    const queryDescription: QueryDescription = {
      all: [TestComponentOne, TestComponentTwo],
    };

    const query = new Query(queryDescription);

    query.addEntity(entity);

    expect(query.componentNames).toHaveLength(2);
    expect(query.componentNames).toContain(TestComponentOne.name);
    expect(query.componentNames).toContain(TestComponentTwo.name);
  });

  describe('match', () => {
    it('should return true if an entity matches a query with the ONE condition', () => {
      const query = new Query({
        one: [TestComponentOne, TestComponentTwo],
      });

      const entity = {
        has: (c: { name: string }) => {
          return c.name === TestComponentOne.name;
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeTruthy();
    });

    it('should return false if an entity does not match a query with the ONE condition', () => {
      const query = new Query({
        one: [TestComponentOne, TestComponentTwo],
      });

      const entity = {
        has: (_c: { name: string }) => {
          return false;
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeFalsy();
    });

    it('should return true if an entity matches a query with the NOT condition', () => {
      const query = new Query({
        not: [TestComponentTwo],
      });

      const entity = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentTwo.name) {
            return false;
          }
          fail('unexpected call');
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeTruthy();
    });

    it('should return false if an entity does not match a query with the NOT condition', () => {
      const query = new Query({
        not: [TestComponentTwo],
      });

      const entity = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentTwo.name) {
            return true;
          }
          fail('unexpected call');
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeFalsy();
    });

    it('should return true if an entity matches a query with the ALL condition', () => {
      const query = new Query({
        all: [TestComponentOne, TestComponentTwo],
      });

      const entity = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentOne.name) {
            return true;
          }
          if (c.name === TestComponentTwo.name) {
            return true;
          }

          fail('unexpected call');
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeTruthy();
    });

    it('should return false if an entity does not match a query with the ALL condition', () => {
      const query = new Query({
        all: [TestComponentOne, TestComponentTwo],
      });

      const entityOne = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentOne.name) {
            return true;
          }
          if (c.name === TestComponentTwo.name) {
            return false;
          }

          fail('unexpected call');
        },
      } as unknown as Entity;

      const entityTwo = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentOne.name) {
            return false;
          }
          if (c.name === TestComponentTwo.name) {
            return true;
          }

          fail('unexpected call');
        },
      } as unknown as Entity;

      expect(query.match(entityOne)).toBeFalsy();
      expect(query.match(entityTwo)).toBeFalsy();
    });

    it('should return true if an entity matches a query with multiple conditions', () => {
      const query = new Query({
        all: [TestComponentOne, TestComponentTwo],
        one: [TestComponentThree, TestComponentFour],
        not: [TestComponentFive, TestComponentSix],
      });

      const entity = {
        // eslint-disable-next-line consistent-return
        has: (c: { name: string }) => {
          if (c.name === TestComponentOne.name) {
            return true;
          }
          if (c.name === TestComponentTwo.name) {
            return true;
          }
          if (c.name === TestComponentThree.name) {
            return true;
          }
          if (c.name === TestComponentFour.name) {
            return false;
          }
          if (c.name === TestComponentFive.name) {
            return false;
          }
          if (c.name === TestComponentSix.name) {
            return false;
          }

          fail('unexpected call');
        },
      } as unknown as Entity;

      expect(query.match(entity)).toBeTruthy();
    });
  });

  describe('getKey', () => {
    it('should return the same key for two matching query descriptions', () => {
      const queryOne: QueryDescription = {
        one: [TestComponentOne, TestComponentTwo],
        all: [TestComponentThree, TestComponentFour],
        not: [TestComponentFive, TestComponentSix],
      };

      const queryTwo: QueryDescription = {
        not: [TestComponentSix, TestComponentFive],
        all: [TestComponentFour, TestComponentThree],
        one: [TestComponentTwo, TestComponentOne],
      };

      expect(Query.getDescriptionDedupeString(queryOne)).toEqual(
        Query.getDescriptionDedupeString(queryTwo)
      );
    });

    it('should return a different key for two different query descriptions', () => {
      const differentComponentsOne: QueryDescription = {
        all: [TestComponentOne, TestComponentTwo],
      };

      const differentComponentsTwo: QueryDescription = {
        all: [TestComponentOne],
      };

      expect(
        Query.getDescriptionDedupeString(differentComponentsOne)
      ).not.toEqual(Query.getDescriptionDedupeString(differentComponentsTwo));

      const differentConditionOne: QueryDescription = {
        all: [TestComponentOne],
      };

      const differentConditionTwo: QueryDescription = {
        not: [TestComponentOne],
      };

      expect(
        Query.getDescriptionDedupeString(differentConditionOne)
      ).not.toEqual(Query.getDescriptionDedupeString(differentConditionTwo));

      const partiallyDifferentOne: QueryDescription = {
        all: [TestComponentOne],
      };

      const partiallyDifferentTwo: QueryDescription = {
        all: [TestComponentOne],
        not: [TestComponentTwo],
      };

      expect(
        Query.getDescriptionDedupeString(partiallyDifferentOne)
      ).not.toEqual(Query.getDescriptionDedupeString(partiallyDifferentTwo));
    });
  });
});
