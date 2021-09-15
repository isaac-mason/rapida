import * as three from 'three';
import { Component } from '../core/component';
import { Entity } from '../core/entity';

export const THREE_CAMERA_INIT = 'c.three.camera.init';
export interface ThreeCameraInitEvent {
  topic: string;
  data: {
    id: string;
    name: string;
    camera: three.PerspectiveCamera;
  };
}

export const THREE_CAMERA_DESTROY = 'c.three.camera.destroy';
export interface ThreeCameraDestroyEvent {
  topic: string;
  data: {
    id: string;
    name: string;
    camera: three.PerspectiveCamera;
  };
}

/**
 * A component that creates a camera and broadcasts its creation to the scene
 */
class CameraComponent extends Component {
  /**
   * The three js camera
   */
  camera: three.PerspectiveCamera;

  constructor(entity: Entity, name: string, camera?: three.PerspectiveCamera) {
    super(entity, name);
    this.camera = camera || new three.PerspectiveCamera(70, 1, 1, 1000);
    this.entity.group.add(this.camera);
  }

  init = (): void => {
    // broadcast the camera to the scene
    this.scene.emit({
      topic: THREE_CAMERA_INIT,
      data: {
        id: this.id,
        name: this.name,
        camera: this.camera,
      },
    } as ThreeCameraInitEvent);
  };

  destroy = (): void => {
    this.scene.emit({
      topic: THREE_CAMERA_DESTROY,
      data: {
        id: this.id,
        name: this.name,
        camera: this.camera,
      },
    } as ThreeCameraDestroyEvent);
  };
}

export default CameraComponent;
