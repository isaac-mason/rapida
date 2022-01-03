import { NoiseEffect as NoiseEffectImpl, BlendFunction } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const NoiseEffect = wrapBasicEffect(
  NoiseEffectImpl,
  BlendFunction.COLOR_DODGE
);
