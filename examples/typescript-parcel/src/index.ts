import { Component, Engine, Scene, World } from "@rapidajs/rapida";
import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, Vector3 } from "three";

class SpinningCube extends Component {
  mesh: Mesh;

  scene: Scene;

  constructor({ scene }: { scene: Scene }) {
    super();
    this.scene = scene;

    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshPhongMaterial();
    this.mesh = new Mesh(geometry, material);
  }

  onInit = () => {
    this.scene.add(this.mesh);
  }

  onUpdate = (_t: number) => {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  } 
}

const engine = new Engine();

engine.run((ctx) => {
  const world = new World({ engine: ctx.engine });

  const renderer = world.create.renderer.webgl({ domElementId: "rapida" });

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

  space.create.entity().addComponent(new SpinningCube({ scene }));

  return world;
});
