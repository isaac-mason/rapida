import {
  ViewRectangle,
  ViewRectangleParam,
  ViewRectangleParamInput,
  ViewRectangleParamPlane,
  ViewRectangleParamType,
} from './view';

/**
 * Converts a view param input to a view param
 * @param value the view param input
 * @returns the interpreted ViewRectangleParam
 */
const convertViewParamInputToViewParam = (
  value: ViewRectangleParamInput
): ViewRectangleParam => {
  // check if value can be passed through
  if (typeof value === 'object' && value.value && value.type) {
    return value;
  }

  // decimal percentage
  if (typeof value === 'number') {
    return {
      value,
      type: ViewRectangleParamType.DECIMAL_PERCENTAGE,
    };
  }
  // string
  if (typeof value === 'string') {
    // pixels
    if (/[0-9]*\.?[0-9]+(px)/.test(value)) {
      // extract the pixels value and return the number
      return {
        value: Number(value.replace('px', '')),
        type: ViewRectangleParamType.PIXELS,
      };
    }

    // percentage of dom container
    if (/[0-9]*\.?[0-9]+(%)/.test(value)) {
      return {
        value: Number(value.replace('%', '')),
        type: ViewRectangleParamType.PERCENTAGE,
      };
    }

    // percentage of viewport width
    if (/[0-9]*\.?[0-9]+(vw)/.test(value)) {
      return {
        value: Number(value.replace('vw', '')),
        type: ViewRectangleParamType.VIEWPORT_WIDTH,
      };
    }

    // percentage of viewport height
    if (/[0-9]*\.?[0-9]+(vh)/.test(value)) {
      return {
        value: Number(value.replace('vh', '')),
        type: ViewRectangleParamType.VIEWPORT_HEIGHT,
      };
    }
  }

  throw new Error(`unsupported view param given - '${value}''`);
};

/**
 * Returns a decimal percentage from a view parameter value
 * @param value the ViewParam value
 * @param horizontal whether the value is for the x plane
 * @param width the width of the dom container
 * @param height the height of the dom container
 *
 * @returns the decimal percentage value derived from the given view param and the renderer and viewport size
 */
const decimalPercentageFromViewParam = (
  value: ViewRectangleParam,
  plane: ViewRectangleParamPlane,
  ctx: {
    rendererWidth: number;
    rendererHeight: number;
    viewportWidth: number;
    viewportHeight: number;
  }
): number => {
  const rendererLength =
    plane === ViewRectangleParamPlane.HORIZONTAL
      ? ctx.rendererWidth
      : ctx.rendererHeight;

  // decimal percentage
  if (value.type === ViewRectangleParamType.DECIMAL_PERCENTAGE) {
    return value.value;
  }

  // pixels
  if (value.type === ViewRectangleParamType.PIXELS) {
    // extract the pixels value and return the number
    return value.value / rendererLength;
  }

  // percentage of dom container
  if (value.type === ViewRectangleParamType.PERCENTAGE) {
    return value.value / 100;
  }

  // percentage of viewport width
  if (value.type === ViewRectangleParamType.VIEWPORT_WIDTH) {
    const decimalPercentage = value.value / 100;
    return (decimalPercentage * ctx.viewportWidth) / ctx.rendererWidth;
  }

  // percentage of viewport height
  if (value.type === ViewRectangleParamType.VIEWPORT_HEIGHT) {
    const decimalPercentage = value.value / 100;
    return (decimalPercentage * ctx.viewportHeight) / ctx.rendererHeight;
  }

  throw new Error(`unsupported view param given - '${value}''`);
};

/**
 * Gets a view rectangles plane values from given view param plane values
 * If fromStart is undefined, the return fromStart will be 0
 * If both fromEnd and length are undefined, the return length value will be 1
 *
 * @param v the values for the plane
 * @param v.fromStart the start value - i.e. left / bottom
 * @param v.fromEnd the end value - i.e. right / top
 * @param v.length the length - i.e. width / height
 *
 * @returns the fromStart and length value for the present values
 */
const viewParamPlaneToViewRectPlane = (v: {
  fromStart: number | undefined;
  fromEnd: number | undefined;
  length: number | undefined;
}): { fromStart: number; length: number } => {
  const res = { fromStart: 0, length: 1 };

  if (v.fromStart !== undefined && v.fromEnd !== undefined) {
    const fromStartPercentage = v.fromStart;
    const fromEndPercentage = 1 - v.fromEnd;
    res.fromStart = fromStartPercentage;
    res.length = fromEndPercentage - fromStartPercentage;
  } else if (v.fromStart !== undefined) {
    res.fromStart = v.fromStart;
  } else if (v.fromEnd !== undefined) {
    res.fromStart = 1 - v.fromEnd;
  }

  if (v.length !== undefined) {
    res.length = v.length;

    if (v.fromEnd !== undefined) {
      res.fromStart -= res.length;
    }
  }

  return res;
};

/**
 * Converts view param decimals to a view rectangle.
 * @param param the decimal percentage view params
 * @returns the view rectangle for the view params
 */
const decimalViewParamsToViewRectangle = ({
  bottom,
  top,
  height,
  left,
  right,
  width,
}: {
  bottom?: number;
  top?: number;
  height?: number;
  left?: number;
  right?: number;
  width?: number;
}): ViewRectangle => {
  const viewRectangle: ViewRectangle = {
    bottom: 0,
    left: 0,
    width: 1,
    height: 1,
  };

  if (
    bottom !== undefined &&
    height !== undefined &&
    left !== undefined &&
    width !== undefined
  ) {
    return {
      bottom,
      height,
      left,
      width,
    };
  }

  const vertical = viewParamPlaneToViewRectPlane({
    fromStart: bottom,
    fromEnd: top,
    length: height,
  });
  const horizontal = viewParamPlaneToViewRectPlane({
    fromStart: left,
    fromEnd: right,
    length: width,
  });

  viewRectangle.bottom = vertical.fromStart;
  viewRectangle.height = vertical.length;
  viewRectangle.left = horizontal.fromStart;
  viewRectangle.width = horizontal.length;

  return viewRectangle;
};

export {
  convertViewParamInputToViewParam,
  decimalPercentageFromViewParam,
  decimalViewParamsToViewRectangle as viewParamDecimalsToViewRectangle,
};
