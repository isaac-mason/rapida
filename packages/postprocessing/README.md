# @rapidajs/postprocessing

`@rapidajs/postprocessing` is a thin wrapper around [vanruesc/postprocessing](https://github.com/vanruesc/postprocessing) with typed methods for creating effects. This package is used in `@rapidajs/rapida`, but can also be used standalone.

---

**rapida is under active alpha development and is not yet battle-tested and stable. We don't recommend using rapida in production just yet, but watch this space!**

---

See the `vanruesc/postprocessing` docs for more documentation on the post processing effects included in this package - [`vanruesc/postprocessing`](https://vanruesc.github.io/postprocessing/public/docs/)

Over time this package will become simpler - this primarily hinges on types being added to `vanruesc/postprocessing`.

## Usage with `@rapidajs/three`

Install `@rapidajs/three`, `three` and this package:

```
$ yarn add @rapidajs/three @rapidajs/postprocessing three
```

Use `@rapidajs/postprocessing` to add post processing effects to rapida views

1. Gather necessary imports

```ts
import { WebGLRenderer } from '@rapidajs/three';
import { Scene, PerspectiveCamera } from 'three';
import { Effects } from '@rapidajs/postprocessing';
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
