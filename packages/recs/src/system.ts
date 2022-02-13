import { uuid } from '@rapidajs/rapida-common';
import { RECS } from './recs';
import { Query, QueryDescription } from './query';

/**
 * Object with keys as friendly query names and values as Query Descriptions
 *
 * Used for defining what queries a System should have
 */
export type SystemQueries = { [queryName: string]: QueryDescription };

/**
 * System abstract class that is extended to create a system containing custom logic for an RECS.
 *
 * The System is the 'S' in ECS. Systems can be created with multiple queries for entities by what components they contain.
 * Systems have lifecycle hooks `onInit`, `onUpdate`, and `onDestroy` hook that are executed to provide logic to the RECS.
 * Systems also have their own events system `events` that can be used to run that isn't required to be run on every update.
 *
 * Below is an example of a simple system
 * ```ts
 * class ExampleSystem extends System {
 *   queries = {
 *     queryName: {
 *       all: [ComponentOne, ComponentTwo],
 *       one: [ComponentThree, ComponentFour],
 *       not: [ComponentFive],
 *     }
 *   }
 *
 *   onInit = () => {
 *     // logic to run to initialise the system
 *   }
 *
 *   onUpdate = (timeElapsed: number) => {
 *     // do something with the query results
 *
 *     // added this update
 *     console.log(this.results.queryName.added)
 *
 *     // removed this update
 *     console.log(this.results.queryName.removed)
 *
 *     // all currently matched
 *     console.log(this.results.queryName.all)
 *   }
 *
 *   onDestroy = () => {
 *     // logic to run to destroy the system
 *   }
 * }
 * ```
 */
export abstract class System {
  /**
   * The id for the system
   */
  id = uuid();

  /**
   * Whether the system is enabled and should update
   */
  enabled = true;

  /**
   * The recs the system is in
   */
  private _recs?: RECS;

  /**
   * Gets the RECS for the system
   */
  get recs(): RECS {
    return this._recs as RECS;
  }

  /**
   * Sets the RECS for the system
   */
  set recs(recs: RECS) {
    this._recs = recs;
  }

  /**
   * A map of query names to query descriptions
   *
   * This property should be overridden with desired System queries
   */
  queries: SystemQueries = {};

  /**
   * A map of query names to queries
   *
   * This object is populated by the SystemManager on adding the System to the SystemManager
   */
  results: { [name: string]: Query } = {};

  /**
   * Destroys the system and removes it from the RECS
   */
  destroy(): void {
    this.recs.remove(this);
  }

  /**
   * Logic for initialisation of the system. Called during System construction.
   */
  onInit?: () => void = undefined;

  /**
   * Logic for destruction of the system. Called on removing a System from the RECS.
   */
  onDestroy?: () => void = undefined;

  /**
   * Logic for a systems update loop
   * @param timeElapsed the time since the last update in seconds
   * @param time the current time in seconds
   */
  onUpdate?: (timeElapsed: number, time: number) => void = undefined;

  /**
   * Initialises the system
   * @private called internally, do not call directly
   */
  _init(): void {
    if (this.onInit) {
      this.onInit();
    }
  }

  /**
   * Updates the system
   * @param timeElapsed the time elapsed in seconds
   * @param time the current time in seconds
   * @private called internally, do not call directly
   */
  _update(timeElapsed: number, time: number): void {
    if (this.onUpdate) {
      this.onUpdate(timeElapsed, time);
    }
  }

  /**
   * Destroy logic for the system
   * @private called internally, do not call directly
   */
  _destroy(): void {
    if (this.onDestroy) {
      this.onDestroy();
    }
  }
}
