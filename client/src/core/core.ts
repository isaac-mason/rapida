// eslint-disable-next-line max-classes-per-file
import { IComponent, IEntity, uuid } from '@isaacmason/rapida-common';
import * as three from 'three';
import Event from './event';

class Component implements IComponent {
  /**
   * This component instances unique id
   */
  id: string;

  /**
   * The name of the component
   */
  name: string;

  /**
   * The entity this component belongs to. Set on adding to an Entity.
   */
  entity: Entity | undefined;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  /**
   * Initialisation logic. The entity will be available in this method.
   */
  init = (): void => {};

  /**
   * Destruction logic
   */
  destroy = (): void => {};

  /**
   * Update logic
   * @param timeElapsed the time since the last update for this component in seconds
   */
  // eslint-disable-next-line no-unused-vars
  update = (timeElapsed: number): void => {};

  /**
   * Adds a handler for events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   */
  addEntityHandler(
    eventName: string,
    handlerName: string,
    handler: Function
  ): Component {
    if (!this.entity) {
      throw new Error('Component is not currently attached to an entity');
    }
    this.entity.addEntityHandler(
      eventName,
      // prefix the handler name with the component name
      `${this.name}${handlerName}`,
      handler
    );
    return this;
  }

  /**
   * Adds a handler for scene events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   */
  addSceneHandler(
    eventName: string,
    handlerName: string,
    handler: Function
  ): Component {
    if (!this.entity) {
      throw new Error('Component is not currently attached to an entity');
    }
    if (this.entity.scene === undefined) {
      throw new Error('The entities scene is not available');
    }
    this.entity.scene.addSceneHandler(
      eventName,
      // prefix the handler name with the component name
      `${this.name}-${handlerName}`,
      handler
    );
    return this;
  }

  /**
   * Broadcasts a message via the entity to the entity
   * @param event the event to broadcast
   */
  broadcastToEntity(event: Event) {
    if (this.entity === undefined) {
      throw new Error('Entity is not available');
    }
    this.entity.broadcastToEntity(event);
  }

  /**
   * Broadcasts a message via the entity to the scene
   * @param event the event to broadcast
   */
  broadcastToScene(event: Event) {
    if (this.entity === undefined) {
      throw new Error('Entity is not available');
    }
    this.entity.broadcastToScene(event);
  }
}

const ENTITY_POSITION_UPDATE_EVENT = 'e.position.update';
interface EntityPositionUpdateEvent {
  topic: typeof ENTITY_POSITION_UPDATE_EVENT;
  data: three.Vector3;
}

const ENTITY_ROTATION_UPDATE_EVENT = 'e.rotation.update';
interface EntityRotationUpdateEvent {
  topic: typeof ENTITY_POSITION_UPDATE_EVENT;
  data: three.Quaternion;
}

class Entity implements IEntity {
  /**
   * The unique ID of the entity
   */
  id: string;

  /**
   * The name of the entity
   */
  name: string;

  /**
   * A group of three Object3D objects
   */
  group: three.Group;

  /**
   * The scene the entity is in. Set on adding to a Scene.
   */
  scene: Scene | undefined;

  /**
   * The components for this entity
   */
  components: { [name: string]: Component };

  /**
   * Whether the entity is 'playing', or whether updates are occurring
   */
  playing: boolean;

  /**
   * Whether the entity is alive
   * If false, the entity will be destroyed by the EntityManager
   */
  alive: boolean;

  /**
   * The position of the entity
   */
  get position() {
    return this.group.position;
  }

  /**
   * The rotation of the entity
   */
  get rotation() {
    return this.group.rotation;
  }

  /**
   * The handlers for this entity
   */
  entityHandlers: { [eventName: string]: { [handlerName: string]: Function } };

