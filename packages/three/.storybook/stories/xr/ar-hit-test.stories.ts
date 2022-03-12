import World, { Component } from '@rapidajs/recs';
import { useEffect } from '@storybook/client-api';
import {
  AmbientLight,
  CylinderGeometry,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
  XRHitTestSource,
} from 'three';
import { ARButton } from 'three-stdlib/webxr/ARButton';
import { XRRenderer, XRRendererMode } from '../../../src';

export default {
  title: 'XR / AR Hit Test',
};

export const ARHitTest = () => {
  useEffect(() => {
    const world = new World();

    const space = world.create.space();

    const scene = new Scene();

    const camera = new PerspectiveCamera(70, 1, 0.01, 20);
    camera.position.set(0, 0, 500);

    const renderer =  new XRRenderer({
      mode: XRRendererMode.AR,
      camera,
      scene,
      renderer: new WebGLRenderer({ antialias: true }),
    });
    document.getElementById('renderer-root').appendChild(renderer.domElement);

    renderer.domElement.appendChild(
      ARButton.createButton(renderer.three, {
        requiredFeatures: ['hit-test'],
      })
    );

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new Vector3(0, 0, 0));
    scene.add(ambientLight);

    // controller
    const controller = renderer.three.xr.getController(0);
    scene.add(controller);

    // hit test indicator handling
    class HitTestIndicator extends Component {
      reticle: Mesh;
      private hitTestSource = null;
      private hitTestSourceRequested = false;

      onInit() {
        
      };
    }

    // space.create.entity().addComponent(HitTestIndicator);

    world.init();

    let hitTestSource: XRHitTestSource | null = null;
    let hitTestSourceRequested = false;

    const reticle = new Mesh(
      new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    const geometry = new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(
      0,
      0.1,
      0
    );

    controller.addEventListener('select', () => {
      if (reticle.visible) {
        const material = new MeshPhongMaterial({
          color: 0xffffff * Math.random(),
        });
        const mesh = new Mesh(geometry, material);
        mesh.position.setFromMatrixPosition(reticle.matrix);
        mesh.scale.y = Math.random() * 2 + 1;
        scene.add(mesh);
      }
    });

    renderer.onFrame((event) => {
      const referenceSpace = renderer.three.xr.getReferenceSpace();
      const session = renderer.three.xr.getSession();

      if (hitTestSourceRequested === false) {
        session.requestReferenceSpace('viewer').then((referenceSpace) => {
          session
            .requestHitTestSource({ space: referenceSpace })
            .then((source) => {
              hitTestSource = source;
            });
        });

        session.addEventListener('end', () => {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        const hitTestResults = event.data.frame.getHitTestResults(
          hitTestSource
        );

        if (hitTestResults.length) {
          const hit = hitTestResults[0];

          reticle.visible = true;
          reticle.matrix.fromArray(
            hit.getPose(referenceSpace).transform.matrix
          );
        } else {
          reticle.visible = false;
        }
      }
    });

    renderer.setAnimationLoop((delta, time) => {
      world.update(delta)
    });
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
