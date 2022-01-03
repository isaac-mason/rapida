import { VignetteEffect as VignetteEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const VignetteEffect = wrapBasicEffect(VignetteEffectImpl);
