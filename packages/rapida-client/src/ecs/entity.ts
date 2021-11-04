import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@isaacmason/rapida-common';
import * as three from 'three';
import { Component } from './component';
import Scene from '../scene';

class Entity {
  /**
   * The unique ID of the entity
   */
  id: string = uuid();

  /**
   * The name of the entity
   */
  name: string;

  /**
   * A group of three Object3D objects
   */
  group: three.Group = new three.Group();

  /**
   * The scene the entity is in. Set on adding to a Scene.
   */
  _scene?: Scene;

  get scene(): Scene {
    if (this._scene === undefined) {
      throw new Error('scene is not available');
    }
    return this._scene as Scene;
  }

  set scene(s: Scene) {
    this._scene = s;
  }

  /**
   * The components for this entity
   */
  components: Map<string, Component> = new Map();

  /**
   * Whether the entity is 'playing', or whether updates are occurring
   */
  playing = true;

  /**
   * Whether the entity is alive
   * If false, the entity will be destroyed by the EntityManager
   */
  alive = true;

  /**
   * The position of the entity
   */
  get position(): three.Vector3 {
    return this.group.position;
  }

  /**
   * Sets the position of the entity and broadcasts the change
   */
  set position(p: { x: number; y: number; z: number }) {
    this.group.position.set(p.x, p.y, p.z);
  }

  /**
   * The rotation of the entity
   */
  get rotation(): three.Euler {
    return this.group.rotation;
  }

  /**
   * Sets the rotation of the entity and broadcasts the change
   */
  set rotation(r: { x: number; y: number; z: number }) {
    this.group.rotation.set(r.x, r.y, r.z);
  }

  /**
   * A map of component ids to update functions
   */
  private updatePool: Map<string, (timeElapsed: number) => void> = new Map();

  /**
   * The entities event system
   */
  private events = new EventSystem();

  constructor(name: string) {
    this.name = name;
    this.group = new three.Group();
  }

  /**
   * Initialise the entity
   */
  init(): Entity {
    this.components.forEach((c) => c.init && c.init());
    this.events.start();
    return this;
  }

  /**
   * Updates the entity
   * @param timeElapsed the time since the last update in milliseconds
   */
  update(timeElapsed: number): void {
    this.updatePool.forEach((update) => update(timeElapsed));
  }

  /**
   * Destroy the entities components
   */
  destroy(): void {
    this.components.forEach((c) => c.destroy && c.destroy());
  }

  /**
   * Sets whether the entity is playing
   * @param playing the new state
   */
  setPlaying(playing: boolean): Entity {
    this.playing = playing;
    return this;
  }

  /**
   * Sets whether the entity is alive
   * @param alive the new state
   */
  setAlive(alive: boolean): Entity {
    this.alive = alive;
    return this;
  }

  /**
   * Adds a component to the entity
   * @param c the component to add
   */
  addComponent(c: Component): Entity {
    this.components.set(c.name, c);
    c.entity = this;

    if (this._scene && this._scene.initialised && c.init) {
      c.init();
    }

    if (c.update) {
      this.updatePool.set(c.id, c.update);
    }

    return this;
  }

  /**
   * Removes a component from the entity and destroys it
   * @param c the component to remove and destroy
   */
  removeComponent(c: Component): Entity {
    this.components.delete(c.name);

    if (c.update) {
      this.updatePool.delete(c.id);
    }

    if (c.destroy) {
      c.destroy();
    }

    return this;
  }

  /**
   * Retrieves a component on an entity by type.
   * Throws an error if it does not exist.
   * @param constr the component type to retrieve
   * @returns the component if it is found
   */
  getComponent<T extends Component | Component>(constr: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
  }): T {
    let component: T | undefined;

    this.components.forEach((c) => {
      if (c instanceof constr) {
        component = c as T;
        // eslint-disable-next-line no-useless-return
        return;
      }
    });

    if (component) {
      return component;
    }

    throw new Error(`Component ${constr.name} not found on entity ${this.id}`);
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

export { Entity };
