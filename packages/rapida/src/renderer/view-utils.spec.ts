import { describe, expect, it } from '@jest/globals';
import { ViewRectangleParamPlane, ViewRectangleParamType } from './view-types';
import {
  convertViewParamInputToViewParam,
  decimalPercentageFromViewParam,
  viewParamDecimalsToViewRectangle,
} from './view-utils';

const ctx = {
  rendererWidth: 200,
  rendererHeight: 100,
  viewportWidth: 400,
  viewportHeight: 200,
};

describe('View Utils', () => {
  describe('convertViewParamInputToViewParam', () => {
    it(`should passthrough ViewRectangleParam`, () => {
      expect(
        convertViewParamInputToViewParam({
          value: 1,
          type: ViewRectangleParamType.PIXELS,
        })
      ).toEqual({
        value: 1,
        type: ViewRectangleParamType.PIXELS,
      });
    });

    it('should convert a decimal percentage', () => {
      expect(convertViewParamInputToViewParam(0.5)).toEqual({
        value: 0.5,
        type: ViewRectangleParamType.DECIMAL_PERCENTAGE,
      });
    });

    it('should convert pixels', () => {
      expect(convertViewParamInputToViewParam('20px')).toEqual({
        value: 20,
        type: ViewRectangleParamType.PIXELS,
      });
    });

    it('should convert percentages', () => {
      expect(convertViewParamInputToViewParam('20%')).toEqual({
        value: 20,
        type: ViewRectangleParamType.PERCENTAGE,
      });
    });

    it('should convert viewport width', () => {
      expect(convertViewParamInputToViewParam('20vw')).toEqual({
        value: 20,
        type: ViewRectangleParamType.VIEWPORT_WIDTH,
      });
    });

    it('should convert viewport height', () => {
      expect(convertViewParamInputToViewParam('20vh')).toEqual({
        value: 20,
        type: ViewRectangleParamType.VIEWPORT_HEIGHT,
      });
    });

    it('should throw an exception on an unsupported string value', () => {
      expect(() =>
        convertViewParamInputToViewParam('2malformed')
      ).toThrowError();
    });
  });

  describe('decimalPercentageFromViewParam', () => {
    it('should passthrough decimal percentage', () => {
      expect(
        decimalPercentageFromViewParam(
          {
            value: 0.5,
            type: ViewRectangleParamType.DECIMAL_PERCENTAGE,
          },
          ViewRectangleParamPlane.HORIZONTAL,
          ctx
        )
      ).toEqual(0.5);
    });

    it('should convert pixels percentage', () => {
      expect(
        decimalPercentageFromViewParam(
          {
            value: 50,
            type: ViewRectangleParamType.PIXELS,
          },
          ViewRectangleParamPlane.HORIZONTAL,
          ctx
        )
      ).toEqual(0.25);
    });

    it('should convert percentages', () => {
      expect(
        decimalPercentageFromViewParam(
          {
            value: 50,
            type: ViewRectangleParamType.PERCENTAGE,
          },
          ViewRectangleParamPlane.HORIZONTAL,
          ctx
        )
      ).toEqual(0.5);
    });

    it('should convert viewport width', () => {
      expect(
        decimalPercentageFromViewParam(
          {
            value: 25,
            type: ViewRectangleParamType.VIEWPORT_WIDTH,
          },
          ViewRectangleParamPlane.HORIZONTAL,
          ctx
        )
      ).toEqual(0.5);

      expect(
        decimalPercentageFromViewParam(
          {
            value: 25,
            type: ViewRectangleParamType.VIEWPORT_WIDTH,
          },
          ViewRectangleParamPlane.HORIZONTAL,
          ctx
        )
      ).toEqual(0.5);
    });

    it('should convert viewport height', () => {
      expect(
        decimalPercentageFromViewParam(
          {
            value: 25,
            type: ViewRectangleParamType.VIEWPORT_HEIGHT,
          },
          ViewRectangleParamPlane.VERTICAL,
          ctx
        )
      ).toEqual(0.5);
    });

    it('should throw an error on an unsupported type being given', () => {
      expect(() =>
        decimalPercentageFromViewParam(
          {
            value: 25,
            type: 'malformed' as ViewRectangleParamType,
          },
          ViewRectangleParamPlane.VERTICAL,
          ctx
        )
      ).toThrowError();
    });
  });

  describe('decimalViewParamsToViewRectangle', () => {
    it('should passthrough bottom, height, left, width', () => {
      expect(
        viewParamDecimalsToViewRectangle({
          bottom: 0,
          height: 1,
          left: 0,
          width: 1,
        })
      ).toEqual({
        bottom: 0,
        height: 1,
        left: 0,
        width: 1,
      });
    });

    it('should calculate correct rectangle from bottom, top, left, right', () => {
      expect(
        viewParamDecimalsToViewRectangle({
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
        })
      ).toEqual({
        bottom: 0,
        height: 1,
        left: 0,
        width: 1,
      });
      expect(
        viewParamDecimalsToViewRectangle({
          bottom: 0.1,
          top: 0.1,
          left: 0.1,
          right: 0.1,
        })
      ).toEqual({
        bottom: 0.1,
        height: 0.8,
        left: 0.1,
        width: 0.8,
      });
    });

    it('should calculate correct rectangle from bottom, height, left, right', () => {
      expect(
        viewParamDecimalsToViewRectangle({
          bottom: 0,
          height: 1,
          left: 0,
          right: 0,
        })
      ).toEqual({
        bottom: 0,
        height: 1,
        left: 0,
        width: 1,
      });
    });

    it('should calculate correct rectangle from top, height, right, width', () => {
      expect(
        viewParamDecimalsToViewRectangle({
          top: 0,
          height: 1,
          width: 1,
          right: 0,
        })
      ).toEqual({
        bottom: 0,
        height: 1,
        left: 0,
        width: 1,
      });
      expect(
        viewParamDecimalsToViewRectangle({
          top: 0.1,
          height: 0.9,
          width: 0.9,
          right: 0.1,
        })
      ).toEqual({
        bottom: 0,
        height: 0.9,
        width: 0.9,
        left: 0,
      });
    });
  });
});
