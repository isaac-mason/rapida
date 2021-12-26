import { uuid } from '@rapidajs/rapida-common';
import * as three from 'three';
import { World } from '../world';

export type CameraParams = {
  id?: string;
  camera?: three.PerspectiveCamera | three.OrthographicCamera;
};

/**
 * A camera that can exist in a world
 */
export class Camera {
  /**
   * A unique id for the camera
   */
  id: string;

  /**
   * The three js camera
   */
  three: three.PerspectiveCamera | three.OrthographicCamera;

  /**
   * The world the camera belongs to
   */
  world: World;

  /**
   * Getter for the cameras position
   */
  get position(): three.Vector3 {
    return this.three.position;
  }

  /**
   * Setter for the cameras position
   */
  set position(vector3: three.Vector3) {
    this.three.position.copy(vector3);
  }

  /**
   * Getter for the cameras rotation quaternion
   */
  get quaternion(): three.Quaternion {
    return this.three.quaternion;
  }

  /**
   * Setter for the cameras rotation quaternion
   */
  set quaternion(quaternion: three.Quaternion) {
    this.three.quaternion.copy(quaternion);
  }

  /**
   * Constructor for a camera
   * @param world the world the camera exists in
   * @param params params for creating the camera
   */
  constructor(world: World, params?: CameraParams) {
    this.world = world;
    this.id = params?.id || uuid();
    this.three = params?.camera || new three.PerspectiveCamera();
  }

  /**
   * Destroys the camera and removes it from the world
   */
  destroy(): void {
    this.world.remove(this);
  }
}
