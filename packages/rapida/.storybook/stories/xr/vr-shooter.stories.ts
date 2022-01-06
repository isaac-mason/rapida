import { BodyType } from '@rapidajs/cannon-worker';
import { useEffect } from '@storybook/client-api';
import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  RingGeometry,
  SphereBufferGeometry,
  Vector3
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import rapida, { XRRendererMode } from '../../../src';

export default {
  title: 'XR / VR Shooter',
};

export const VRShooter = () => {
  useEffect(() => {
    const engine = rapida.engine({ debug: true });

    const world = rapida.world();

    const scene = world.create.scene();

    const camera = world.create.camera();
    camera.position.set(0, 20, 20);
    camera.three.lookAt(0, 0, 0);

    const renderer = world.create.renderer.xr({
      mode: XRRendererMode.VR,
      camera,
      scene,
      appendButton: true,
    });
    document.getElementById('renderer-root').appendChild(renderer.domElement);

    new OrbitControls(camera.three, renderer.domElement);

    // add lights
    const directionalLight = new DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new Vector3(0, 0, 0));
    scene.add(ambientLight);

    // create physics instance
    const physics = world.create.physics({
      gravity: [0, -10, 0],
    });

    // create room
    const room = new LineSegments(
      new BoxGeometry(6, 6, 6, 10, 10, 10),
      new LineBasicMaterial({ color: 0x808080 })
    );
    room.geometry.translate(0, 3, 0);
    scene.add(room);

    const walls: {
      args: [number, number, number];
      position: [number, number, number];
      rotation: [number, number, number];
    }[] = [
      // bottom
      {
        args: [6, 0.3, 6],
        position: [0, -0.15, 0],
        rotation: [0, 0, 0],
      },
      // top
      {
        args: [6, 0.3, 6],
        position: [0, 6.15, 0],
        rotation: [0, 0, 0],
      },
      // back wall
      {
        args: [6, 6, 0.3],
        position: [0, 3, 3.15],
        rotation: [0, 0, 0],
      },
      // front wall
      {
        args: [6, 6, 0.3],
        position: [0, 3, -3.15],
        rotation: [0, 0, 0],
      },
      // left wall
      {
        args: [0.3, 6, 6],
        position: [-3.15, 3, 0],
        rotation: [0, 0, 0],
      },
      // right wall
      {
        args: [0.3, 6, 6],
        position: [3.15, 3, 0],
        rotation: [0, 0, 0],
      },
    ];

    walls.forEach((w) => {
      physics.create.box({
        type: BodyType.STATIC,
        args: w.args,
        position: w.position,
        rotation: w.rotation,
        mass: 0,
        material: {
          friction: 0.0,
          restitution: 0.3,
        },
      });
    });

    // set up controllers
    const controllerModelFactory = new XRControllerModelFactory();
    const setupController = (index: number): Group => {
      const controller = renderer.three.xr.getController(index);
      const controllerGrip = renderer.three.xr.getControllerGrip(index);

      // fire a sphere on select event
      controller.addEventListener('selectstart', (e) => {
        const sphere = new Mesh(
          new SphereBufferGeometry(0.1),
          new MeshLambertMaterial()
        );

        const velocity = new Vector3();
        velocity.x = (Math.random() - 0.5) * 2;
        velocity.y = (Math.random() - 0.5) * 2;
        velocity.z = Math.random() - 15;
        velocity.applyQuaternion(controller.quaternion);

        const { api: sphereApi } = physics.create.sphere(
          {
            args: 0.1,
            position: [
              controller.position.x,
              controller.position.y,
              controller.position.z,
            ],
            rotation: [0, 0, 0],
            velocity: [velocity.x, velocity.y, velocity.z],
            type: BodyType.DYNAMIC,
            mass: 1,
          },
          sphere
        );
        scene.add(sphere);

        setTimeout(() => {
          scene.remove(sphere);
          sphereApi.destroy();
        }, 30000);
      });

      controller.addEventListener('connected', (e) => {
        // add controller ray indicator
        controller.add(
          ((): Mesh => {
            if (e.data.targetRayMode === 'tracked-pointer') {
              const geometry = new BufferGeometry();
              geometry.setAttribute(
                'position',
                new Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
              );
              geometry.setAttribute(
                'color',
                new Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
              );

              const material = new LineBasicMaterial({
                vertexColors: true,
                blending: AdditiveBlending,
              });

              return new Mesh(geometry, material);
            } else if (e.data.targetRayMode === 'gaze') {
              const geometry = new RingGeometry(0.02, 0.04, 32).translate(
                0,
                0,
                -1
              );
              const material = new MeshBasicMaterial({
                opacity: 0.5,
                transparent: true,
              });
              return new Mesh(geometry, material);
            }
          })()
        );

        // add controller model
        controllerGrip.add(
          controllerModelFactory.createControllerModel(controllerGrip)
        );
        scene.add(controllerGrip);

        // handle controller disconnect
        controller.addEventListener('disconnected', () => {
          scene.remove(controllerGrip);
        });
      });

      return controller;
    };

    setupController(0);
    setupController(1);

    engine.start(world);

    return () => engine.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};
