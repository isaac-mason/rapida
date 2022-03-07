import {
  Event,
  EventHandler,
  EventSubscription,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Entity } from './entity';
import { World } from './world';

/**
 * Params for creating a new Space
 */
export type SpaceParams = {
  /**
   * An id for the space, must be unique
   */
  id?: string;
};

/**
 * Space that contains entities and manages entities and their lifecycle.
 *
 * Spaces can be added to a RECS instance and then affected by the systems in the RECS.
 */
export class Space {
  /**
   * Entities in the space
   */
  entities: Map<string, Entity> = new Map();

  /**
   * The spaces event system
   */
  events = new EventSystem({ queued: true });

  /**
   * A unique ID for the space
   */
  id: string;

  /**
   * Whether the space has been initialised
   */
  initialised = false;

  /**
   * The RECS instance the space is in
   */
  recs: World;

  /**
   * Constructor for the Space
   * @param params the parameters for the space
   */
  constructor(recs: World, params?: SpaceParams) {
    this.recs = recs;
    this.id = params?.id || uuid();
  }

  /**
   * Retrieves space factories
   */
  get create(): {
    /**
     * Creates a new entity in the space
     * @returns a new entity
     */
    entity: () => Entity;
  } {
    return {
      entity: (): Entity => {
        return this.recs.entityManager.createEntity(this);
      },
    };
  }

  /**
   * Destroys the space and removes it from the RECS
   */
  destroy(): void {
    this.recs.remove(this);
  }

  /**
   * Broadcasts an event for handling by the space
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
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
  ): EventSubscription {
    return this.events.on(eventName, handler);
  }

  /**
   * Removes an entity from the space
   * @param entity the entity to remove
   */
  remove(entity: Entity): Space {
    this.recs.entityManager.removeEntity(entity, this);
    return this;
  }
}
