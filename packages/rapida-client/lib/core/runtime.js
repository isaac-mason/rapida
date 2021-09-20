"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var logger_1 = __importDefault(require("./logger"));
/**
 * A simple client runtime to work with the scene class.
 *
 * Creates a dom element for the renderer on instantiation.
 * Only suitable for scenes with one camera that use the built-in CameraComponent class.
 * For anything more complex, a custom runtime class should be created.
 */
var Runtime = /** @class */ (function () {
    function Runtime(_a) {
        var _this = this;
        var domId = _a.domId, renderer = _a.renderer, maxUpdatesPerSecond = _a.maxUpdatesPerSecond, networkManager = _a.networkManager, debug = _a.debug;
        /**
         * The scene providers for the runtime
         */
        this.sceneProviders = {};
        /**
         * Registers a new scene
         * @param sceneId the scene ID
         * @param sceneProvider a function that returns a new Scene for a given sceneId
         */
        this.registerScene = function (sceneId, sceneProvider) {
            _this.sceneProviders[sceneId] = sceneProvider;
        };
        // Set update delay
        this.updateDelay = 1000 / (maxUpdatesPerSecond || 60);
        // Set the network manager
        this.networkManager = networkManager;
        // Set up the renderer
        if (renderer) {
            this.renderer = renderer;
        }
        else {
            this.renderer = new rapida_common_1.three.WebGLRenderer({
                antialias: true,
            });
        }
        // Get the dom element with the given ID
        this.domElement = document.getElementById(domId);
        // Prepend the renderer dom element
        this.domElement.prepend(this.renderer.domElement);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
        // Create the event listener for window resizing
        window.addEventListener('resize', function () { return _this.onWindowResize(); }, false);
        // init scene providers map
        this.sceneProviders = {};
        // set killLoop to false
        this.killLoop = false;
        // set whether the runtime should be in debug mode
        this.debug = debug || false;
        // set the logger
        this.logger = logger_1.default;
        this.logger.level = this.debug ? 'debug' : 'info';
    }
    /**
     * Sets the scene that is playing.
     * If a scene is already playing, the current scene is stopped and the new scene is started.
     * @param s the new scene to start
     */
    Runtime.prototype.setScene = function (sceneId) {
        // clean up running scene
        if (this.scene !== undefined) {
            // kill the render loop
            this.killLoop = true;
            // destroy the scene
            this.scene.destroy();
        }
        // get the scene provider
        var sceneProvider = this.sceneProviders[sceneId];
        if (sceneProvider === undefined) {
            throw new Error('there is no scene provider for the given scene id');
        }
        // create the scene
        this.scene = sceneProvider({
            runtime: this,
            networkManager: this.networkManager,
        });
        if (this.scene === undefined) {
            throw new Error('Cannot init as the newly provided scene is undefined');
        }
        // set killLoop to false now in case anything went wrong
        this.killLoop = false;
        // start the scene
        this.scene.init();
        // start the loop
        this.loop();
        // return the scene
        return this;
    };
    /**
     * Handles window resizing
     */
    Runtime.prototype.onWindowResize = function () {
        if (this.scene === undefined || this.scene.camera === undefined) {
            return;
        }
        this.scene.camera.aspect =
            this.domElement.clientWidth / this.domElement.clientHeight;
        this.scene.camera.updateProjectionMatrix();
        this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
    };
    /**
     * The animation loop
     */
    Runtime.prototype.loop = function () {
        var _this = this;
        requestAnimationFrame(function (t) {
            if (_this.killLoop === true) {
                _this.killLoop = false;
                return;
            }
            if (_this.previousAnimationFrame === undefined) {
                _this.previousAnimationFrame = t;
            }
            if (_this.scene !== undefined && _this.scene.camera !== undefined) {
                _this.renderer.render(_this.scene.threeScene, _this.scene.camera);
                var timeElapsed = t - _this.previousAnimationFrame;
                _this.scene.update(timeElapsed);
            }
            _this.previousAnimationFrame = t;
            setTimeout(function () {
                _this.loop();
            }, _this.updateDelay);
        });
    };
    return Runtime;
}());
exports.Runtime = Runtime;
