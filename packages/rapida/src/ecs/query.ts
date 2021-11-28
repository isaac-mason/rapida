import { Entity } from 'src';
import { Component } from './component';

type ComponentConstructor = new (...args: never[]) => Component;

enum QueryConditionType {
  ALL = 'all',
  ONE = 'one',
  NOT = 'not',
}

type QueryDescription = {
  [QueryConditionType.ALL]?: ComponentConstructor[];
  [QueryConditionType.ONE]?: ComponentConstructor[];
  [QueryConditionType.NOT]?: ComponentConstructor[];
};

/**
 * Query for entities with given components
 *
 * Queries can contain a minimum of one and a maximum of three conditions, the `all`, `one`, and `not` QueryConditionType conditions.
 */
class Query {
  /**
   * The query dedupe string
   */
  key: string;

  /**
   * The current entities matched by the query
   */
  entities: Set<Entity> = new Set();

  /**
   * A list of all component names that are involved in the conditions for this query
   */
  componentNames: string[];

  /**
   * The query description for this query
   */
  queryDescription: QueryDescription;

  constructor(queryDescription: QueryDescription) {
    if (
      !queryDescription.all &&
      !queryDescription.one &&
      !queryDescription.not
    ) {
      throw new Error('Query must have at least one condition');
    }

    this.key = Query.getDescriptionDedupeString(queryDescription);
    this.queryDescription = queryDescription;
    this.componentNames = Array.from(
      new Set<string>(
        [
          ...(queryDescription.all ? queryDescription.all : []),
          ...(queryDescription.one ? queryDescription.one : []),
          ...(queryDescription.not ? queryDescription.not : []),
        ].map((c) => c.name)
      )
    );
  }

  /**
   * Adds an entity to the query
   * @param e the entity to add
   */
  addEntity(e: Entity): void {
    this.entities.add(e);
  }

  /**
   * Removes an entity from the query
   * @param e the entity to remove
   */
  removeEntity(e: Entity): void {
    this.entities.delete(e);
  }

  /**
   * Returns whether an entity matches the conditions of the query description
   * @param e the entity to check
   * @returns whether an entity matches the conditions of the query description
   */
  match(e: Entity): boolean {
    if (
      this.queryDescription.not &&
      this.queryDescription.not.some((c) => e.has(c))
    ) {
      return false;
    }

    if (
      this.queryDescription.all &&
      this.queryDescription.all.some((c) => !e.has(c))
    ) {
      return false;
    }
    if (
      this.queryDescription.one &&
      this.queryDescription.one.every((c) => !e.has(c))
    ) {
      return false;
    }

    return true;
  }

  /**
   * Returns a string that identifies a query description
   * @param query the query description
   * @returns a string that identifies a query description
   */
  public static getDescriptionDedupeString(query: QueryDescription): string {
    return Object.entries(query)
      .flatMap(([type, components]) => {
        if (type === QueryConditionType.ALL) {
          return components.map((c) => `${type}:${c.constructor.name}`).sort();
        }

        return [`${type}:${components.sort().map((c) => c.constructor.name)}`];
      })
      .sort()
      .join('-');
  }
}

export { Query, QueryDescription, QueryConditionType };
