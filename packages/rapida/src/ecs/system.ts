import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { World } from '../world';
import { Query, QueryDescription } from './query';

type SystemQueries = { [queryName: string]: QueryDescription };

type SystemParams = {
  id?: string;
  queries?: SystemQueries;
};

/**
 * System abstract class that is extended to create a system containing custom logic for a world.
 *
 * The System is the 'S' in ECS. Systems can be created with multiple queries for entities by what components they contain.
 * Systems have lifecycle hooks `onInit`, `onUpdate`, and `onDestroy` hook that are executed to provide logic to the world.
 * Systems also have their own events system `events` that can be used to run that isn't required to be run on every update.
 */
abstract class System {
  /**
   * The id for the system
   */
  id: string;

  /**
   * Whether the system is enabled and should update
   */
  enabled = true;

  /**
   * The world the system is in
   */
  private _world?: World;

  /**
   * Gets the world
   */
  get world(): World {
    return this._world as World;
  }

  /**
   * Sets the world
   */
  set world(w: World) {
    this._world = w;
  }

  /**
   * A map of query names to queries
   */
  queries: { [name: string]: Query } = {};

  /**
   * A map of query names to query descriptions
   */
  queryDescriptions: SystemQueries;

  /**
   * The event system for this system
   */
  private events = new EventSystem();

  /**
   * Constructor for a System
   * @param params the parameters for the system
   */
  constructor(params?: SystemParams) {
    this.id = params?.id || uuid();
    this.queryDescriptions = params?.queries || {};
  }

  /**
   * Initialises the system
   */
  _init(): void {
    // run on system init hook
    if (this.onInit) {
      this.onInit();
    }
  }

  /**
   * Updates the system
   */
  _update(timeElapsed: number): void {
    if (this.onUpdate) {
      this.onUpdate(timeElapsed);
    }
    this.events.tick();
  }

  /**
   * Destroy logic for the system
   */
  destroy(): void {
    // run on system destroy hook if present
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  /**
   * Adds an event handler for the system
   * @param eventName the event name
   * @param handler the event handler
   */
  on(eventName: string, handler: EventHandler): void {
    this.events.on(eventName, handler);
  }

  /**
   * Emits an event to the system
   * @param event the event to emit
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Logic for initialisation of the system. Called during System construction.
   */
  onInit?: () => void = undefined;

  /**
   * Logic for destruction of the system. Called on removing a System from a Scene.
   */
  onDestroy?: () => void = undefined;

  /**
   * Logic for a systems update loop
   * @param timeElapsed the time since the last update
   */
  onUpdate?: (timeElapsed: number) => void = undefined;
}

export default System;

export { System, SystemParams };
