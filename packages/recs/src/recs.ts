import { uuid } from '@rapidajs/rapida-common';
import { System } from './system';
import { Space, SpaceParams } from './space';
import { SystemManager } from './internals/system-manager';
import { QueryManager } from './internals/query-manager';
import { EntityManager } from './internals/entity-manager';
import { Entity } from './entity';

/**
 * RECS Entity Component System that contains systems and spaces
 */
export class RECS {
  /**
   * The EntityManager for the RECS instance that manages entities and their components
   */
  entityManager: EntityManager;

  /**
   * A unique id for the RECS instance
   */
  id = uuid();

  /**
   * Whether the RECS instance has been initialised
   */
  initialised = false;

  /**
   * The query manager for the RECS instance
   */
  queryManager: QueryManager;

  /**
   * Spaces in the RECS instance
   */
  spaces: Map<string, Space> = new Map();

  /**
   * The system manager for the RECS instance
   */
  systemManager: SystemManager;

  /**
   * Constructor for a RECS instance
   */
  constructor() {
    this.entityManager = new EntityManager(this);
    this.queryManager = new QueryManager(this);
    this.systemManager = new SystemManager(this);
  }

  /**
   * Retrieves RECS factories
   */
  get create(): {
    /**
     * Creates a space in the RECS
     * @param params the params for the space
     * @returns the new space
     */
    space: (params?: SpaceParams) => Space;
  } {
    return {
      space: (params?: SpaceParams): Space => {
        const space = new Space(this, params);
        this.spaces.set(space.id, space);

        if (this.initialised) {
          this.entityManager.initialiseSpace(space);
        }

        return space;
      },
    };
  }

  /**
   * Retrieves RECS add methods
   */
  get add(): {
    /**
     * Adds a system to the RECS
     * @param system the system to add to the RECS
     */
    system: (system: System) => System;
  } {
    return {
      system: (system: System): System => {
        this.systemManager.addSystem(system);
        return system;
      },
    };
  }

  /**
   * Destroys the RECS instance
   */
  destroy(): void {
    this.systemManager.destroy();
    for (const [_, space] of this.spaces) {
      this.entityManager.destroySpace(space);
    }
  }

  /**
   * Initialises the RECS instance
   */
  init(): void {
    // Set the RECS to be initialised
    this.initialised = true;

    // Initialise systems
    this.systemManager.init();

    // Initialise spaces
    for (const [_, space] of this.spaces) {
      this.entityManager.initialiseSpace(space);
    }
  }

  /**
   * Removes from the RECS instance
   * @param value the value to remove
   */
  remove(value: System | Space): void {
    if (value instanceof System) {
      this.systemManager.removeSystem(value);
    } else if (value instanceof Space) {
      this.spaces.delete(value.id);
      this.entityManager.destroySpace(value);
    }
  }

  /**
   * Updates the RECS instance
   * @param timeElapsed the time elapsed in seconds
   * @param time the current time in seconds
   */
  update(timeElapsed: number, time: number): void {
    // update components - runs update methods for all components that have them
    this.entityManager.updateComponents(timeElapsed, time);

    // update entities - steps entity event system
    this.entityManager.updateEntities();

    // update spaces - steps space event system
    for (const [_, space] of this.spaces) {
      space.events.tick();
    }

    // update queries
    this.queryManager.update();

    // recycle destroyed entities and components after queries have been updated
    this.entityManager.recycle();

    // update entities in spaces - checks if entities are alive and releases them if they are dead
    for (const [_, space] of this.spaces) {
      const dead: Entity[] = [];

      for (const [__, entity] of space.entities) {
        if (!entity.alive) {
          dead.push(entity);
        }
      }

      for (const d of dead) {
        space.remove(d);
      }
    }

    // update systems
    this.systemManager.update(timeElapsed, time);
  }
}

export const recs = (): RECS => new RECS();
