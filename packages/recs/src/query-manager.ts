import { Component } from './component';
import { Entity } from './entity';
import { Query, QueryDescription } from './query';
import { RECS } from './recs';

enum QueryManagerEventType {
  ENTITY_COMPONENT_ADDED_EVENT = 'ENTITY_COMPONENT_ADDED_EVENT',
  ENTITY_COMPONENT_REMOVED_EVENT = 'ENTITY_COMPONENT_REMOVED_EVENT',
  ENTITY_REMOVED_EVENT = 'ENTITY_REMOVED_EVENT',
}

type EntityComponentAddedEvent = {
  type: QueryManagerEventType.ENTITY_COMPONENT_ADDED_EVENT;
  entity: Entity;
  component: Component;
};

type EntityComponentRemovedEvent = {
  type: QueryManagerEventType.ENTITY_COMPONENT_REMOVED_EVENT;
  entity: Entity;
  component: Component;
};

type EntityRemovedEvent = {
  type: QueryManagerEventType.ENTITY_REMOVED_EVENT;
  entity: Entity;
};

type QueryManagerEvent =
  | EntityComponentAddedEvent
  | EntityComponentRemovedEvent
  | EntityRemovedEvent;

/**
 * QueryManager that manages Query class instances
 */
export class QueryManager {
  /**
   * A map of query dedupe strings to query instances
   */
  queries: Map<string, Query> = new Map();

  /**
   * The RECS instance the query manager is in
   */
  private recs: RECS;

  /**
   * A map of entity ids and a set of queries the entity is part of
   */
  private _entityQueries: Map<string, Set<Query>> = new Map();

  /**
   * A buffer of query manager events to process on the next update call
   */
  private eventsBuffer: QueryManagerEvent[] = [];

  /**
   * Constructor for a QueryManager
   * @param recs the RECS the QueryManager is in
   */
  constructor(recs: RECS) {
    this.recs = recs;
  }

  /**
   * Updates queries with the query manager events stored in the buffer
   */
  update(): void {
    // clear the `added` and `removed` sets for all queries in preparation for the next update
    this.queries.forEach((q) => q._preUpdate());

    // process all events
    const toProcess = this.eventsBuffer.splice(0, this.eventsBuffer.length);
    toProcess.forEach((event) => {
      if (event.type === QueryManagerEventType.ENTITY_COMPONENT_ADDED_EVENT) {
        // handle entity component added event
        this.queries.forEach((query) => {
          if (query.componentNames.includes(event.component.constructor.name)) {
            this.updateQueryForEntity(query, event.entity);
          }
        });
      } else if (
        event.type === QueryManagerEventType.ENTITY_COMPONENT_REMOVED_EVENT
      ) {
        // handle entity component removed event
        this.queries.forEach((query) => {
          if (query.componentNames.includes(event.component.constructor.name)) {
            this.updateQueryForEntity(query, event.entity);
          }
        });
      } else {
        // handle entity removed event
        const queries = this._entityQueries.get(event.entity.id);
        if (!queries) {
          return;
        }
        queries.forEach((q) => q._removeEntity(event.entity));
      }
    });
  }

  /**
   * Retrieves a query by a query description
   * Adds a query to the query manager if one with the description does not already exist
   * If the query already exists, it is returned
   * @param queryDescription the query to add
   */
  getQuery(queryDescription: QueryDescription): Query {
    const dedupeString = Query.getDescriptionDedupeString(queryDescription);

    // return the existing query if it exists
    const existingQuery = this.queries.get(dedupeString);
    if (existingQuery) {
      return existingQuery;
    }

    // create the query
    const query = new Query(queryDescription);
    this.queries.set(dedupeString, query);

    // populate the query with existing entities
    this.recs.spaces.forEach((space) => {
      space.entities.forEach((entity) => {
        if (query._match(entity)) {
          query._addEntity(entity);
        }
      });
    });

    return query;
  }

  /**
   * Removes a query from the query manager
   * @param query the query to remove
   */
  removeQuery(query: Query): void {
    this.queries.delete(query.key);
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
   * Updates a query for an entity
   * @param query the query
   * @param entity the entity
   */
  private updateQueryForEntity(query: Query, entity: Entity): void {
    const entityQueries = this.getEntityQueries(entity);

    const match = query._match(entity);
    const has = query.all.has(entity);

    if (match && !has) {
      query._addEntity(entity);
      entityQueries.add(query);
    } else if (!match && has) {
      query._removeEntity(entity);
      entityQueries.delete(query);
    }
  }

  /**
   * Gets a set of queries an entity is part of
   * @param entity the entity
   * @returns a set of queries an entity is part of
   */
  private getEntityQueries(entity: Entity): Set<Query> {
    let entityQueries = this._entityQueries.get(entity.id);

    if (entityQueries === undefined) {
      entityQueries = new Set<Query>();
      this._entityQueries.set(entity.id, entityQueries);
    }

    return entityQueries;
  }
}
