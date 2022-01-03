import {
  SSAOEffect as SSAOEffectImpl,
  BlendFunction,
  NormalPass,
} from 'postprocessing';
import { Camera } from 'three';

// first two args are camera and texture
type SSAOParams = ConstructorParameters<typeof SSAOEffectImpl>[2];

export const SSAOEffect = (
  camera: Camera,
  normalPass: NormalPass,
  props: SSAOParams
): SSAOEffectImpl => {
  return new SSAOEffectImpl(camera, normalPass.renderTarget.texture, {
    blendFunction: BlendFunction.MULTIPLY,
    samples: 30,
    rings: 4,
    distanceThreshold: 1.0,
    distanceFalloff: 0.0,
    rangeThreshold: 0.5,
    rangeFalloff: 0.1,
    luminanceInfluence: 0.9,
    radius: 20,
    scale: 0.5,
    bias: 0.5,
    intensity: 1.0,
    color: null,
    ...props,
  });
};
