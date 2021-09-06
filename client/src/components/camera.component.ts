import * as three from 'three';
import {
  Component,
  EntityPositionUpdateEvent,
  ENTITY_POSITION_UPDATE_EVENT,
} from '../core/core';

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
    this.camera = camera || new three.PerspectiveCamera(70, 1, 1, 1000);
  }

  init = () => {
    if (this.entity === undefined) {
      throw new Error('Entity is not available during init');
    }

    // broadcast the camera to the
    this.broadcastToScene({
      topic: THREE_CAMERA_INIT,
      data: this.camera,
    } as ThreeCameraInitEvent);

    // set the initial camera position
    this.camera.position.set(
      this.entity.position.x,
      this.entity.position.y,
      this.entity.position.z
    );

    // move the camera with the entity position
    this.addEntityHandler(
      ENTITY_POSITION_UPDATE_EVENT,
      'updateCameraPosition',
      (event: EntityPositionUpdateEvent) => {
        this.camera.position.set(event.data.x, event.data.y, event.data.z);
      }
    );
  };

  // eslint-disable-next-line no-unused-vars
  update = (ms: number) => {};

  destroy = () => {
    this.broadcastToScene({
      topic: THREE_CAMERA_DESTROY,
      data: this.camera,
    } as ThreeCameraDestroyEvent);
  };
}

export default CameraComponent;
