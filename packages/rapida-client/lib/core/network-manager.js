"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = void 0;
var rapida_common_1 = require("@isaacmason/rapida-common");
var socket_io_client_1 = require("socket.io-client");
var logger_1 = __importDefault(require("./logger"));
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        var _this = this;
        /**
         * Handlers for the room
         */
        this.handlers = {};
        /**
         * A buffer of events waiting to be emitted
         */
        this.emitBuffer = [];
        /**
         * A buffer of events waiting to be processed
         */
        this.processBuffer = [];
        /**
         * Emits events in the emit buffer, broadcasts events in the process buffer
         */
        this.tick = function () {
            if (_this.socket === undefined) {
                throw new Error('cannot emit an event as socket undefined');
            }
            // process all events in the process buffer
            _this.processBuffer
                .splice(0, _this.processBuffer.length)
                .map(function (event) {
                logger_1.default.debug('processing event', event);
                var handlers = _this.handlers[event.topic];
                if (handlers === undefined) {
                    logger_1.default.debug("event \"" + event.topic + "\" received but dropped due to no handlers");
                    return;
                }
                Object.values(handlers).map(function (handler) { return handler(event); });
            });
            // emit all events in the emit buffer
            var eventsToEmit = _this.emitBuffer.splice(0, _this.emitBuffer.length);
            if (eventsToEmit.length > 0) {
                var batchEvent = {
                    topic: rapida_common_1.Events.BATCH_EVENT_NAME,
                    data: eventsToEmit,
                };
                logger_1.default.debug('emitting batch event %o', batchEvent);
                _this.socket.emit(rapida_common_1.Events.BATCH_EVENT_NAME, batchEvent);
            }
        };
        /**
         * Joins the room
         * @param id the id of the room to join
         * @param endpoint the game server endpoint
         */
        this.join = function (id, endpoint) {
            _this.room = {
                id: id,
                endpoint: endpoint,
            };
            var connectionString = endpoint + "/" + id;
            logger_1.default.debug('connecting to %s', connectionString);
            _this.socket = (0, socket_io_client_1.io)(connectionString, {
                reconnection: true,
            });
            // add the client connection event handler
            _this.on(rapida_common_1.Events.CLIENT_CONNECTION_EVENT_NAME, function (event) {
                logger_1.default.debug('ClientConnectionEvent received %o', event);
                _this.clientId = event.data.clientId;
            });
            // set up event handling
            _this.socket.onAny(function (eventName, event) {
                var _a;
                logger_1.default.debug('received event', event);
                if (eventName === rapida_common_1.Events.BATCH_EVENT_NAME) {
                    (_a = _this.processBuffer).push.apply(_a, event.data);
                }
                else {
                    _this.processBuffer.push(event);
                }
            });
        };
        /**
         * Adds a room handler
         * @param eventName the event name
         * @param handler the handler function
         * @returns the id of the created room handler
         */
        this.on = function (eventName, handler) {
            var id = (0, rapida_common_1.uuid)();
            if (_this.handlers[eventName] === undefined) {
                _this.handlers[eventName] = {};
            }
            _this.handlers[eventName][id] = handler;
            return id;
        };
        /**
         * Emits an event to the room
         * @param event the event to emit
         */
        this.emit = function (event) {
            _this.emitBuffer.push(event);
        };
    }
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    NetworkManager.prototype.removeHandler = function (eventName, handlerId) {
        if (this.handlers[eventName] !== undefined) {
            delete this.handlers[eventName][handlerId];
        }
    };
    return NetworkManager;
}());
exports.NetworkManager = NetworkManager;
