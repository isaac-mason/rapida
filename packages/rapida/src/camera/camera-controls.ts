import Camera from './camera';

abstract class CameraControls {
  private _camera?: Camera;

  get camera(): Camera {
    return this._camera as Camera;
  }

  set camera(c: Camera) {
    this._camera = c;
  }

  get rendererElement(): HTMLCanvasElement {
    return this.camera.world.runtime.renderer.domElement;
  }

  abstract init(): void;

  abstract update: (timeElapsed: number) => void | undefined;

  abstract destroy(): void;
}

export default CameraControls;
