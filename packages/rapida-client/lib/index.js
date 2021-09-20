"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.components = exports.NetworkManager = exports.Runtime = exports.SystemEntityFilters = exports.System = exports.SceneType = exports.Scene = exports.Entity = exports.Component = exports.CameraComponent = exports.three = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
Object.defineProperty(exports, "three", { enumerable: true, get: function () { return rapida_common_1.three; } });
var components = __importStar(require("./components"));
exports.components = components;
var camera_component_1 = __importDefault(require("./components/camera.component"));
exports.CameraComponent = camera_component_1.default;
var component_1 = require("./core/component");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.Component; } });
var entity_1 = require("./core/entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return entity_1.Entity; } });
var system_1 = require("./core/system");
Object.defineProperty(exports, "System", { enumerable: true, get: function () { return system_1.System; } });
Object.defineProperty(exports, "SystemEntityFilters", { enumerable: true, get: function () { return system_1.SystemEntityFilters; } });
var logger_1 = __importDefault(require("./core/logger"));
exports.logger = logger_1.default;
var network_manager_1 = require("./core/network-manager");
Object.defineProperty(exports, "NetworkManager", { enumerable: true, get: function () { return network_manager_1.NetworkManager; } });
var runtime_1 = require("./core/runtime");
Object.defineProperty(exports, "Runtime", { enumerable: true, get: function () { return runtime_1.Runtime; } });
var scene_1 = __importStar(require("./core/scene"));
exports.Scene = scene_1.default;
Object.defineProperty(exports, "SceneType", { enumerable: true, get: function () { return scene_1.SceneType; } });
