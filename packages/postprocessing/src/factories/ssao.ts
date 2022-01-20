import {
  SSAOEffect as SSAOEffectImpl,
  BlendFunction,
  NormalPass,
} from 'postprocessing';
import { Camera } from 'three';

const wrapEffect =
  <C extends new (...args: any[]) => SSAOEffectImpl>(effectImpl: C) =>
  (
    camera: Camera,
    normalPass: NormalPass,
    { ...params }: ConstructorParameters<C>[2]
  ) => {
    const effect: SSAOEffectImpl = new effectImpl(
      camera,
      normalPass.renderTarget,
      params
    );

    return effect;
  };

const WrappedSSAO = wrapEffect(SSAOEffectImpl);

export const SSAOEffect = (
  camera: Camera,
  normalPass: NormalPass,
  props: Parameters<typeof WrappedSSAO>[2]
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
