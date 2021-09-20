"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemEntityFilters = exports.System = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var scene_events_1 = require("../events/scene-events");
var scene_1 = require("./scene");
var SystemEntityFilters = {
    requireAll: function (components) { return function (e) {
        return components.every(function (c) { return (0, rapida_common_1.notEmpty)(e.getComponent(c)); });
    }; },
    requireAny: function (components) { return function (e) {
        return components.some(function (c) { return (0, rapida_common_1.notEmpty)(e.getComponent(c)); });
    }; },
};
exports.SystemEntityFilters = SystemEntityFilters;
/**
 * Abstract class for a System
 */
var System = /** @class */ (function () {
    function System(name) {
        /**
         * The entities in the system
         */
        this.entities = {};
        /**
         * The event system for this system
         */
        this.events = new rapida_common_1.EventSystem();
        /**
         * Logic for initialisation of the system. Called during System construction.
         */
        this.onSystemInit = undefined;
        /**
         * Logic for destruction of the system. Called on removing a System from a Scene.
         */
        this.onSystemDestroy = undefined;
        /**
         * Logic for a systems update loop
         * @param timeElapsed the time since the last update
         */
        this.onUpdate = undefined;
        /**
         * Logic for when an entity is added to the system
         * @param e the entity being added to the system
         */
        this.onAdd = undefined;
        /**
         * Logic for when an entity is removed from the system
         * @param e the entity being removed from the system
         */
        this.onRemove = undefined;
        this.name = name;
    }
    Object.defineProperty(System.prototype, "scene", {
        /**
         * Gets the scene. Always called on adding to a scene.
         */
        get: function () {
            return this._scene;
        },
        /**
         * Sets the scene
         */
        set: function (s) {
            this._scene = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(System.prototype, "networkManager", {
        /**
         * Getter for the runtime network manager
         */
        get: function () {
            var _a;
            if (((_a = this._scene) === null || _a === void 0 ? void 0 : _a.sceneType) === scene_1.SceneType.OFFLINE ||
                this.scene.networkManager === undefined) {
                throw new Error('network manager is not set on runtime');
            }
            return this.scene.networkManager;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initialises the system
     */
    System.prototype.init = function () {
        var _this = this;
        // add the entity filter if not undefined
        if (this.entityFilter !== undefined) {
            // add scene entity event handlers
            this._addEntityToSceneHandlerId = this.scene.on(scene_events_1.ADD_ENTITY_TO_SCENE_EVENT_NAME, function (e) {
                if (_this.entityFilter(e.data.entity)) {
                    _this.addEntity(e.data.entity);
                }
            });
            this._removeEntityFromSceneHandlerId = this.scene.on(scene_events_1.REMOVE_ENTITY_FROM_SCENE_EVENT_NAME, function (e) {
                _this.removeEntity(e.data.entity);
            });
        }
        // run on system init hook
        if (this.onSystemInit) {
            this.onSystemInit();
        }
        // start the event system
        this.events.start();
    };
    /**
     * Destroy logic for the system
     */
    System.prototype.destroy = function () {
        // remove scene handlers
        if (this._addEntityToSceneHandlerId) {
            this.scene.removeHandler(scene_events_1.ADD_ENTITY_TO_SCENE_EVENT_NAME, this._addEntityToSceneHandlerId);
        }
        if (this._removeEntityFromSceneHandlerId) {
            this.scene.removeHandler(scene_events_1.REMOVE_ENTITY_FROM_SCENE_EVENT_NAME, this._removeEntityFromSceneHandlerId);
        }
        // stop the event system
        this.events.stop();
        // run on system destroy hook if present
        if (this.onSystemDestroy) {
            this.onSystemDestroy();
        }
    };
    /**
     * Adds an entity to the system
     * @param e the entity to add
     */
    System.prototype.addEntity = function (e) {
        this.entities[e.id] = e;
        if (this.onAdd) {
            this.onAdd(e);
        }
    };
    /**
     * Removes an entity from the system
     * @param e the entity to remove
     */
    System.prototype.removeEntity = function (e) {
        delete this.entities[e.id];
        if (this.onRemove) {
            this.onRemove(e);
        }
    };
    /**
     * Returns whether an entity is in the system
     * @param entityId the entity id to check
     * @returns whether the entity is in the system
     */
    System.prototype.hasEntityId = function (entityId) {
        return (0, rapida_common_1.notEmpty)(this.entities[entityId]);
    };
    /**
     * Adds an event handler for the system
     * @param eventName the event name
     * @param handler the event handler
     */
    System.prototype.on = function (eventName, handler) {
        this.events.on(eventName, handler);
    };
    /**
     * Emits an event to the system
     * @param event the event to emit
     */
    System.prototype.emit = function (event) {
        return this.events.emit(event);
    };
    return System;
}());
exports.System = System;
