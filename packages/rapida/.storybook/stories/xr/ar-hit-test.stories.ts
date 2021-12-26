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
  Vector3,
  WebGLRenderer,
} from 'three';
import { ARButton } from 'three-stdlib/webxr/ARButton';
import rapida, {
  Component,
  World,
  WorldProvider,
  XRRendererMode,
} from '../../../src';

export default {
  title: 'XR / AR Hit Test',
};

export const ARHitTest = () => {
  useEffect(() => {
    const R = rapida({ debug: true });

    R.run(({ engine }): World => {
      const world = new World({
        engine,
      });

      const space = world.create.space();

      const scene = world.create.scene();

      const camera = world.create.camera({
        camera: new PerspectiveCamera(70, 1, 0.01, 20),
      });
      camera.position.set(0, 0, 500);

      const renderer = world.create.renderer.xr({
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

        onInit = () => {
          this.reticle = new Mesh(
            new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
            new MeshBasicMaterial()
          );
          this.reticle.matrixAutoUpdate = false;
          this.reticle.visible = false;
          scene.add(this.reticle);

          const geometry = new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(
            0,
            0.1,
            0
          );

          controller.addEventListener('select', () => {
            if (this.reticle.visible) {
              const material = new MeshPhongMaterial({
                color: 0xffffff * Math.random(),
              });
              const mesh = new Mesh(geometry, material);
              mesh.position.setFromMatrixPosition(this.reticle.matrix);
              mesh.scale.y = Math.random() * 2 + 1;
              scene.add(mesh);
            }
          });

          renderer.onFrame((event) => {
            const referenceSpace = renderer.three.xr.getReferenceSpace();
            const session = renderer.three.xr.getSession();

            if (this.hitTestSourceRequested === false) {
              session.requestReferenceSpace('viewer').then((referenceSpace) => {
                session
                  .requestHitTestSource({ space: referenceSpace })
                  .then((source) => {
                    this.hitTestSource = source;
                  });
              });

              session.addEventListener('end', () => {
                this.hitTestSourceRequested = false;
                this.hitTestSource = null;
              });

              this.hitTestSourceRequested = true;
            }

            if (this.hitTestSource) {
              const hitTestResults = event.data.frame.getHitTestResults(
                this.hitTestSource
              );

              if (hitTestResults.length) {
                const hit = hitTestResults[0];

                this.reticle.visible = true;
                this.reticle.matrix.fromArray(
                  hit.getPose(referenceSpace).transform.matrix
                );
              } else {
                this.reticle.visible = false;
              }
            }
          });
        };
      }

      space.create.entity().addComponent(HitTestIndicator);

      return world;
    });

    return () => R.destroy();
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
