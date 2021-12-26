import { Component } from './component';
import { Entity } from './entity';

/**
 * Type for a component constructor
 */
type ComponentConstructor = new (...args: never[]) => Component;

/**
 * Enum for query condition types
 */
export enum QueryConditionType {
  ALL = 'all',
  ONE = 'one',
  NOT = 'not',
}

/**
 * Type for query conditions
 */
export type QueryDescription = {
  [QueryConditionType.ALL]?: ComponentConstructor[];
  [QueryConditionType.ONE]?: ComponentConstructor[];
  [QueryConditionType.NOT]?: ComponentConstructor[];
};

/**
 * Query for entities with given components
 *
 * Queries can contain a minimum of one and a maximum of three conditions, the `all`, `one`, and `not` QueryConditionType conditions.
 */
export class Query {
  /**
   * The query dedupe string
   */
  key: string;

  /**
   * The current entities matched by the query
   */
  all: Set<Entity> = new Set();

  /**
   * Entities added to the query on the latest update
   */
  added: Set<Entity> = new Set();

  /**
   * Entities removed from the query on the latest update
   */
  removed: Set<Entity> = new Set();

  /**
   * A list of all component names that are involved in the conditions for this query
   */
  componentNames: string[];

  /**
   * The query description for this query
   */
  description: QueryDescription;

  /**
   * Constructor for a new query instance
   * @param queryDescription the query description
   */
  constructor(queryDescription: QueryDescription) {
    if (
      !queryDescription.all &&
      !queryDescription.one &&
      !queryDescription.not
    ) {
      throw new Error('Query must have at least one condition');
    }

    this.key = Query.getDescriptionDedupeString(queryDescription);
    this.description = queryDescription;
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
  _addEntity(e: Entity): void {
    this.all.add(e);
    this.added.add(e);
  }

  /**
   * Removes an entity from the query
   * @param e the entity to remove
   */
  _removeEntity(e: Entity): void {
    this.all.delete(e);
    this.removed.add(e);
  }

  /**
   * Prepares the query for the next update
   */
  _preUpdate(): void {
    this.added.clear();
    this.removed.clear();
  }

  /**
   * Returns whether an entity matches the conditions of the query description
   * @param e the entity to check
   * @returns whether an entity matches the conditions of the query description
   */
  _match(e: Entity): boolean {
    if (this.description.not && this.description.not.some((c) => e.has(c))) {
      return false;
    }

    if (this.description.all && this.description.all.some((c) => !e.has(c))) {
      return false;
    }
    if (this.description.one && this.description.one.every((c) => !e.has(c))) {
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
