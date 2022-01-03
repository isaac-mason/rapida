import { ColorDepthEffect as ColorDepthEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const ColorDepthEffect = wrapBasicEffect(ColorDepthEffectImpl);
