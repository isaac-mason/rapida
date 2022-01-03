import { BrightnessContrastEffect as BrightnessContrastEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const BrightnessContrastEffect = wrapBasicEffect(
  BrightnessContrastEffectImpl
);
