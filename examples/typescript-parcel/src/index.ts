import { Component, Engine, Scene, World, Physics, BodyType } from "@rapidajs/rapida";
import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, Vector3 } from "three";

class SpinningCube extends Component {
  mesh: Mesh;

  scene: Scene;

  physics: Physics;

  constructor(params: { scene: Scene, physics: Physics }) {
    super();
    this.scene = params.scene;
    this.physics = params.physics;

    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshPhongMaterial();
    this.mesh = new Mesh(geometry, material);

    this.physics.create.box({
      size: [10, 10, 10],
      mass: 1,
      type: BodyType.DYNAMIC,
      rotation: [0, 0, 0],
      fixedRotation: false,
      allowSleep: false,
      angularVelocity: [1, 1, 1],
      velocity: [0, 20, 0],

    }, this.mesh);
  }

  onInit = () => {
    this.scene.add(this.mesh);
  }
}

const engine = new Engine();

engine.run((ctx) => {
  const world = new World({ engine: ctx.engine });

  const renderer = world.create.renderer.webgl();
  document.getElementById('rapida').appendChild(renderer.domElement);

  const physics = world.create.physics({
    gravity: [0, -5, 0],
  });

  physics.create.plane({
    type: BodyType.STATIC,
    position: [0, -10, 0],
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
    material: {
      friction: 0.0,
      restitution: 0.3,
    },
  });

  const scene = world.create.scene();

  const camera = world.create.camera();
  camera.position.z = 100;

  renderer.create.view({
    scene,
    camera,
  });

  const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

  const space = world.create.space();

  space.create.entity().addComponent(new SpinningCube({ scene, physics }));

  return world;
});
