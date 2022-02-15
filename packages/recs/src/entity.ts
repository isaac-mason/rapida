import {
  Event,
  EventHandler,
  EventSubscription,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { RECS } from './recs';
import { Component } from './component';
import { Space } from './space';

/**
 * Entity is a class that has an id and contains Components.
 *
 * Entities can be created inside a Space.
 *
 * ```ts
 * import recs from '@rapidajs/recs';
 *
 * const world = recs();
 * const space = world.create.space();
 * const entity = world.create.entity();
 * ```
 */
export class Entity {
  /**
   * The unique ID of the entity
   */
  id = uuid();

  /**
   * Map of component ids to components
   */
  components: Map<{ new (...args: never[]): Component }, Component> = new Map();

  /**
   * Whether the entity is alive. If false, the entity will be destroyed by the Space on the next update
   */
  alive = true;

  /**
   * The space the entity is in
   */
  space!: Space;

  /**
   * The RECS instance the entity is in
   */
  get recs(): RECS {
    return this.space.recs;
  }

  /**
   * Whether the entity has been initialised
   */
  private initialised = false;

  /**
   * The event system for the entity
   */
  private events = new EventSystem({ queued: true });

  /**
   * Destroy the entities components and set the entity as dead immediately
   */
  destroy(): void {
    this.space.remove(this);
  }

  /**
   * Destroy the entities components
   */
  _destroy(): void {
    this.alive = false;
  }

  /**
   * Adds a component to the entity
   * @param c the component to add
   */
  addComponent<T extends Component>(
    constr: { new (...args: never[]): T },
    ...args: Parameters<T['construct']>
  ): T {
    // add the component to this entity
    const component = this.recs.entityManager.addComponentToEntity(
      this,
      constr,
      ...args
    );

    // initialise the component if the entity is already initialised
    if (this.initialised) {
      this.initialiseComponent(component);
    }

    return component;
  }

  /**
   * Removes a component from the entity and destroys it
   * The value can either be a Component constructor, or the component instance itself
   * @param value the component to remove and destroy
   */
  removeComponent(
    value:
      | Component
      | {
          new (...args: never[]): Component;
        }
  ): Entity {
    let component: Component;

    // retrieve the component
    if (value instanceof Component) {
      if (!this.components.has(value._class)) {
        throw new Error('Component does not exist in Entity');
      }
      component = value;
    } else {
      const c = this.find(value);
      if (!c) {
        throw new Error('Component does not exist in Entity');
      }
      component = c;
    }

    // remove the component from this entity
    this.recs.entityManager.removeComponentFromEntity(this, component, true);

    return this;
  }

  /**
   * Returns whether the entity contains the given component
   * @param constr the component constructor, a component instance, or the string name of the component
   * @returns whether the entity contains the given component
   */
  has(value: { new (...args: never[]): Component }): boolean {
    return this.components.has(value);
  }

  /**
   * Retrieves a component on an entity by type, throws an error if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component
   */
  get<T extends Component | Component>(value: {
    new (...args: never[]): T;
  }): T {
    const component: T | undefined = this.find(value);

    if (component) {
      return component;
    }

    throw new Error(`Component ${value}} not in entity ${this.id}`);
  }

  /**
   * Retrieves a component on an entity by type, returns undefined if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component if it is found, or undefined
   */
  find<T extends Component | Component>(value: {
    new (...args: never[]): T;
  }): T | undefined {
    const component: Component | undefined = this.components.get(value);

    if (component) {
      return component as T;
    }

    return undefined;
  }

  /**
   * Adds a handler for entity events
   * @param eventName the event name
   * @param handler the handler function
   * @returns the subscription
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): EventSubscription {
    return this.events.on(eventName, handler);
  }

  /**
   * Broadcasts an event for handling by the entity
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Initialise the entity
   * @private called internally, do not call directly
   */
  _init(): Entity {
    this.initialised = true;

    // initialise components
    this.components.forEach((c) => this.initialiseComponent(c));

    return this;
  }

  /**
   * Updates the event system for the entity
   * @private called internally, do not call directly
   */
  _update(): void {
    this.events.tick();
  }

  /**
   * Resets the entity in preparation for object reuse
   * @private called internally, do not call directly
   */
  _reset(): void {
    this.id = uuid();
    this.events.reset();
  }

  /**
   * Initialises a component
   * @param component the component to initialise
   */
  private initialiseComponent(component: Component): void {
    this.recs.entityManager.initialiseComponent(component);
  }
}
