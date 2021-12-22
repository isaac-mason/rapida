import { Component } from './component';
import { Entity } from './entity';
import { Query, QueryDescription } from './query';
import { RECS } from './recs';

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
   * Constructor for a QueryManager
   * @param recs the RECS the QueryManager is in
   */
  constructor(recs: RECS) {
    this.recs = recs;
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
        if (query.match(entity)) {
          query.addEntity(entity);
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
    const queries = this._entityQueries.get(entity.id);

    if (!queries) {
      return;
    }

    queries.forEach((q) => q.removeEntity(entity));
  }

  /**
   * Updates queries after a component has been added to an entity
   * @param entity the query
   * @param component the component added to the query
   */
  onEntityComponentAdded(entity: Entity, component: Component): void {
    this.queries.forEach((query) => {
      if (query.componentNames.includes(component.constructor.name)) {
        this.updateQueryForEntity(query, entity);
      }
    });
  }

  /**
   * Updates queries after a component has been removed from an entity
   * @param entity the query
   * @param component the component added to the query
   */
  onEntityComponentRemoved(entity: Entity, component: Component): void {
    this.queries.forEach((query) => {
      if (query.componentNames.includes(component.constructor.name)) {
        this.updateQueryForEntity(query, entity);
      }
    });
  }

  /**
   * Updates a query for an entity
   * @param query the query
   * @param entity the entity
   */
  private updateQueryForEntity(query: Query, entity: Entity): void {
    const entityQueries = this.getEntityQueries(entity);

    const match = query.match(entity);
    const has = query.entities.has(entity);

    if (match && !has) {
      query.addEntity(entity);
      entityQueries?.add(query);
    } else if (!match && has) {
      query.removeEntity(entity);
      entityQueries?.delete(query);
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
