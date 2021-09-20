"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var Entity = /** @class */ (function () {
    function Entity(name) {
        /**
         * The unique ID of the entity
         */
        this.id = (0, rapida_common_1.uuid)();
        /**
         * A group of three Object3D objects
         */
        this.group = new rapida_common_1.three.Group();
        /**
         * The components for this entity
         */
        this.components = {};
        /**
         * Whether the entity is 'playing', or whether updates are occurring
         */
        this.playing = true;
        /**
         * Whether the entity is alive
         * If false, the entity will be destroyed by the EntityManager
         */
        this.alive = true;
        /**
         * The entities event system
         */
        this.events = new rapida_common_1.EventSystem();
        this.name = name;
        this.group = new rapida_common_1.three.Group();
    }
    Object.defineProperty(Entity.prototype, "scene", {
        get: function () {
            if (this._scene === undefined) {
                throw new Error('scene is not available');
            }
            return this._scene;
        },
        set: function (s) {
            this._scene = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "position", {
        /**
         * The position of the entity
         */
        get: function () {
            return this.group.position;
        },
        /**
         * Sets the position of the entity and broadcasts the change
         */
        set: function (p) {
            this.group.position.set(p.x, p.y, p.z);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "rotation", {
        /**
         * The rotation of the entity
         */
        get: function () {
            return this.group.rotation;
        },
        /**
         * Sets the rotation of the entity and broadcasts the change
         */
        set: function (r) {
            this.group.rotation.set(r.x, r.y, r.z);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initialise the entity
     */
    Entity.prototype.init = function () {
        Object.values(this.components).map(function (c) { return c.init(); });
        this.events.start();
        return this;
    };
    /**
     * Updates the entity
     * @param timeElapsed the time since the last update in milliseconds
     */
    Entity.prototype.update = function (timeElapsed) {
        Object.values(this.components).map(function (c) { return c.update(timeElapsed); });
    };
    /**
     * Destroy the entities components
     */
    Entity.prototype.destroy = function () {
        Object.values(this.components).map(function (c) { return c.destroy(); });
    };
    /**
     * Sets whether the entity is playing
     * @param playing the new state
     */
    Entity.prototype.setPlaying = function (playing) {
        this.playing = playing;
        return this;
    };
    /**
     * Sets whether the entity is alive
     * @param alive the new state
     */
    Entity.prototype.setAlive = function (alive) {
        this.alive = alive;
        return this;
    };
    /**
     * Adds a component to the entity
     * @param c the component to add
     */
    Entity.prototype.addComponent = function (c) {
        // add the component to the entity
        this.components[c.name] = c;
        c.entity = this;
        return this;
    };
    /**
     * Retrieves a component on an entity by type.
     * Throws an error if it does not exist.
     * @param constr the component type to retrieve
     * @returns the component
     */
    Entity.prototype.getComponent = function (constr) {
        var components = Object.values(this.components);
        for (var i = 0; i < components.length; i++) {
            var c = components[i];
            if (c instanceof constr) {
                return c;
            }
        }
        throw new Error("Component " + constr.name + " not found on entity " + this.id);
    };
    /**
     * Adds a handler for entity events
     * @param eventName the event name
     * @param handler the handler function
     * @returns the id of the created handler
     */
    Entity.prototype.on = function (eventName, handler) {
        return this.events.on(eventName, handler);
    };
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    Entity.prototype.removeHandler = function (eventName, handlerId) {
        return this.events.removeHandler(eventName, handlerId);
    };
    /**
     * Broadcasts an event for handling by the entity
     * @param event the event to broadcast
     */
    Entity.prototype.emit = function (event) {
        return this.events.emit(event);
    };
    return Entity;
}());
exports.Entity = Entity;
