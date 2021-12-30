import {
  Cache,
  FileLoader,
  Group,
  ImageLoader,
  Texture,
  TextureLoader,
} from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';

const DEFAULT_DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/v1/decoders/';

/**
 * Params for creating Loaders
 */
export type LoadersParams = {
  /**
   * An optional draco decoder path. Defaults to using a CDN - https://www.gstatic.com/draco/v1/decoders/
   * @see docs https://threejs.org/docs/#examples/en/loaders/DRACOLoader
   */
  dracoDecoderPath?: string;
};
/**
 * Loaders methods providing loaders for various asset types
 */
export class Loaders {
  private cache: typeof Cache;

  private _fileLoader!: FileLoader;

  private _imgLoader!: ImageLoader;

  private _svgLoader!: SVGLoader;

  private _textureLoader!: TextureLoader;

  private _fbxLoader!: FBXLoader;

  private _gltfLoader!: GLTFLoader;

  private dracoDecoderPath: string;

  constructor(params?: LoadersParams) {
    this.cache = Cache;
    Cache.enabled = true;
    this.dracoDecoderPath =
      params?.dracoDecoderPath || DEFAULT_DRACO_DECODER_PATH;
  }

  private get fileLoader() {
    if (!this._fileLoader) this._fileLoader = new FileLoader();
    return this._fileLoader;
  }

  private get imageLoader() {
    if (!this._imgLoader) {
      this._imgLoader = new ImageLoader();
    }
    return this._imgLoader;
  }

  private get svgLoader() {
    if (!this._svgLoader) {
      this._svgLoader = new SVGLoader();
    }
    return this._svgLoader;
  }

  private get textureLoader() {
    if (!this._textureLoader) {
      this._textureLoader = new TextureLoader();
    }
    return this._textureLoader;
  }

  private get gltfLoader() {
    if (!this._gltfLoader) {
      this._gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(this.dracoDecoderPath);
      this._gltfLoader.setDRACOLoader(dracoLoader);
    }
    return this._gltfLoader;
  }

  private get fbxLoader() {
    if (!this._fbxLoader) {
      this._fbxLoader = new FBXLoader();
    }
    return this._fbxLoader;
  }

  /**
   * A map of friendly alias names to urls for preloaded resources
   */
  private preloadAliases = new Map<string, string>();

  /**
   * Pre loads a resource
   * @param key the friendly name that will be a key for the resource
   * @param url the url for the resource
   * @returns a promise for preloading the resource
   */
  async preload(key: string, url: string): Promise<any> {
    this.preloadAliases.set(key, url);

    return new Promise((resolve) => {
      const isModel = /\.fbx$|\.glb$|\.gltf$/.test(url);
      const isTexture = /\.jpe?g$|\.png$/.test(url);

      if (isTexture) {
        this.textureLoader.load(url, (texture) => {
          return resolve(texture);
        });
      } else {
        if (isModel) this.fileLoader.setResponseType('arraybuffer');
        this.fileLoader.load(url, (file) => {
          return resolve(file);
        });
      }
    });
  }

  /**
   * Loads an image
   * @param url the url or key for the image
   * @returns a promise for a HTMLImageElement
   */
  image(url: string): Promise<HTMLImageElement> {
    const key = this.preloadAliases.get(url);
    url = key || url;

    return new Promise((resolve) => {
      this.imageLoader.load(url, (image) => {
        return resolve(image);
      });
    });
  }

  /**
   * Loads a file
   * @param url the url or key for the file
   * @returns a promise for a string or arraybuffer for the file
   */
  file(url: string): Promise<string | ArrayBuffer> {
    const key = this.preloadAliases.get(url);
    url = key || url;

    return new Promise((resolve) => {
      this.fileLoader.load(url, (file) => {
        return resolve(file);
      });
    });
  }

  /**
   * Loads an SVG
   * @param url the url or key for the svg
   * @returns a promise for the SVGResult
   */
  svg(url: string): Promise<SVGResult> {
    const key = this.preloadAliases.get(url);
    url = key || url;

    return new Promise((resolve) => {
      this.svgLoader.load(url, (svg) => {
        return resolve(svg);
      });
    });
  }

  /**
   * Loads a three texture
   * @param url the url or key for the texture
   * @returns a promise for the texture
   */
  texture(url: string, textureAnisotropy = 1): Promise<Texture> {
    const isBase64 = /^data:image\/[\S]+;base64,/gm.test(url);

    // we do not want to cache base64 images
    if (!isBase64) {
      const key = this.preloadAliases.get(url);
      url = key || url;
    }

    return new Promise((resolve) => {
      this.textureLoader.load(url, (texture: Texture) => {
        texture.anisotropy = textureAnisotropy;
        texture.needsUpdate = true;

        resolve(texture);
      });
    });
  }

  /**
   * Loads a GLTF model
   * @param url the url or key for the GLTF
   * @returns a promise for the GLTF
   */
  gltf(url: string): Promise<GLTF> {
    const value = this.preloadAliases.get(url);
    url = value || url;

    return new Promise((resolve) => {
      this.gltfLoader.load(url, (gltf: GLTF) => {
        resolve(gltf);
      });
    });
  }

  /**
   * Loads an FBX model
   * @param url the url of key for the FBX
   * @returns a promise for the FBX
   */
  fbx(url: string): Promise<Group> {
    const key = this.preloadAliases.get(url);
    url = key || url;

    return new Promise((resolve) => {
      this.fbxLoader.load(url, (fbx: Group) => {
        resolve(fbx);
      });
    });
  }
}
