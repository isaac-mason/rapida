# @rapidajs/three

`@rapidajs/three` is a javascript package that provides some utilities for three.js

- [x] Simple API for handling multiple views within renderers
- [x] Post processing effects
- [x] Loaders for assets

**rapida is under active alpha development and is not yet battle-tested and stable. We don't recommend using rapida in production just yet, but watch this space!**

## Installation

To get started install `@rapidajs/three` and `three`.

```bash
> yarn add @rapidajs/three three
```

`@rapidajs/three` currently cannot be used without a bundler. A basic example of using `@rapidajs/three` with parcel can be found here: https://gitlab.com/rapidajs/rapida-typescript-parcel/-/blob/main/package.json

Visit the [rapidajs website](https://rapida.isaacmason.com/) for documentation and examples.

## Example Usage

Let's use `@rapidajs/three` to create a view with postprocessing effects.

1. Gather necessary imports

```ts
import { Effects, WebGLRenderer } from '@rapidajs/three';
import { Scene, PerspectiveCamera } from 'three';
```

2. Create a @rapidajs/three webgl renderer and append it to the dom

```ts
const renderer = new WebGLRenderer();
document.getElementById('app').appendChild(renderer.domElement);
```

3. Create a scene

```ts
const scene = new Scene();
```

4. Create a camera and a view

```ts
const camera = new PerspectiveCamera();
const view = renderer.create.view({
  scene,
  camera,
  useEffectComposer: true, // make sure to include `useEffectComposer: true`
});
```

5. Add a post processing effect with `Effects`

```ts
view.composer.add.effects(Effects.bloom({ ... bloom effect params ... }));
```

6. Render your scene

```ts
renderer.render(timeElapsed);
```
