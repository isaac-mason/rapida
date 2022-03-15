import { BlendFunction, BloomEffect as BloomEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const BloomEffect = wrapBasicEffect(BloomEffectImpl, BlendFunction.SCREEN);
