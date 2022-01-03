import { DepthOfFieldEffect as DepthOfFieldEffectImpl } from 'postprocessing';
import { Vector3, Texture, Camera } from 'three';

type ExtraParams = Partial<{
  target?: Vector3;
  depthTexture?: {
    texture: Texture;
    packing: number;
  };
}>;

const wrapEffect =
  <C extends new (...args: any[]) => DepthOfFieldEffectImpl>(effectImpl: C) =>
  (
    camera: Camera,
    { ...params }: ExtraParams & ConstructorParameters<C>[1]
  ) => {
    const effect: DepthOfFieldEffectImpl = new effectImpl(camera, params);

    return effect;
  };

const WrappedDOF = wrapEffect(DepthOfFieldEffectImpl);

export const DepthOfFieldEffect = (
  camera: Camera,
  params: Parameters<typeof WrappedDOF>[1]
): DepthOfFieldEffectImpl => {
  const { target, depthTexture, ...rest } = params;
  const effect = WrappedDOF(camera, rest);

  if (target) {
    effect.target = target;
  }

  if (depthTexture) {
    effect.setDepthTexture(depthTexture.texture, depthTexture.packing);
  }

  return effect;
};
