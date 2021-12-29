import { Query, QueryDescription } from './query';
import { RECS } from './recs';
import { System } from './system';

/**
 * SystemManager is an internal class that manages systems in a RECS and calls their lifecycle hooks.
 *
 * Handles adding and removing systems and providing them with queries via the `QueryManager`.
 *
 * Maintains the usage of queries by systems and removes queries from the `QueryManager` if no systems are
 * using a query.
 * 
 * @private internal class, do not use directly
 */
export class SystemManager {
  /**
   * Systems in the System Manager
   */
  systems: Map<string, System> = new Map();

  /**
   * Whether the system manager has been initialised
   */
  private initialised = false;

  /**
   * The RECS the system manager belongs in
   */
  private recs: RECS;

  /**
   * A map of query ids to systems using the query
   */
  private queryToSystems: Map<string, Set<System>> = new Map();

  /**
   * A map of ids to systems with update methods
   */
  private updatePool: Map<string, System> = new Map();

  /**
   * Constructor for the SystemManager
   * @param recs the RECS instance for the SystemManager
   */
  constructor(recs: RECS) {
    this.recs = recs;
  }

  /**
   * Adds a system to the system manager
   * @param system the system to add
   */
  addSystem(system: System): SystemManager {
    system.recs = this.recs;

    this.systems.set(system.id, system);

    Object.entries(system.queries).forEach(
      ([queryName, queryDescription]: [string, QueryDescription]) => {
        const query = this.recs.queryManager.getQuery(queryDescription);
        this.addSystemToQuery(query, system);
        system.results[queryName] = query;
      }
    );

    if (this.initialised) {
      this.initialiseSystem(system);
    }

    return this;
  }

  /**
   * Removes a system from the system manager
   * @param system the system to remove
   */
  removeSystem(system: System): SystemManager {
    this.systems.delete(system.id);

    Object.entries(system.queries).forEach(
      ([queryName, queryDescription]: [string, QueryDescription]) => {
        const query = this.recs.queryManager.getQuery(queryDescription);
        this.removeSystemFromQuery(query, system);
        delete system.results[queryName];
      }
    );

    system._destroy();

    return this;
  }

  /**
   * Initialises the system manager
   */
  init(): void {
    this.initialised = true;
    this.systems.forEach((s) => this.initialiseSystem(s));
  }

  /**
   * Updates systems in the system manager
   * @param timeElapsed the time elapsed in milliseconds
   */
  update(timeElapsed: number): void {
    this.updatePool.forEach((system) => {
      if (system.enabled) {
        system._update(timeElapsed);
      }
    });
  }

  /**
   * Destroys all systems
   */
  destroy(): void {
    this.systems.forEach((s) => s._destroy());
  }

  /**
   * Adds a system to a query
   * @param query the query
   * @param system the system
   */
  private addSystemToQuery(query: Query, system: System) {
    let systems: Set<System> | undefined = this.queryToSystems.get(query.key);

    if (systems === undefined) {
      systems = new Set([system]);
      this.queryToSystems.set(query.key, systems);
    }

    systems.add(system);
  }

  /**
   * Removes a system from a query
   * @param query the query
   * @param system the system
   */
  private removeSystemFromQuery(query: Query, system: System) {
    const systems: Set<System> | undefined = this.queryToSystems.get(query.key);

    if (systems !== undefined) {
      systems.delete(system);

      // remove the query if it is not in use by any systems
      if (systems.size === 0) {
        this.recs.queryManager.removeQuery(query);
      }
    }
  }

  /**
   * Initialises a system
   * @param s the system to initialise
   */
  private initialiseSystem(s: System) {
    if (s.onUpdate) {
      this.updatePool.set(s.id, s);
    }

    s._init();
  }
}
