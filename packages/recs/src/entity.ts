import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Component } from './component';
import { Space } from './space';

export type EntityParams = {
  id?: string;
  components?: Component[];
};

/**
 * Entity that contains components and calls component lifecycle methods
 */
export class Entity {
  /**
   * The unique ID of the entity
   */
  id: string;

  /**
   * Map of component ids to components
   */
  components: Map<string, Component> = new Map();

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
   * Map of component names to components
   */
  private _componentNamesToComponents: Map<string, Component> = new Map();

  /**
   * The entities event system
   */
  private events = new EventSystem();

  /**
   * Constructor for a new RECS Entity
   * @param space the space the entity is in
   * @param params params for creating the entity
   */
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
  _update(_timeElapsed: number): void {
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
    this._componentNamesToComponents.set(
      Component.getComponentName(value),
      component
    );
    component.entity = this;

    if (this.initialised && component.onInit) {
      component.onInit();
    }

    if (component.onUpdate) {
      this.space._componentUpdatePool.set(component.id, component.onUpdate);
    }

    this.space.recs.queryManager.onEntityComponentAdded(this, component);

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
    this._componentNamesToComponents.delete(Component.getComponentName(value));

    if (component.onUpdate) {
      this.space._componentUpdatePool.delete(component.id);
    }

    if (component.onDestroy) {
      component.onDestroy();
    }

    this.space.recs.queryManager.onEntityComponentRemoved(this, component);

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
    return this._componentNamesToComponents.has(
      Component.getComponentName(value)
    );
  }

  /**
   * Retrieves a component on an entity by type, throws an error if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component
   */
  get<T extends Component | Component>(
    value:
      | {
          new (...args: never[]): T;
        }
      | Component
      | string
  ): T {
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
  find<T extends Component | Component>(
    value:
      | {
          new (...args: never[]): T;
        }
      | Component
      | string
  ): T | undefined {
    const component: Component | undefined =
      this._componentNamesToComponents.get(Component.getComponentName(value));

    if (component) {
      return component as T;
    }

    return undefined;
  }

  /**
   * Adds a handler for entity events
   * @param eventName the event name
   * @param handler the handler function
   * @returns the id of the created handler
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
   * Broadcasts an event for handling by the entity
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }
}
