import { Event, uuid } from '@isaacmason/rapida-common';
import CameraControls from 'src/camera/camera-controls';
import * as three from 'three';
import Scene from '../scene';

export const THREE_CAMERA_INIT = 'c.three.camera.init';
export interface ThreeCameraInitEvent extends Event {
  topic: string;
  data: {
    id: string;
    name: string;
    camera: Camera;
  };
}

export const THREE_CAMERA_DESTROY = 'c.three.camera.destroy';
export interface ThreeCameraDestroyEvent extends Event {
  topic: string;
  data: {
    id: string;
    name: string;
    camera: Camera;
  };
}

/**
 * A camera that can exist in a scene
 */
class Camera {
  /**
   * A unique id for the camera
   */
  id: string;

  /**
   * The name of the camera
   */
  name: string;

  /**
   * The three js camera
   */
  threeCamera: three.PerspectiveCamera;

  /**
   * The cameras controls
   */
  controls?: CameraControls;

  /**
   * The scene the entity is in. Set on adding to a Scene.
   */
  private _scene?: Scene;

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
   * Whether the camera has been initialised
   */
  private initialised = false;

  constructor(name: string, camera?: three.PerspectiveCamera) {
    this.id = uuid();
    this.name = name;
    this.threeCamera = camera || new three.PerspectiveCamera();
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
  init = (): void => {
    // Initialise the controls if set
    this.controls?.init();

    // Set the initialised property to true
    this.initialised = true;

    // Broadcast the camera to the scene
    this.scene.emit({
      topic: THREE_CAMERA_INIT,
      data: {
        id: this.id,
        name: this.name,
        camera: this,
      },
    } as ThreeCameraInitEvent);
  };

  /**
   * Destruction logic for the camera
   */
  destroy = (): void => {
    // Destroy the controls if set
    this.controls?.destroy();

    // Emit a camera destroyed event
    this.scene.emit({
      topic: THREE_CAMERA_DESTROY,
      data: {
        id: this.id,
        name: this.name,
        camera: this,
      },
    } as ThreeCameraDestroyEvent);
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
