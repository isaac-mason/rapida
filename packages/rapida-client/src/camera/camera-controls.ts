import Camera from './index';

abstract class CameraControls {
  private _camera?: Camera;

  get camera(): Camera {
    return this._camera as Camera;
  }

  set camera(c: Camera) {
    this._camera = c;
  }

  get rendererElement(): HTMLCanvasElement {
    return this.camera.scene.runtime.renderer.domElement;
  }

  abstract init(): void;

  abstract update(timeElapsed: number): void;

  abstract destroy(): void;
}

export default CameraControls;
