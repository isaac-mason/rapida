import * as three from 'three';
import { Component } from 'src/core/core';

export const THREE_CAMERA_INIT = 'c.three.camera.init';
export const THREE_CAMERA_UPDATE = 'c.three.camera.update';
export const THREE_CAMERA_DESTROY = 'c.three.camera.destroy';

export interface ThreeCameraInitEvent {
  topic: typeof THREE_CAMERA_INIT;
  data: three.PerspectiveCamera;
}

export interface ThreeCameraUpdateEvent {
  topic: typeof THREE_CAMERA_UPDATE;
  data: three.PerspectiveCamera;
}

export interface ThreeCameraDestroyEvent {
  topic: typeof THREE_CAMERA_DESTROY;
  data: three.PerspectiveCamera;
}

class CameraComponent extends Component {
  /**
   * The three js camera
   */
  camera: three.PerspectiveCamera;

  constructor(name: string, camera?: three.PerspectiveCamera) {
    super(name);
    this.camera = camera || new three.PerspectiveCamera();
  }

  init = () => {
    this.broadcastToScene({
      topic: THREE_CAMERA_INIT,
      data: this.camera,
    } as ThreeCameraInitEvent);
  };

  update = (ms: number) => {
    console.log(ms);
  };

  destroy = () => {
    this.broadcastToScene({
      topic: THREE_CAMERA_DESTROY,
      data: this.camera,
    } as ThreeCameraDestroyEvent);
  };
}

export default CameraComponent;
