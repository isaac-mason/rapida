import { OrthographicCamera, Vector3, Scene, PerspectiveCamera } from 'three';
import {
  ViewRectangle,
  ViewRectangleParamInput,
  ViewRectangleParamPlane,
  ViewRectangleParams,
  ViewSize,
} from './view-types';
import {
  convertViewParamInputToViewParam,
  decimalPercentageFromViewParam,
  viewParamDecimalsToViewRectangle,
} from './view-utils';

/**
 * Common interface for a rapida view
 */
export abstract class View {
  /**
   * A unique identifier for the view
   */
  abstract id: string;

  /**
   * The views camera
   */
  abstract camera: PerspectiveCamera | OrthographicCamera;

  /**
   * The views scene
   */
  abstract scene: Scene;

  /**
   * The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on.
   */
  abstract _zIndex: number;

  /**
   * The renderers dom element
   */
  abstract get rendererDomElement(): HTMLElement;

  /**
   * The dom element used by the views renderer
   */
  abstract domElement: HTMLElement;

  /**
   * The size of the view in pixels
   */
  abstract viewportSizePx: ViewSize;

  /**
   * Gets the world viewport for a given target
   * @param target the target to calculate the viewport for
   * @returns the world viewport for a given target
   */
  getWorldViewport(target: Vector3): {
    width: number;
    height: number;
    factor: number;
    distance: number;
    aspect: number;
  } {
    const { width, height } = this.viewportSizePx;

    const aspect = width / height;

    const tempTarget = new Vector3();
    tempTarget.copy(target);

    const position = new Vector3();

    const distance = this.camera
      .getWorldPosition(position)
      .distanceTo(tempTarget);

    if (this.camera instanceof OrthographicCamera) {
      return {
        width: width / this.camera.zoom,
        height: height / this.camera.zoom,
        factor: 1,
        distance,
        aspect,
      };
    }
    const fov = (this.camera.fov * Math.PI) / 180; // convert vertical fov to radians
    const h = 2 * Math.tan(fov / 2) * distance; // visible height
    const w = h * (width / height);

    return { width: w, height: h, factor: width / w, distance, aspect };
  }

  /**
   * Calculates a view rectangle from given view rectangle params
   * @param params the view rectangle params
   * @returns a view rectangle of decimal percentages
   */
  protected calculateViewRectangle(params: ViewRectangleParams): ViewRectangle {
    const rendererSize = this.rendererDomElement.getBoundingClientRect();

    const context = {
      rendererWidth: rendererSize.width,
      rendererHeight: rendererSize.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };

    const getDecimalPercentage = (
      value: ViewRectangleParamInput | undefined,
      plane: ViewRectangleParamPlane
    ): number | undefined => {
      if (value === undefined) {
        return undefined;
      }

      return decimalPercentageFromViewParam(
        convertViewParamInputToViewParam(value),
        plane,
        context
      );
    };

    const decimalViewParams = {
      top: getDecimalPercentage(params.top, 'VERTICAL'),
      bottom: getDecimalPercentage(params.bottom, 'VERTICAL'),
      height: getDecimalPercentage(params.height, 'VERTICAL'),
      left: getDecimalPercentage(params.left, 'HORIZONTAL'),
      right: getDecimalPercentage(params.right, 'HORIZONTAL'),
      width: getDecimalPercentage(params.width, 'HORIZONTAL'),
    };

    return viewParamDecimalsToViewRectangle(decimalViewParams);
  }
}
