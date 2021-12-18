import { uuid } from '@rapidajs/rapida-common';
import * as three from 'three';
import { World } from '../world';

type SceneParams = {
  id?: string;
};

/**
 * A thin wrapper around a three js scene
 */
class Scene {
  /**
   * The unique ID for the scene
   */
  id: string;

  /**
   * The three js scene
   */
  threeScene = new three.Scene();

  /**
   * The world the scene is in
   */
  private world: World;

  /**
   * Constructor for the scene
   * @param id the unique id for the scene
   * @param params the parameters for the scene
   */
  constructor(world: World, params?: SceneParams) {
    this.world = world;
    this.id = params?.id || uuid();
  }

  /**
   * Adds to the scene
   * Used for adding three objects
   * @param e what should be added to the scenes
   */
  add(value: three.Object3D | three.Object3D[]): Scene {
    if (Array.isArray(value)) {
      // add the three objects
      this.threeScene.add(...(value as three.Object3D[]));
    } else {
      // add the three object
      this.threeScene.add(value);
    }

    return this;
  }

  /**
   * Removes from the scene
   * Used for removing three objects
   * @param value what should be removed
   */
  remove(value: three.Object3D): Scene {
    // remove the three object
    this.threeScene.remove(value);

    return this;
  }

  /**
   * Destroys the scene and removes it from the world
   */
  destroy(): void {
    this.world.remove(this);
  }
}

export { Scene, SceneParams };
