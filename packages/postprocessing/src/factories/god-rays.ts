import { GodRaysEffect as GodRaysEffectImpl } from 'postprocessing';
import { Camera, Mesh, Points } from 'three';

const wrapEffect =
  <C extends new (...args: any[]) => GodRaysEffectImpl>(effectImpl: C) =>
  (
    camera: Camera,
    sun: Mesh | Points,
    { ...params }: ConstructorParameters<C>[2]
  ) => {
    const effect: GodRaysEffectImpl = new effectImpl(camera, sun, params);
    return effect;
  };

const WrappedGodRays = wrapEffect(GodRaysEffectImpl);

export const GodRaysEffect = (
  camera: Camera,
  sun: Mesh | Points,
  params: Parameters<typeof WrappedGodRays>[2]
): GodRaysEffectImpl => {
  return WrappedGodRays(camera, sun, params);
};
