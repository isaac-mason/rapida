# @rapidajs/postprocessing

`@rapidajs/postprocessing` is a thin wrapper around [vanruesc/postprocessing](https://github.com/vanruesc/postprocessing) with typed methods for creating effects. This package is used in `@rapidajs/rapida`, but can also be used standalone. 

---

**rapida is under active alpha development and is not yet battle-tested and stable. We don't recommend using rapida in production just yet, but watch this space!**

---

See the `vanruesc/postprocessing` docs for more documentation on the post processing effects included in this package - [`vanruesc/postprocessing`](https://vanruesc.github.io/postprocessing/public/docs/)

Over time this package will become simpler - this primarily hinges on types being added to `vanruesc/postprocessing`. 

## Usage with rapida

Install `@rapidajs/rapida`, `three` and this package:

```
$ yarn add @rapidajs/rapida @rapidajs/postprocessing three
```

Use `@rapidajs/postprocessing` to add post processing effects to rapida views

```ts
import rapida from `@rapidajs/rapida`;
import { Effects } from `@rapidajs/postprocessing`;

// create a new rapida engine
const engine = rapida.engine();

// create a new rapida world
const world = rapida.world();

// create a webgl renderer and append it to the dom
const renderer = world.create.renderer.webgl();
document.getElementById("rapida-root-div-element").appendChild(renderer.domElement);

// create a scene
const scene = world.create.scene();

// ... add lights and objects to your scene ...

// create a camera and a view
const camera = world.create.camera();
const view = renderer.create.view({
  scene,
  camera,
  useEffectComposer: true, // make sure to include `useEffectComposer: true`
});

// add a post processing effect with `Effects` 
view.composer.add.effects(Effects.bloom({ ... bloom effect params ... }));

// start the world
engine.start(world);
```
