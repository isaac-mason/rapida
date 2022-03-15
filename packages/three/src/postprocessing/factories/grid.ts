import { GridEffect as GridEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';
import { BlendFunction } from '../types';

export const GridEffect = wrapBasicEffect(GridEffectImpl, BlendFunction.OVERLAY);
