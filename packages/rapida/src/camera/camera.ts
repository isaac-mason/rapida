import { uuid } from '@rapidajs/rapida-common';
import * as three from 'three';
import { World } from '../world';
import CameraControls from './camera-controls';

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
   * The cameras controls
   */
  controls?: CameraControls;

  /**
   * The world the camera belongs to
   */
  world: World;

  /**
   * Whether the camera has been initialised
   */
  private initialised = false;

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

  /**
   * Initialisation logic for the camera
   */
  _init = (): void => {
    // Initialise the controls if set
    this.controls?.init();

    // Set the initialised property to true
    this.initialised = true;
  };

  /**
   * Destruction logic for the camera
   */
  destroy = (): void => {
    // Destroy the controls if set
    this.controls?.destroy();
  };

  /**
   * Sets the controls for the camera
   * @param controls the controls for the camera
   */
  setControls(controls: CameraControls): void {
    // set the camera property on the controls
    controls.camera = this;

    // initialise the controls if the camera is already initialised
    if (this.initialised) {
      this.controls?.init();
    }

    // store the controls
    this.controls = controls;
  }
}

export default Camera;

export { CameraParams };
