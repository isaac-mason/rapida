import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Entity, EntityParams } from './entity';
import { World } from '../world';

type SpaceFactories = {
  entity: (params?: EntityParams) => Entity;
};

/**
 * Params for creating a new Space
 */
type SpaceParams = {
  /**
   * An id for the space, must be unique
   */
  id?: string;
};

/**
 * Space that contains entities and manages entities and their lifecycle.
 *
 * A Space can be added to a world and then affected by the systems in a world.
 */
class Space {
  /**
   * A unique ID for the space
   */
  id: string;

  /**
   * The parent World the space is in
   */
  world: World;

  /**
   * Entities in the space
   */
  entities: Map<string, Entity> = new Map();

  /**
   * A map of component ids to update functions for all components in the space
   */
  _componentUpdatePool: Map<string, (timeElapsed: number) => void> = new Map();

  /**
   * Whether the space has been initialised
   */
  initialised = false;

  /**
   * The spaces event system
   */
  private events = new EventSystem();

  /**
   * Constructor for the Space
   * @param params the parameters for the space
   */
  constructor(world: World, params?: SpaceParams) {
    this.world = world;
    this.id = params?.id || uuid();
  }

  /**
   * Initialise the space
   */
  _init(): void {
    this.entities.forEach((e) => e._init());
    this.initialised = true;
  }

  /**
   * Updates all entities within the space
   * @param timeElapsed the time since the last update in milliseconds
   */
  _update(timeElapsed: number): void {
    // Run all component updates
    this._componentUpdatePool.forEach((update) => update(timeElapsed));

    // update entities
    const dead: Entity[] = [];
    const alive: Entity[] = [];

    this.entities.forEach((e) => {
      // update the entity
      e._update(timeElapsed);

      // check if the entity is still alive
      if (e.alive) {
        alive.push(e);
      } else {
        dead.push(e);
      }
    });

    // remove dead entities
    dead.forEach((d) => {
      this.entities.delete(d.id);
      d.destroy();
    });

    // step the event system
    this.events.tick();
  }

  /**
   * Destroy the space. Removes all entities from the space.
   */
  _destroy(): void {
    this.entities.forEach((e) => this.remove(e));
  }

  /**
   * Adds an entity to the space
   * @param value the entity to add
   */
  add(value: Entity): Space {
    // add the entity
    this.entities.set(value.id, value);

    // initialise if the world has already been initialised
    if (this.initialised) {
      value._init();
    }

    return this;
  }

  /**
   * Removes an entity from the space
   * @param value the entity to remove
   */
  remove(value: Entity): Space {
    // remove the entity from the space
    this.entities.delete(value.id);

    // destroy the entity
    value.destroy();

    // emit the entity destroy event to the space
    this.world.queryManager.onEntityRemoved(value);

    return this;
  }

  /**
   * Adds a handler for space events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   * @returns the id of the new handler
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): string {
    return this.events.on(eventName, handler);
  }

  /**
   * Removes an event handler by handler id
   * @param eventName the name of the event
   * @param handlerId the id of the event handler
   */
  removeHandler(eventName: string, handlerId: string): void {
    return this.events.removeHandler(eventName, handlerId);
  }

  /**
   * Broadcasts an event for handling by the space
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Factories for creating something new in a space
   */
  private _factories: SpaceFactories = {
    entity: (params?: EntityParams): Entity => {
      const entity = new Entity(this, params);
      this.add(entity);
      return entity;
    },
  };

  /**
   * Retrieves world factories
   */
  public get create(): SpaceFactories {
    return this._factories;
  }
}

export { Space, SpaceParams };
