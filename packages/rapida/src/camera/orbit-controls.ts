import { Vector3 } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib/controls/OrbitControls';
import CameraControls from './camera-controls';

type OrbitControlsCreationParams = {
  enablePan?: boolean;
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  target?: [number, number, number];
};

type OrbitControlsParams = {
  enablePan: boolean;
  enableDamping: boolean;
  dampingFactor: number;
  enableZoom: boolean;
  target: [number, number, number];
};

/**
 * A component that creates three js orbit controls
 */
class OrbitControls extends CameraControls {
  /**
   * The three js orbit controls
   */
  orbitControls?: ThreeOrbitControls;

  /**
   * Params for creating the orbit controls
   */
  private params: OrbitControlsParams;

  constructor(params?: OrbitControlsCreationParams) {
    super();
    this.params = {
      enablePan: params?.enablePan || false,
      enableDamping: params?.enableDamping || true,
      dampingFactor: params?.dampingFactor || 0.25,
      enableZoom: params?.enableZoom || false,
      target: params?.target || [0, 0, 0],
    };
  }

  init = (): void => {
    this.orbitControls = new ThreeOrbitControls(
      this.camera.threeCamera,
      this.rendererElement
    );
    this.orbitControls.enableDamping = this.params.enableDamping;
    this.orbitControls.dampingFactor = this.params.dampingFactor;
    this.orbitControls.enableZoom = this.params.enableZoom;
    this.orbitControls.target = new Vector3(...this.params.target);
  };

  update = (_timeElapsed: number): void => {
    this.orbitControls?.update();
  };

  destroy = (): void => {
    this.orbitControls?.dispose();
  };
}

export default OrbitControls;
