"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneType = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var system_1 = require("./system");
var camera_component_1 = require("../components/camera.component");
var entity_1 = require("./entity");
var scene_events_1 = require("../events/scene-events");
/**
 * Scene type enum
 */
var SceneType;
(function (SceneType) {
    SceneType["OFFLINE"] = "OFFLINE";
    SceneType["NETWORKED"] = "NETWORKED";
})(SceneType || (SceneType = {}));
exports.SceneType = SceneType;
/**
 * A scene that can contain entities and can be networked
 */
var Scene = /** @class */ (function () {
    function Scene(id, params) {
        var _this = this;
        /**
         * Entities in the scene
         */
        this.entities = {};
        /**
         * Systems in the scene
         */
        this.systems = {};
        /**
         * The three js scene.
         * Components have a reference to this scene and can add themselves to the three js scene
         */
        this.threeScene = new rapida_common_1.three.Scene();
        /**
         * Whether the scene has been initialised
         * If the scene has already been initialised, when adding a new entity to the scene, the scene will initialise the entity
         */
        this.initialised = false;
        /**
         * The scenes event system
         */
        this.events = new rapida_common_1.EventSystem();
        // set the id
        this.id = id;
        // init lifecycle tasks
        this.initJobs = [
            // Initialise all systems and entities
            function () {
                Object.values(_this.systems).forEach(function (s) {
                    if (s.onSystemInit !== undefined) {
                        s.onSystemInit();
                    }
                });
                Object.values(_this.entities).forEach(function (e) { return e.init(); });
            },
        ];
        // update lifecycle tasks
        this.updateJobs = [
            function (timeElapsed) {
                Object.values(_this.systems).map(function (s) {
                    if (s.onUpdate !== undefined) {
                        s.onUpdate(timeElapsed);
                    }
                });
            },
            function (timeElapsed) {
                var dead = {};
                var alive = {};
                Object.values(_this.entities).map(function (e) {
                    e.update(timeElapsed);
                    if (e.alive) {
                        alive[e.name] = e;
                    }
                    else {
                        dead[e.name] = e;
                    }
                    Object.values(dead).map(function (d) {
                        delete _this.entities[d.name];
                        _this.threeScene.remove(d.group);
                        d.destroy();
                    });
                    _this.entities = alive;
                });
            },
        ];
        // destroy lifecycle tasks
        this.destroyJobs = [
            function () {
                Object.values(_this.entities).map(function (e) { return e.destroy(); });
            },
        ];
        // add handlers for registering the camera
        this.on(camera_component_1.THREE_CAMERA_INIT, function (event) {
            _this.camera = event.data.camera;
            _this.runtime.onWindowResize();
        });
        this.on(camera_component_1.THREE_CAMERA_DESTROY, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function (event) {
            _this.camera = undefined;
        });
        // set the runtime
        this.runtime = params.runtime;
        // set the room if provided and set the room type
        if (params.networkManager) {
            this.runtime.networkManager = params.networkManager;
            this.sceneType = SceneType.NETWORKED;
            this.updateJobs.push(function () {
                var _a;
                (_a = _this.runtime.networkManager) === null || _a === void 0 ? void 0 : _a.tick();
            });
        }
        else {
            this.sceneType = SceneType.OFFLINE;
        }
    }
    Object.defineProperty(Scene.prototype, "networkManager", {
        /**
         * Getter for the runtime network manager
         */
        get: function () {
            if (this.sceneType === SceneType.OFFLINE ||
                this.runtime.networkManager === undefined) {
                throw new Error('network manager is not set on runtime');
            }
            return this.runtime.networkManager;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initialise the scene
     */
    Scene.prototype.init = function () {
        this.initJobs.forEach(function (i) { return i(); });
        this.events.start();
        this.initialised = true;
    };
    /**
     * Updates all entities within the scene
     * @param timeElapsed the time since the last update in milliseconds
     */
    Scene.prototype.update = function (timeElapsed) {
        this.updateJobs.forEach(function (u) { return u(timeElapsed); });
    };
    /**
     * Destroy all entities
     */
    Scene.prototype.destroy = function () {
        this.destroyJobs.forEach(function (d) { return d(); });
    };
    /**
     * Adds an entity to the scene
     * @param e the entity or system to add
     */
    Scene.prototype.add = function (value) {
        if (value instanceof entity_1.Entity) {
            // add the entity
            value.scene = this;
            this.entities[value.name] = value;
            this.threeScene.add(value.group);
            // initialise if the scene has already been initialised
            if (this.initialised) {
                value.init();
            }
            // emit the entity to the scene
            this.emit({
                topic: scene_events_1.ADD_ENTITY_TO_SCENE_EVENT_NAME,
                data: {
                    entity: value,
                },
            });
        }
        else if (value instanceof system_1.System) {
            // add the system
            value.scene = this;
            this.systems[value.name] = value;
            // retroactively add entities to the system
            Object.values(this.entities)
                .filter(function (e) { return value.entityFilter && value.entityFilter(e); })
                .map(function (e) { return value.addEntity(e); });
            // initialise if the scene has already been initialised
            if (this.initialised && value.onSystemInit) {
                value.onSystemInit();
            }
        }
        return this;
    };
    /**
     * Removes an entity or a system from the scene
     * @param value the entity or system to remove
     */
    Scene.prototype.remove = function (value) {
        if (value instanceof entity_1.Entity) {
            // remove the entity from the scene
            delete this.entities[value.name];
            // destroy the entity
            value.destroy();
            // emit the entity destroy event to the scene
            this.emit({
                topic: scene_events_1.REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
                data: {
                    entity: value,
                },
            });
        }
        else if (value instanceof system_1.System) {
            // remove the system
            delete this.systems[value.name];
        }
        return this;
    };
    /**
     * Adds a handler for scene events
     * @param eventName the event name
     * @param handlerName the name of the handler
     * @param handler the handler function
     * @returns the id of the new handler
     */
    Scene.prototype.on = function (eventName, handler) {
        return this.events.on(eventName, handler);
    };
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    Scene.prototype.removeHandler = function (eventName, handlerId) {
        return this.events.removeHandler(eventName, handlerId);
    };
    /**
     * Broadcasts an event for handling by the scene
     * @param event the event to broadcast
     */
    Scene.prototype.emit = function (event) {
        return this.events.emit(event);
    };
    return Scene;
}());
exports.default = Scene;
