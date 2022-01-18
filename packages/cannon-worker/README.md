![Imgur](https://imgur.com/FpBsJPL.jpg)

# cannon-worker

**Note: See this issue to track progress of the creation of an "official" `cannon-worker` package - https://github.com/pmndrs/use-cannon/issues/327**

`cannon-worker` makes adding physics to your three.js scenes easy!

- [x] Doesn't block the main thread, runs in a web worker
- [x] Supports instancing out of the box
- [x] Least amount of friction you'll ever experience with a physics rig ... 🙈

## How it works

1. Get all the imports that you need.

```js
import { CannonWorker } from 'use-cannon'
import { Mesh, BoxGeometry, MeshBasicMaterial, ... } from 'three'
```

2. Create a physics world.

```js
const cannon = new CannonWorker({
  gravity: [0, -10, 0],
})
```

3. Create a three object, it could be a mesh, line, gltf, anything.

```js
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial()
const boxMesh = new Mesh(geometry, material)
```

4. Pick a shape that suits your objects contact surface, it could be a box, plane, sphere, etc. Give it a mass, too. Then also provide the three object.

```js
const { api } = cannon.create.box(() => {
  mass: 1,
}, boxMesh);
```

5. You can interact with it by using the api, which lets you apply positions, rotations, velocities, forces and impulses.

```js
api.position.set(Math.sin(clock.getElapsedTime()) * 5, 0, 0));
```

6. You can use the body api to subscribe to properties to get updates on each physics step.

```js
const unsubscribe = api.velocity.subscribe((velocity) => console.log(velocity))
```
