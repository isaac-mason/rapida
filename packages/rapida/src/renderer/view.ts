import { Event } from '@rapidajs/rapida-common';
import { Camera, Scene } from 'src';
import { OrthographicCamera, Vector3 } from 'three';
import {
  decimalPercentageFromViewParam,
  convertViewParamInputToViewParam,
  viewParamDecimalsToViewRectangle,
} from './view-utils';

/**
 * Enum for all supported view interaction events
 */
export enum ViewInteractionEventName {
  CLICK = 'click',
  MOUSE_MOVE = 'mousemove',
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  MOUSE_OUT = 'mouseout',
  MOUSE_OVER = 'mouseover',
  TOUCH_START = 'touchstart',
  TOUCH_END = 'touchend',
  TOUCH_MOVE = 'touchmove',
  TOUCH_CANCEL = 'touchcancel',
}

export const VIEW_ALL_EVENT_NAMES: string[] = [
  ViewInteractionEventName.CLICK,
  ViewInteractionEventName.MOUSE_MOVE,
  ViewInteractionEventName.MOUSE_DOWN,
  ViewInteractionEventName.MOUSE_UP,
  ViewInteractionEventName.MOUSE_ENTER,
  ViewInteractionEventName.MOUSE_LEAVE,
  ViewInteractionEventName.MOUSE_OUT,
  ViewInteractionEventName.MOUSE_OVER,
  ViewInteractionEventName.TOUCH_START,
  ViewInteractionEventName.TOUCH_END,
  ViewInteractionEventName.TOUCH_MOVE,
  ViewInteractionEventName.TOUCH_CANCEL,
];

export const VIEW_MOUSE_EVENTS: string[] = [
  ViewInteractionEventName.CLICK,
  ViewInteractionEventName.MOUSE_DOWN,
  ViewInteractionEventName.MOUSE_UP,
  ViewInteractionEventName.MOUSE_MOVE,
  ViewInteractionEventName.MOUSE_OVER,
  ViewInteractionEventName.MOUSE_OUT,
  ViewInteractionEventName.MOUSE_ENTER,
  ViewInteractionEventName.MOUSE_LEAVE,
];

export const VIEW_TOUCH_EVENTS: string[] = [
  ViewInteractionEventName.TOUCH_START,
  ViewInteractionEventName.TOUCH_END,
  ViewInteractionEventName.TOUCH_MOVE,
  ViewInteractionEventName.TOUCH_CANCEL,
];

/**
 * A view interaction event subscription that contains a method for unsubscribing
 */
export type ViewInteractionEventSubscription = {
  unsubscribe: () => void;
};

/**
 * A type for an extended mouse event which includes a relative x and y value for the relative position of the mouse in the view
 */
type ExtendedMouseEvent = MouseEvent & {
  /**
   * The relative X coordinate of the mouse pointer in local (DOM content) coordinates.
   */
  relativeX: number;

  /**
   * The relative Y coordinate of the mouse pointer in local (DOM content) coordinates.
   */
  relativeY: number;
};

/**
 * A mouse event for a webgl view
 */
export type ViewMouseEvent = {
  topic: typeof VIEW_MOUSE_EVENTS[number];
  data: ExtendedMouseEvent;
};

export type ViewTouch = Touch & {
  /**
   * The relative X coordinate of the touch in local (DOM content) coordinates.
   */
  relativeX: number;

  /**
   * The relative Y coordinate of the touch in local (DOM content) coordinates.
   */
  relativeY: number;
};

/**
 * A touch event for a webgl view
 */
export type ViewTouchEvent = {
  topic: typeof VIEW_MOUSE_EVENTS[number];
  data: {
    /**
     * True if the alt key was down when the mouse event was fired.
     */
    altKey: boolean;

    /**
     * True if the control key was down when the mouse event was fired.
     */
    ctrlKey: boolean;

    /**
     * True if the meta key was down when the mouse event was fired.
     */
    metaKey: boolean;

    /**
     * True if the shift key was down when the mouse event was fired.
     */
    shiftKey: boolean;

    /**
     * The touches that have changed
     */
    changedTouches: ViewTouch[];

    /**
     * Target touches
     */
    targetTouches: ViewTouch[];

    /**
     * All active touches
     */
    touches: ViewTouch[];
  };
};

