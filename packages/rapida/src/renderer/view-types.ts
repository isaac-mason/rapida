import { Event } from '@rapidajs/rapida-common';

/**
 * All supported view interaction events
 */
export type ViewInteractionEventName =
  | 'click'
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'mouseenter'
  | 'mouseleave'
  | 'mouseout'
  | 'mouseover'
  | 'touchstart'
  | 'touchend'
  | 'touchmove'
  | 'touchcancel';

export const VIEW_ALL_EVENT_NAMES: ViewInteractionEventName[] = [
  'click',
  'mousemove',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'mouseout',
  'mouseover',
  'touchstart',
  'touchend',
  'touchmove',
  'touchcancel',
];

export const VIEW_MOUSE_EVENTS: string[] = [
  'click',
  'mousemove',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'mouseout',
  'mouseover',
];

export const VIEW_TOUCH_EVENTS: string[] = [
  'touchstart',
  'touchend',
  'touchmove',
  'touchcancel',
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
 * Supported types for a view rectangle param
 */
export type ViewRectangleParamType =
  | 'DECIMAL_PERCENTAGE'
  | 'PIXELS'
  | 'PERCENTAGE'
  | 'VIEWPORT_WIDTH'
  | 'VIEWPORT_HEIGHT';

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
export type ViewRectangleParamPlane = 'HORIZONTAL' | 'VERTICAL';

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
