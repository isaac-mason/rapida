import { Component } from "@rapidajs/recs";
import { OrthographicCamera, PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { View } from "../../src";

export class SmoothOrbitControls extends Component {
  controls!: OrbitControls;

  construct = (camera: PerspectiveCamera | OrthographicCamera, view: View) => {
    this.controls = new OrbitControls(camera, view.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  };

  onUpdate = () => {
    this.controls.update();
  };
}
