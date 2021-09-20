"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.THREE_CAMERA_DESTROY = exports.THREE_CAMERA_INIT = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var component_1 = require("../core/component");
exports.THREE_CAMERA_INIT = 'c.three.camera.init';
exports.THREE_CAMERA_DESTROY = 'c.three.camera.destroy';
/**
 * A component that creates a camera and broadcasts its creation to the scene
 */
var CameraComponent = /** @class */ (function (_super) {
    __extends(CameraComponent, _super);
    function CameraComponent(name, camera) {
        var _this = _super.call(this, name) || this;
        _this.init = function () {
            // add the camera to the scene
            _this.entity.group.add(_this.camera);
            // broadcast the camera to the scene
            _this.scene.emit({
                topic: exports.THREE_CAMERA_INIT,
                data: {
                    id: _this.id,
                    name: _this.name,
                    camera: _this.camera,
                },
            });
        };
        _this.destroy = function () {
            _this.scene.emit({
                topic: exports.THREE_CAMERA_DESTROY,
                data: {
                    id: _this.id,
                    name: _this.name,
                    camera: _this.camera,
                },
            });
        };
        _this.camera = camera || new rapida_common_1.three.PerspectiveCamera(70, 1, 1, 1000);
        return _this;
    }
    return CameraComponent;
}(component_1.Component));
exports.default = CameraComponent;
