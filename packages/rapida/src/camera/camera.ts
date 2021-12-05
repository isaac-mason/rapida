import { uuid } from '@rapidajs/rapida-common';
import * as three from 'three';
import { World } from '../world';

type CameraParams = {
  id?: string;
  camera?: three.PerspectiveCamera | three.OrthographicCamera;
};

/**
 * A camera that can exist in a world
 */
class Camera {
  /**
   * A unique id for the camera
   */
  id: string;

  /**
   * The three js camera
   */
  threeCamera: three.PerspectiveCamera | three.OrthographicCamera;

  /**
   * The world the camera belongs to
   */
  world: World;

  /**
   * Constructor for a camera
   * @param world the world the camera exists in
   * @param params params for creating the camera
   */
  constructor(world: World, params?: CameraParams) {
    this.world = world;
    this.id = params?.id || uuid();
    this.threeCamera = params?.camera || new three.PerspectiveCamera();
  }

  get position(): three.Vector3 {
    return this.threeCamera.position;
  }

  set position(vector3: three.Vector3) {
    this.threeCamera.position.copy(vector3);
  }
}

export { Camera, CameraParams };
