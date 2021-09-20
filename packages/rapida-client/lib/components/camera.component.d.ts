import { three } from '@isaacmason/rapida-common';
import { Component } from '../core/component';
export declare const THREE_CAMERA_INIT = "c.three.camera.init";
export interface ThreeCameraInitEvent {
    topic: string;
    data: {
        id: string;
        name: string;
        camera: three.PerspectiveCamera;
    };
}
export declare const THREE_CAMERA_DESTROY = "c.three.camera.destroy";
export interface ThreeCameraDestroyEvent {
    topic: string;
    data: {
        id: string;
        name: string;
        camera: three.PerspectiveCamera;
    };
}
/**
 * A component that creates a camera and broadcasts its creation to the scene
 */
declare class CameraComponent extends Component {
    /**
     * The three js camera
     */
    camera: three.PerspectiveCamera;
    constructor(name: string, camera?: three.PerspectiveCamera);
    init: () => void;
    destroy: () => void;
}
export default CameraComponent;
