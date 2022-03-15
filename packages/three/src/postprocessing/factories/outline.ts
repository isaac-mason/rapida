import { OutlineEffect as OutlineEffectImpl } from 'postprocessing';
import { Camera, Object3D, Scene } from 'three';

type ExtraParams = Partial<{
  selection: Object3D | Object3D[];
  selectionLayer: number;
}>;

const wrapEffect =
  <C extends new (...args: any[]) => OutlineEffectImpl>(effectImpl: C) =>
  (
    scene: Scene,
    camera: Camera,
    { ...params }: ExtraParams & ConstructorParameters<C>[2]
  ) => {
    const effect: OutlineEffectImpl = new effectImpl(scene, camera, params);

    return effect;
  };

const WrappedOutline = wrapEffect(OutlineEffectImpl);

export const OutlineEffect = (
  scene: Scene,
  camera: Camera,
  params: Parameters<typeof WrappedOutline>[2]
): OutlineEffectImpl => {
  const effect = WrappedOutline(scene, camera, params);

  if (params.selection) {
    effect.setSelection(
      Array.isArray(params.selection) ? params.selection : [params.selection]
    );
  }

  if (params.selectionLayer) {
    effect.selectionLayer = params.selectionLayer;
  }

  return effect;
};
