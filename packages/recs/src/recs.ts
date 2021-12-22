import { uuid } from '@rapidajs/rapida-common';
import { System } from './system';
import { Space, SpaceParams } from './space';
import { SystemManager } from './system-manager';
import { QueryManager } from './query-manager';

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
   * Constructor for a RECS instance
   */
  constructor() {
    this.queryManager = new QueryManager(this);
    this.systemManager = new SystemManager(this);
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
   * Initialises the RECS instance
   */
  init(): void {
    // Initialise systems
    this.systemManager._init();

    // Initialise spaces
    this.spaces.forEach((s) => {
      s._init();
    });

    // Set the RECS to be initialised
    this.initialised = true;
  }

  /**
   * Updates the RECS instance
   * @param timeElapsed the time elapsed in milliseconds
   */
  update(timeElapsed: number): void {
    // update spaces
    this.spaces.forEach((s) => s._update(timeElapsed));

    // update systems
    this.systemManager._update(timeElapsed);
  }

  /**
   * Destroys the RECS instance
   */
  destroy(): void {
    this.systemManager._destroy();
    this.spaces.forEach((s) => s._destroy());
  }

  /**
   * Methods for adding something to the RECS
   */
  private _add: {
    system: (system: System) => System;
  } = {
    /**
     * Adds a system to the RECS
     * @param system the system to add to the RECS
     */
    system: (system: System) => {
      this.systemManager.addSystem(system);
      return system;
    },
  };

  /**
   * Factories for creating something new in the RECS
   */
  private _factories: {
    space: (params?: SpaceParams) => Space;
  } = {
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

  /**
   * Retrieves RECS factories
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get create() {
    return this._factories;
  }

  /**
   * Retrieves RECS add methods
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get add() {
    return this._add;
  }
}

export const recs = (): RECS => new RECS();
