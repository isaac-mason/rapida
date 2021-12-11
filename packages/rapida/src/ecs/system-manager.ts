import { World } from '../world';
import { Query, QueryDescription } from './query';
import { System } from './system';

/**
 * SystemManager that manages systems in a world and calls their lifecycle hooks.
 *
 * Handles adding and removing systems and providing them with queries via the `QueryManager`.
 *
 * Maintains the usage of queries by systems and removes queries from the `QueryManager` if no systems are
 * using a query.
 */
class SystemManager {
  /**
   * Systems in the System Manager
   */
  systems: Map<string, System> = new Map();

  /**
   * Whether the system manager has been initialised
   */
  initialised = false;

  /**
   * The world the system manager belongs in
   */
  private world: World;

  /**
   * A map of query ids to systems using the query
   */
  private queryToSystems: Map<string, Set<System>> = new Map();

  /**
   * Constructor for the SystemManager
   * @param world the world for the SystemManager
   */
  constructor(world: World) {
    this.world = world;
  }

  /**
   * Adds a system to the system manager
   * @param system the system to add
   */
  addSystem(system: System): SystemManager {
    system.world = this.world;

    this.systems.set(system.id, system);

    Object.entries(system.queryDescriptions).forEach(
      ([queryName, queryDescription]: [string, QueryDescription]) => {
        const query = this.world.queryManager.getQuery(queryDescription);
        this.addSystemToQuery(query, system);
        system.queries[queryName] = query;
      }
    );

    if (this.initialised) {
      system._init();
    }

    return this;
  }

  /**
   * Removes a system from the system manager
   * @param system the system to remove
   */
  removeSystem(system: System): SystemManager {
    this.systems.delete(system.id);

    Object.entries(system.queryDescriptions).forEach(
      ([queryName, queryDescription]: [string, QueryDescription]) => {
        const query = this.world.queryManager.getQuery(queryDescription);
        this.removeSystemFromQuery(query, system);
        delete system.queries[queryName];
      }
    );

    system._destroy();

    return this;
  }

  /**
   * Initialises the system manager
   */
  _init(): void {
    this.systems.forEach((s) => {
      s._init();
    });
    this.initialised = true;
  }

  /**
   * Updates systems in the system manager
   * @param timeElapsed the time elapsed in milliseconds
   */
  _update(timeElapsed: number): void {
    this.systems.forEach((s) => {
      if (s.enabled) {
        s._update(timeElapsed);
      }
    });
  }

  /**
   * Destroys all systems
   */
  _destroy(): void {
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
    let systems: Set<System> | undefined = this.queryToSystems.get(query.key);

    if (systems === undefined) {
      systems = new Set([]);
      this.queryToSystems.set(query.key, systems);
    }

    systems.delete(system);

    // remove the query if it is not in use by any systems
    if (systems.size === 0) {
      this.world.queryManager.removeQuery(query);
    }
  }
}

export { SystemManager };
