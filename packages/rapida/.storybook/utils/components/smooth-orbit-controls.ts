import { Component, View, Camera } from "../../../src";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class SmoothOrbitControls extends Component {
  controls!: OrbitControls;

  construct = (camera: Camera, view: View) => {
    this.controls = new OrbitControls(camera.three, view.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  };

  onUpdate = () => {
    this.controls.update();
  };
}
