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
   * A map of entity ids and a set of queries the entity is part of
   */
  private entityQueries: Map<string, Set<Query>> = new Map();

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
    this.queries.set(dedupeString, query);

    const matches = this.getQueryResults(query.description);
    for (const entity of matches.values()) {
      this.addEntityToQuery(query, entity);
    }

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
  ): Set<Entity> {
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
   * Updates queries with the query manager events stored in the buffer
   */
  update(): void {
    // clear the `added` and `removed` sets for all queries in preparation for the next update
    for (const query of this.queries.values()) {
      query.added.clear();
      query.removed.clear();
    }

    // process all events
    const events = this.eventsBuffer.splice(0, this.eventsBuffer.length);
    for (const event of events) {
      if (
        event.type === QueryManagerEventType.ENTITY_COMPONENT_ADDED_EVENT ||
        event.type === QueryManagerEventType.ENTITY_COMPONENT_REMOVED_EVENT
      ) {
        // handle entity component added event
        for (const query of this.queries.values()) {
          if (this.queryShouldCheckComponent(query, event.component)) {
            this.updateQueryForEntity(query, event.entity);
          }
        }
      } else if (event.type === QueryManagerEventType.ENTITY_REMOVED_EVENT) {
        // handle entity removed event
        const queries = this.entityQueries.get(event.entity.id);
        if (queries === undefined) {
          return;
        }
        for (const query of this.queries.values()) {
          this.removeEntityFromQuery(query, event.entity);
        }
      }
    }
  }

  private addEntityToQuery(query: Query, entity: Entity): void {
    query.all.add(entity);
    query.added.add(entity);
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

  private getQueryResults(queryDescription: QueryDescription): Set<Entity> {
    const matches: Set<Entity> = new Set();
    for (const space of this.world.spaces.values()) {
      for (const entity of space.entities.values()) {
        if (this.evaluateQuery(queryDescription, entity)) {
          matches.add(entity);
        }
      }
    }

    return matches;
  }

  private queryShouldCheckComponent(
    query: Query,
    component: Component
  ): boolean {
    if (
      !Array.isArray(query.description) &&
      query.description.not !== undefined
    ) {
      return true;
    }

    return query.components.includes(component.class);
  }

  private removeEntityFromQuery(query: Query, entity: Entity): void {
    query.all.delete(entity);
    query.removed.add(entity);
  }

  private updateQueryForEntity(query: Query, entity: Entity): void {
    let entityQueries = this.entityQueries.get(entity.id);

    if (entityQueries === undefined) {
      entityQueries = new Set<Query>();
      this.entityQueries.set(entity.id, entityQueries);
    }

    const match = this.evaluateQuery(query.description, entity);
    const currentlyHasEntity = query.all.has(entity);

    if (match && !currentlyHasEntity) {
      this.addEntityToQuery(query, entity);
      entityQueries.add(query);
    } else if (!match && currentlyHasEntity) {
      this.removeEntityFromQuery(query, entity);
      entityQueries.delete(query);
    }

    this.entityQueries.set(entity.id, entityQueries);
  }
}