  /**
   * The entity of this parent
   */
  parent?: Entity;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.group = new three.Group();
    this.playing = true;
    this.alive = true;
    this.components = {};
    this.entityHandlers = {};
  }

  /**
   * Sets what scene the Entity is in
   * @param scene the scene
   */
  setScene(scene: Scene): Entity {
    this.scene = scene;
    return this;
  }

  /**
   * Sets the entities parent
   * @param e the parent entity
   */
  setParent(e: Entity): Entity {
    this.parent = e;
    return this;
  }

  /**
   * Initialise the entities components
   */
  init(): Entity {
    Object.values(this.components).map((c) => c.init());
    return this;
  }

  /**
   * Updates the entity
   * @param timeElapsed the time since the last update in milliseconds
   */
  update(timeElapsed: number): void {
    Object.values(this.components).map((c) => c.update(timeElapsed));
  }

  /**
   * Destroy the entities components
   */
  destroy(): void {
    Object.values(this.components).map((c) => c.destroy());
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
    // add the component to the entity
    this.components[c.name] = c as Component;
    // eslint-disable-next-line no-param-reassign
    c.entity = this;
    return this;
  }

  /**
   * Adds a handler for entity events
   * @param eventName the event name
   * @param handler the handler function
   */
  addEntityHandler(
    eventName: string,
    handlerName: string,
    handler: Function
  ): Entity {
    // create the handler object if it does not exist yet
    if (this.entityHandlers[eventName] === undefined) {
      this.entityHandlers[eventName] = {};
    }
    // add the handler
    this.entityHandlers[eventName][handlerName] = handler;
    return this;
  }

  /**
   * Adds a handler for scene events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   */
  addSceneHandler(
    eventName: string,
    handlerName: string,
    handler: Function
  ): Entity {
    if (this.scene === undefined) {
      throw new Error('Scene is not available');
    }
    this.scene.addSceneHandler(
      eventName,
      // prefix the name with the entity name
      `${this.name}-${handlerName}`,
      handler
    );
    return this;
  }

  /**
   * Broadcasts an event for handling by the entity
   * @param event the event to broadcast
   */
  broadcastToEntity(event: Event): Entity {
    const handlers = this.entityHandlers[event.topic];
    if (handlers !== undefined) {
      Object.values(handlers).map((handler) => handler(event));
    }
    return this;
  }

  /**
   * Broadcasts an event for handling by the scene
   * @param event the event to broadcast
   */
  broadcastToScene(event: Event): Entity {
    if (this.scene === undefined) {
      throw new Error('The scene is not available');
    }
    this.scene.broadcastToScene(event);
    return this;
  }

  /**
   * Sets the position for the entity and broadcasts an update event
   * @param p the new position for the entity
   */
  setPosition(p: three.Vector3): Entity {
    this.group.position.set(p.x, p.y, p.z);
    this.broadcastToEntity({
      topic: 'update.position',
      data: this.position,
    });
    return this;
  }

  /**
   * Sets the rotation for the entity and broadcasts an update event
   * @param r the new rotation for the entity
   */
  setRotation(r: three.Quaternion): Entity {
    this.group.rotation.set(r.x, r.y, r.z);
    this.broadcastToEntity({
      topic: 'update.rotation',
      data: this.rotation,
    });
    return this;
  }
}

class Scene {
  /**
   * Entities managed by this EntityManager
   */
  entities: { [name: string]: Entity };

  /**
   * The three js scene.
   * Components have a reference to this scene and can add themselves to the three js scene
   */
  threeScene: three.Scene;

  /**
   * Handlers for scene level events
   */
  sceneHandlers: { [eventName: string]: { [handlerName: string]: Function } };

  /**
   * Functions to be run when the init method is called
   */
  initHooks: Function[];

  /**
   * Functions to be called when the update method is called
   */
  updateHooks: Function[];

  /**
   * Functions to be called when the destroy method is called
   */
  destroyHooks: Function[];

  constructor(entities?: Entity[]) {
    this.threeScene = new three.Scene();
    this.entities = {};
    this.sceneHandlers = {};
    if (entities) {
      entities.map((e) => this.add(e));
    }
    this.initHooks = [
      () => {
        Object.values(this.entities).map((e) => e.init());
      },
    ];
    this.updateHooks = [
      (timeElapsed: number) => {
        const dead: { [id: string]: Entity } = {};
        const alive: { [id: string]: Entity } = {};

        Object.values(this.entities).forEach((e) => {
          e.update(timeElapsed);

          if (e.alive) {
            alive[e.name] = e;
          } else {
            dead[e.name] = e;
          }

          Object.values(dead).forEach((d) => {
            delete this.entities[d.name];
            this.threeScene.remove(d.group);
            d.destroy();
          });

          this.entities = alive;
        });
      },
    ];
    this.destroyHooks = [
      () => {
        Object.values(this.entities).map((e) => e.destroy());
      },
    ];
  }

  /**
   * Initialise the entities components
   */
  init(): void {
    this.initHooks.forEach((i) => i());
  }

  /**
   * Updates all entities within the scene
   * @param timeElapsed the time since the last update in seconds
   */
  update(timeElapsed: number): void {
    this.updateHooks.forEach((u) => u(timeElapsed));
  }

  /**
   * Destroy all entities
   */
  destroy(): void {
    this.destroyHooks.forEach((d) => d());
  }

  /**
   * Adds an entity
   * @param e the entity to add
   */
  add(e: Entity): Scene {
    e.setScene(this);
    this.entities[e.name] = e;
    this.threeScene.add(e.group);
    return this;
  }

  /**
   * Adds a handler for scene events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   */
  addSceneHandler(
    eventName: string,
    handlerName: string,
    handler: Function
  ): Scene {
    // create the handler object if it does not exist yet
    if (this.sceneHandlers[eventName] === undefined) {
      this.sceneHandlers[eventName] = {};
    }
    // add the handler
    this.sceneHandlers[eventName][handlerName] = handler;
    return this;
  }

  /**
   * Broadcasts an event for handling by the scene
   * @param event the event to broadcast
   */
  broadcastToScene(event: Event): Scene {
    const handlers = this.sceneHandlers[event.topic];
    if (handlers !== undefined) {
      Object.values(handlers).map((handler) => handler(event));
    }
    return this;
  }
}

export {
  Scene,
  Entity,
  Component,
  ENTITY_POSITION_UPDATE_EVENT,
  ENTITY_ROTATION_UPDATE_EVENT,
  EntityPositionUpdateEvent,
  EntityRotationUpdateEvent,
};
