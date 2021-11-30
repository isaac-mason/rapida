import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Component } from './component';
import { Space } from './space';

type EntityParams = {
  id?: string;
  components?: Component[];
};

/**
 * Entity that contains components and calls component lifecycle methods
 */
class Entity {
  /**
   * The unique ID of the entity
   */
  id: string;

  /**
   * The components for this entity
   */
  components: Map<string, Component> = new Map();

  /**
   * A set of the names in this entity
   */
  componentNames = new Set<string>();

  /**
   * Whether the entity should be updated
   * TODO: implement handling
   */
  enabled = true;

  /**
   * Whether the entity is alive
   * If false, the entity will be destroyed by the Space on the next update
   */
  alive = true;

  /**
   * Whether the entity has been initialised
   */
  initialised = false;

  /**
   * The space the entity is in
   */
  space: Space;

  /**
   * A map of component ids to update functions
   */
  private componentUpdatePool: Map<string, (timeElapsed: number) => void> =
    new Map();

  /**
   * The entities event system
   */
  private events = new EventSystem();

  constructor(space: Space, params?: EntityParams) {
    this.space = space;
    this.id = params?.id || uuid();
    if (params?.components) {
      params?.components.forEach((c) => this.addComponent(c));
    }
  }

  /**
   * Initialise the entity
   */
  _init(): Entity {
    this.components.forEach((c) => c.onInit && c.onInit());
    this.initialised = true;
    return this;
  }

  /**
   * Updates the entity
   * @param timeElapsed the time since the last update in milliseconds
   */
  _update(timeElapsed: number): void {
    // Run all component updates
    this.componentUpdatePool.forEach((update) => update(timeElapsed));

    // Process events in the buffer
    this.events.tick();
  }

  /**
   * Destroy the entities components and set the entity as dead
   */
  destroy(): void {
    this.components.forEach((c) => c.onDestroy && c.onDestroy());
    this.alive = false;
  }

  /**
   * Adds a component to the entity
   * @param c the component to add
   */
  addComponent(
    value:
      | Component
      | {
          new (...args: never[]): Component;
        }
  ): Entity {
    let component: Component;

    if (value instanceof Component) {
      component = value;
    } else {
      if (value.length !== 0) {
        throw new Error('Cannot construct the component as it has arguments');
      }

      // eslint-disable-next-line new-cap
      component = new value();
    }

    this.components.set(component.id, component);
    this.componentNames.add(component.constructor.name);
    component.entity = this;

    if (this.initialised && component.onInit) {
      component.onInit();
    }

    if (component.onUpdate) {
      this.componentUpdatePool.set(component.id, component.onUpdate);
    }

    this.space.world.queryManager.onEntityComponentAdded(this, component);

    return this;
  }

  /**
   * Removes a component from the entity and destroys it.
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

    if (value instanceof Component) {
      component = value;
    } else {
      const c = this.get(value);
      if (c == null) {
        throw new Error('Component does not exist in Entity');
      }
      component = c;
    }

    this.components.delete(component.id);
    this.componentNames.delete(component.constructor.name);

    if (component.onUpdate) {
      this.componentUpdatePool.delete(component.id);
    }

    if (component.onDestroy) {
      component.onDestroy();
    }

    this.space.world.queryManager.onEntityComponentRemoved(this, component);

    return this;
  }

  /**
   * Returns whether the entity contains the given component
   * @param constr the component constructor, a component instance, or the string name of the component
   * @returns whether the entity contains the given component
   */
  has(
    value:
      | {
          new (...args: never[]): Component;
        }
      | Component
      | string
  ): boolean {
    // string name
    if (typeof value === 'string') {
      return this.componentNames.has(value);
    }

    // instance
    if (value instanceof Component) {
      return this.componentNames.has(value.constructor.name);
    }

    // constructor
    return this.componentNames.has(value.name);
  }

  /**
   * Retrieves a component on an entity by type, returns null if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component if it is found, or null
   */
  get<T extends Component | Component>(constr: {
    new (...args: never[]): T;
  }): T | null {
    let component: T | undefined;

    this.components.forEach((c) => {
      if (c.constructor.name === constr.name) {
        component = c as T;

        // eslint-disable-next-line no-useless-return
        return;
      }
    });

    if (component) {
      return component;
    }

    return null;
  }

  /**
   * Adds a handler for entity events
   * @param eventName the event name
   * @param handler the handler function
   * @returns the id of the created handler
   */
  on(eventName: string, handler: EventHandler): string {
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
   * Broadcasts an event for handling by the entity
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }
}

export default Entity;

export { Entity, EntityParams };
