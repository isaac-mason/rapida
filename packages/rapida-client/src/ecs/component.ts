import { uuid } from '@isaacmason/rapida-common';
import { Physics } from '@isaacmason/rapida-physics';
import { Entity } from './entity';
import { NetworkManager } from '../network/network-manager';
import Scene from '../scene';

/**
 * A component of an entity that has data and behaviour
 */
abstract class Component {
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
  private _entity?: Entity;

  /**
   * Gets the entity for the component. Available during init call.
   */
  get entity(): Entity {
    return this._entity as Entity;
  }

  /**
   * Sets what entity the component belongs to
   * @param entity the entity
   */
  set entity(entity: Entity) {
    this._entity = entity;
  }

  /**
   * The scene the components entity is in
   */
  get scene(): Scene {
    if (this.entity === undefined) {
      throw new Error('entity is not available');
    }
    if (this.entity.scene === undefined) {
      throw new Error('scene is not available');
    }
    return this.entity.scene;
  }

  /**
   * The scenes network manager
   */
  get networkManager(): NetworkManager {
    if (this.entity === undefined) {
      throw new Error('entity is not available');
    }
    if (this.entity.scene === undefined) {
      throw new Error('scene is not available');
    }
    if (this.entity.scene.networkManager === undefined) {
      throw new Error('scene network manager is not available');
    }
    return this.entity.scene.networkManager;
  }

  /**
   * Getter for the scenes physics world
   */
  get physics(): Physics {
    return this.entity.scene.physics;
  }

  /**
   * Constructor for a Component
   * @param name a unique name for the component
   */
  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  /**
   * Initialisation logic. The entity will be available in this method.
   */
  init: (() => void) | undefined = undefined;

  /**
   * Destruction logic
   */
  destroy: (() => void) | undefined = undefined;

  /**
   * Update logic for the component
   * If this method is not implemented in a component it will not be added to the update job pool
   * @param timeElapsed the time since the last update for this component in milliseconds
   */
  update: ((timeElapsed: number) => void) | undefined = undefined;
}

export { Component };
