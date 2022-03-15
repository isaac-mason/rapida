import { DepthEffect as DepthEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const DepthEffect = wrapBasicEffect(DepthEffectImpl);
