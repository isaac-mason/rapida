import { uuid } from '@rapidajs/rapida-common';
import { System } from './system';
import { Space, SpaceParams } from './space';
import { SystemManager } from './system-manager';
import { QueryManager } from './query-manager';
import { EntityPool } from './entity-pool';
import { ComponentPool } from './component-pool';
import { Component } from './component';
import { Entity } from '.';

/**
 * RECS Entity Component System that contains systems and spaces
 */
export class RECS {
  /**
   * A unique id for the RECS instance
   */
  id = uuid();

  /**
   * Spaces in the RECS instance
   */
  spaces: Map<string, Space> = new Map();

  /**
   * The Entity Pool for the RECS instance
   */
  entityPool: EntityPool = new EntityPool();

  /**
   * The Component Pool for the RECS instance
   */
  componentPool: ComponentPool = new ComponentPool();

  /**
   * The system manager for the RECS instance
   */
  systemManager: SystemManager;

  /**
   * The query manager for the RECS instance
   */
  queryManager: QueryManager;

  /**
   * Whether the RECS instance has been initialised
   */
  initialised = false;

  /**
   * A map of ids to update functions for all entities and components in the space
   */
  _componentsToUpdate: Map<string, Component> = new Map();

  /**
   * A map of ids to update functions for all entities and components in the space
   */
  _entitiesToUpdate: Map<string, Entity> = new Map();

  /**
   * A map of ids to update functions for all systems in the RECS instance
   */
  _systemsUpdatePool: Map<string, (timeElapsed: number) => void> = new Map();

  /**
   * Constructor for a RECS instance
   */
  constructor() {
    this.queryManager = new QueryManager(this);
    this.systemManager = new SystemManager(this);
  }

  /**
   * Retrieves RECS factories
   */
  public get create() {
    return {
      /**
       * Creates a space in the RECS
       * @param params the params for the space
       * @returns the new space
       */
      space: (params?: SpaceParams): Space => {
        const space = new Space(this, params);
        this.spaces.set(space.id, space);

        if (this.initialised) {
          space._init();
        }

        return space;
      },
    };
  }

  /**
   * Retrieves RECS add methods
   */
  public get add() {
    return {
      /**
       * Adds a system to the RECS
       * @param system the system to add to the RECS
       */
      system: (system: System) => {
        this.systemManager.addSystem(system);
        return system;
      },
    };
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
    this.spaces.forEach((s) => {
      s._init();
    });
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
      value._destroy();
    }
  }

  /**
   * Updates the RECS instance
   * @param timeElapsed the time elapsed in milliseconds
   */
  update(timeElapsed: number): void {
    // update components - runs update methods for all components that have them
    this._componentsToUpdate.forEach((c) => c.onUpdate!(timeElapsed));

    // update entities - steps entity event system
    this._entitiesToUpdate.forEach((e) => e._update());

    // update spaces - steps space event system
    this.spaces.forEach((s) => s._updateEvents(timeElapsed));

    // update entities in spaces - checks if entities are alive and releases them if they are dead
    this.spaces.forEach((s) => s._updateEntities(timeElapsed));

    // update queries
    this.queryManager.update();

    // update systems
    this.systemManager.update(timeElapsed);
  }

  /**
   * Destroys the RECS instance
   */
  destroy(): void {
    this.systemManager.destroy();
    this.spaces.forEach((s) => s._destroy());
  }
}

export const recs = (): RECS => new RECS();
