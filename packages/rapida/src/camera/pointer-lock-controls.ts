/* eslint-disable @typescript-eslint/no-empty-function */
import { PointerLockControls as ThreePointerLockControls } from 'three-stdlib/controls/PointerLockControls';
import CameraControls from './camera-controls';

type PointerLockControlsCreationParams = undefined;

type PointerLockControlsParams = undefined;

/**
 * A component that creates three js orbit controls
 */
class PointerLockControls extends CameraControls {
  /**
   * The three js pointer lock controls
   */
  pointerLockControls?: ThreePointerLockControls;

  /**
   * Params for creating the pointer lock controls
   */
  private params: PointerLockControlsParams;

  constructor(params?: PointerLockControlsCreationParams) {
    super();
    this.params = undefined;
  }

  init = (): void => {
    this.pointerLockControls = new ThreePointerLockControls(
      this.camera.threeCamera,
      this.rendererElement
    );
  };

  update = (_timeElapsed: number): void => {};

  destroy = (): void => {
    this.pointerLockControls?.dispose();
  };
}

export default PointerLockControls;