export interface ViewInteractionEventMap {
  click: ViewMouseEvent;
  mousedown: ViewMouseEvent;
  mouseup: ViewMouseEvent;
  mousemove: ViewMouseEvent;
  mouseover: ViewMouseEvent;
  mouseout: ViewMouseEvent;
  mouseenter: ViewMouseEvent;
  mouseleave: ViewMouseEvent;
  touchstart: ViewTouchEvent;
  touchend: ViewTouchEvent;
  touchmove: ViewTouchEvent;
  touchcancel: ViewTouchEvent;
}

/**
 * Type for a view event name
 */
export type ViewEventByName<T extends string> =
  T extends keyof ViewInteractionEventMap ? ViewInteractionEventMap[T] : Event;

/**
 * Enum of supported types for a view rectangle param
 */
export enum ViewRectangleParamType {
  DECIMAL_PERCENTAGE = 'DECIMAL_PERCENTAGE',
  PIXELS = 'PIXELS',
  PERCENTAGE = 'PERCENTAGE',
  VIEWPORT_WIDTH = 'VIEWPORT_WIDTH',
  VIEWPORT_HEIGHT = 'VIEWPORT_HEIGHT',
}

/**
 * A view rectangle parameter with a type and value
 */
export type ViewRectangleParam = {
  value: number;
  type: ViewRectangleParamType;
};

/**
 * A ViewParam, which can either be a:
 * - decimal percentage (passthrough)
 * - number of pixels given by a string '[n]px'
 * - percentage of the dom container given by a string '[n]%'
 * - percentage of the screen size given by '[n]vw' or '[n]vh'
 */
export type ViewRectangleParamInput = (string | number) | ViewRectangleParam;

/**
 * Planes that a view rectangle param can be on
 */
export enum ViewRectangleParamPlane {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

/**
 * ViewRectangleParams provides parameters for a view rectangle
 */
export type ViewRectangleParams = {
  top?: ViewRectangleParamInput;
  bottom?: ViewRectangleParamInput;
  left?: ViewRectangleParamInput;
  right?: ViewRectangleParamInput;
  width?: ViewRectangleParamInput;
  height?: ViewRectangleParamInput;
};

/**
 * The size of a view in pixels
 */
export type ViewSize = {
  left: number;
  bottom: number;
  width: number;
  height: number;
};

/**
 * A view rectangle given by decimal percentage values
 */
export type ViewRectangle = {
  left: number;
  bottom: number;
  width: number;
  height: number;
};

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
  abstract camera: Camera;

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

    const distance = this.camera.three
      .getWorldPosition(position)
      .distanceTo(tempTarget);

    if (this.camera.three instanceof OrthographicCamera) {
      return {
        width: width / this.camera.three.zoom,
        height: height / this.camera.three.zoom,
        factor: 1,
        distance,
        aspect,
      };
    }
    const fov = (this.camera.three.fov * Math.PI) / 180; // convert vertical fov to radians
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
      top: getDecimalPercentage(params.top, ViewRectangleParamPlane.VERTICAL),
      bottom: getDecimalPercentage(
        params.bottom,
        ViewRectangleParamPlane.VERTICAL
      ),
      height: getDecimalPercentage(
        params.height,
        ViewRectangleParamPlane.VERTICAL
      ),
      left: getDecimalPercentage(
        params.left,
        ViewRectangleParamPlane.HORIZONTAL
      ),
      right: getDecimalPercentage(
        params.right,
        ViewRectangleParamPlane.HORIZONTAL
      ),
      width: getDecimalPercentage(
        params.width,
        ViewRectangleParamPlane.HORIZONTAL
      ),
    };

    return viewParamDecimalsToViewRectangle(decimalViewParams);
  }
}
