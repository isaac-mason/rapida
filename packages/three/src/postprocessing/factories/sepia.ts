import { SepiaEffect as SepiaEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const SepiaEffect = wrapBasicEffect(SepiaEffectImpl);
