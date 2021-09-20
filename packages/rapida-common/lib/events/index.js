"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSystem = void 0;
var uuid_1 = require("../util/uuid");
/**
 * A simple event handling system
 */
var EventSystem = /** @class */ (function () {
    function EventSystem() {
        /**
         * Whether the event system is currently processing events
         * If false, events will be put in a buffer for processing
         */
        this.processing = false;
        /**
         * The event handlers
         */
        this.handlers = {};
        /**
         * The events that will be processed on the next update
         */
        this.buffer = [];
    }
    /**
     * Starts processing events and processes all events in the buffer
     */
    EventSystem.prototype.start = function () {
        var _this = this;
        this.processing = true;
        this.buffer
            .splice(0, this.buffer.length)
            .map(function (e) { return _this.process(e); });
    };
    /**
     * Stops processing events.
     * Incoming events are put into a buffer and will be processed on calling start
     */
    EventSystem.prototype.stop = function () {
        this.processing = false;
    };
    /**
     * Adds a handler to the event system
     * @param eventName the event name
     * @param handlerName the name of the handler
     * @param handler the handler function
     * @returns the id of the new handler
     */
    EventSystem.prototype.on = function (eventName, handler) {
        var id = (0, uuid_1.uuid)();
        if (this.handlers[eventName] === undefined) {
            this.handlers[eventName] = {};
        }
        this.handlers[eventName][id] = handler;
        return id;
    };
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    EventSystem.prototype.removeHandler = function (eventName, handlerId) {
        if (this.handlers[eventName] !== undefined) {
            delete this.handlers[eventName][handlerId];
        }
    };
    /**
     * Emits an event for handling by the event system
     * @param event the event to broadcast
     */
    EventSystem.prototype.emit = function (event) {
        if (this.processing) {
            this.process(event);
        }
        else {
            this.buffer.push(event);
        }
    };
    /**
     * Processes an event with the given handler
     * @param event the event to process
     */
    EventSystem.prototype.process = function (event) {
        var handlers = this.handlers[event.topic];
        if (handlers !== undefined) {
            Object.values(handlers).map(function (handler) { return handler(event); });
        }
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
