import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { World } from '../world';
import { Query, QueryDescription } from './query';

export type SystemQueries = { [queryName: string]: QueryDescription };

/**
 * System abstract class that is extended to create a system containing custom logic for a world.
 *
 * The System is the 'S' in ECS. Systems can be created with multiple queries for entities by what components they contain.
 * Systems have lifecycle hooks `onInit`, `onUpdate`, and `onDestroy` hook that are executed to provide logic to the world.
 * Systems also have their own events system `events` that can be used to run that isn't required to be run on every update.
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
   * A map of query names to query descriptions
   */
  queries: SystemQueries = {};

  /**
   * A map of query names to queries
   */
  results: { [name: string]: Query } = {};

  /**
   * The event system for this system
   */
  private events = new EventSystem();

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
   * Destroys the system and removes it from the world
   */
  destroy(): void {
    this.world.remove(this);
  }

  /**
   * Destroy logic for the system
   */
  _destroy(): void {
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
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): void {
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
