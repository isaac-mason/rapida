"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
var rapida_common_1 = require("@isaacmason/rapida-common");
/**
 * A component of an entity that has data and behaviour
 */
var Component = /** @class */ (function () {
    function Component(name) {
        /**
         * Initialisation logic. The entity will be available in this method.
         */
        this.init = function () { };
        /**
         * Destruction logic
         */
        this.destroy = function () { };
        /**
         * Update logic
         * @param timeElapsed the time since the last update for this component in milliseconds
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.update = function (timeElapsed) { };
        this.id = (0, rapida_common_1.uuid)();
        this.name = name;
    }
    Object.defineProperty(Component.prototype, "entity", {
        /**
         * Gets the entity for the component. Available during init call.
         */
        get: function () {
            return this._entity;
        },
        /**
         * Sets what entity the component belongs to
         * @param entity the entity
         */
        set: function (entity) {
            this._entity = entity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "scene", {
        /**
         * The scene the components entity is in
         */
        get: function () {
            if (this.entity === undefined) {
                throw new Error('entity is not available');
            }
            if (this.entity.scene === undefined) {
                throw new Error('scene is not available');
            }
            return this.entity.scene;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "networkManager", {
        /**
         * The scenes network manager
         */
        get: function () {
            if (this.entity === undefined) {
                throw new Error('entity is not available');
            }
            if (this.entity.scene === undefined) {
                throw new Error('scene is not available');
            }
            if (this.entity.scene.networkManager === undefined) {
                throw new Error('scene network manager is not available');
            }
            return this.entity.scene.networkManager;
        },
        enumerable: false,
        configurable: true
    });
    return Component;
}());
exports.Component = Component;
