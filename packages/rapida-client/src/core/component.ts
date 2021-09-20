/* eslint-disable @typescript-eslint/no-empty-function */
import { uuid } from '@isaacmason/rapida-common';
import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import Scene from './scene';

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
   * @param timeElapsed the time since the last update for this component in milliseconds
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update = (timeElapsed: number): void => {};
}

export { Component };
