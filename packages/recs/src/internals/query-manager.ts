import { Component } from '../component';
import { Entity } from '../entity';
import { Query, QueryDescription } from '../query';
import { World } from '../world';

enum QueryManagerEventType {
  ENTITY_COMPONENT_ADDED_EVENT = 'ENTITY_COMPONENT_ADDED_EVENT',
  ENTITY_COMPONENT_REMOVED_EVENT = 'ENTITY_COMPONENT_REMOVED_EVENT',
  ENTITY_REMOVED_EVENT = 'ENTITY_REMOVED_EVENT',
}

type EntityComponentAddedEvent = {
  component: Component;
  entity: Entity;
  type: QueryManagerEventType.ENTITY_COMPONENT_ADDED_EVENT;
};

type EntityComponentRemovedEvent = {
  component: Component;
  entity: Entity;
  type: QueryManagerEventType.ENTITY_COMPONENT_REMOVED_EVENT;
};

type EntityRemovedEvent = {
  entity: Entity;
  type: QueryManagerEventType.ENTITY_REMOVED_EVENT;
};

type QueryManagerEvent =
  | EntityComponentAddedEvent
  | EntityComponentRemovedEvent
  | EntityRemovedEvent;

type QueryActions = { add: Set<Entity>; remove: Set<Entity> };

/**
 * QueryManager is an internal class that manages Query class instances
 * @private internal class, do not use directly
 */
export class QueryManager {
  /**
   * A map of query dedupe strings to query instances
   */
  queries: Map<string, Query> = new Map();

  /**
   * A buffer of query manager events to process on the next update call
   */
  private eventsBuffer: QueryManagerEvent[] = [];

  /**
   * The World the query manager is in
   */
  private world: World;

  /**
   * Constructor for a QueryManager
   * @param world the World the QueryManager is in
   */
  constructor(world: World) {
    this.world = world;
  }

  /**
   * Retrieves a query by a query description
   * Adds a query to the query manager if one with the description does not already exist
   * If the query already exists, it is returned
   * @param queryDescription the query to add
   */
  getQuery(queryDescription: QueryDescription): Query {
    const dedupeString = Query.getDescriptionDedupeString(queryDescription);

    const existingQuery = this.queries.get(dedupeString);
    if (existingQuery) {
      return existingQuery;
    }

    const query = new Query(queryDescription);

    const matches = this.getQueryResults(query.description);
    for (const entity of matches.values()) {
      query.all.push(entity);
      query.added.push(entity);
    }

    this.queries.set(dedupeString, query);

    return query;
  }

  /**
   * Returns whether the query manager has the query
   * @param queryDescription the query description to check for
   */
  hasQuery(queryDescription: QueryDescription): boolean {
    const dedupeString = Query.getDescriptionDedupeString(queryDescription);
    return this.queries.has(dedupeString);
  }

  /**
   * Updates queries after a component has been added to an entity
   * @param entity the query
   * @param component the component added to the query
   */
  onEntityComponentAdded(entity: Entity, component: Component): void {
    this.eventsBuffer.push({
      type: QueryManagerEventType.ENTITY_COMPONENT_ADDED_EVENT,
      entity,
      component,
    });
  }

  /**
   * Updates queries after a component has been removed from an entity
   * @param entity the query
   * @param component the component added to the query
   */
  onEntityComponentRemoved(entity: Entity, component: Component): void {
    this.eventsBuffer.push({
      type: QueryManagerEventType.ENTITY_COMPONENT_REMOVED_EVENT,
      entity,
      component,
    });
  }

  /**
   * Updates queries after a query has been removed from the RECS
   * @param entity the query
   */
  onEntityRemoved(entity: Entity): void {
    this.eventsBuffer.push({
      type: QueryManagerEventType.ENTITY_REMOVED_EVENT,
      entity,
    });
  }

  /**
   * Executes a query and returns a set of the matching Entities
   *
   * If the query already exists in a system, the results are taken from the existing query.
   * If it does not exist, the query is executed once-off.
   *
   * @param queryDescription the query description
   */
  query(
    queryDescription: QueryDescription,
    options?: { useExisting: boolean }
  ): Entity[] {
    const key = Query.getDescriptionDedupeString(queryDescription);

    if (options?.useExisting) {
      const existingQuery = this.queries.get(key);
      if (existingQuery) {
        return existingQuery.all;
      }
    }

    return this.getQueryResults(queryDescription);
  }

  /**
   * Removes a query from the query manager
   * @param query the query to remove
   */
  removeQuery(query: Query): void {
    this.queries.delete(query.key);
  }

  /**
   * Updates queries with buffered entity and component events
   */
  update(): void {
    // clear the `added` and `removed` arrays for all queries in preparation for the next update
    for (const query of this.queries.values()) {
      query.added = [];
      query.removed = [];
    }

    for (const event of this.eventsBuffer.splice(0, this.eventsBuffer.length)) {
      if (event.type === QueryManagerEventType.ENTITY_REMOVED_EVENT) {
        for (const query of this.queries.values()) {
          // const index = query.all.findIndex((e) => e === event.entity);
          // if (index !== -1) {
          //   query.all.splice(index, 1);
          // }
          query.all = query.all.filter((e) => e !== event.entity);
          query.removed.push(event.entity);
        }
      } else {
        for (const query of this.queries.values()) {
          // if the event component is relevant to the query
          if (
            // if the only condition is a `not` condition, the query should check the component
            (!Array.isArray(query.description) &&
              query.description.one === undefined &&
              query.description.all === undefined &&
              query.description.not !== undefined) ||
            // if the component is mentioned in one of the queries conditions, the query should check the component
            query.components.includes(event.component.class)
          ) {
            const match = this.evaluateQuery(query.description, event.entity);
            const currentlyHasEntity = query.all.includes(event.entity);

            if (match && !currentlyHasEntity) {
              query.all.push(event.entity);
              query.added.push(event.entity);
            }
            if (!match && currentlyHasEntity) {
              // const index = query.all.findIndex((e) => e === event.entity);
              // if (index !== -1) {
              //   query.all.splice(index, 1);
              // }
              query.all = query.all.filter((e) => e !== event.entity);
              query.removed.push(event.entity);
            }
          }
        }
      }
    }
  }

  private evaluateQuery(
    queryDescription: QueryDescription,
    entity: Entity
  ): boolean {
    if (Array.isArray(queryDescription)) {
      return queryDescription.every((c) => entity.has(c));
    }

    if (
      queryDescription.not &&
      queryDescription.not.some((c) => entity.has(c))
    ) {
      return false;
    }

    if (
      queryDescription.all &&
      queryDescription.all.some((c) => !entity.has(c))
    ) {
      return false;
    }
    if (
      queryDescription.one &&
      queryDescription.one.every((c) => !entity.has(c))
    ) {
      return false;
    }

    return true;
  }

  private getQueryResults(queryDescription: QueryDescription): Entity[] {
    const matches: Entity[] = [];
    for (const space of this.world.spaces.values()) {
      for (const entity of space.entities.values()) {
        if (this.evaluateQuery(queryDescription, entity)) {
          matches.push(entity);
        }
      }
    }

    return matches;
  }
}
