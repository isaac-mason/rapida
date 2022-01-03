import {
  ScanlineEffect as ScanlineEffectImpl,
  BlendFunction,
} from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const ScanlineEffect = wrapBasicEffect(
  ScanlineEffectImpl,
  BlendFunction.OVERLAY
);
