"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.Room = exports.RoomManager = void 0;
/* eslint-disable max-classes-per-file */
var rapida_common_1 = require("@isaacmason/rapida-common");
var perf_hooks_1 = require("perf_hooks");
var pino_1 = __importDefault(require("pino"));
/**
 * A class for managing a connection from the client
 */
var Connection = /** @class */ (function () {
    function Connection(_a) {
        var _this = this;
        var connectionId = _a.connectionId, socket = _a.socket, room = _a.room, connectionLogger = _a.connectionLogger;
        /**
         * Handlers for the connection
         */
        this.handlers = {};
        /**
         * A buffer of events waiting to be emitted
         */
        this.emitBuffer = [];
        /**
         * Emits all events in the emit buffer
         */
        this.tick = function () {
            // emit all events in the emit buffer as a batch event
            var eventsToEmit = _this.emitBuffer.splice(0, _this.emitBuffer.length);
            if (eventsToEmit.length > 0) {
                _this.socket.emit(rapida_common_1.Events.BATCH_EVENT_NAME, {
                    topic: rapida_common_1.Events.BATCH_EVENT_NAME,
                    data: eventsToEmit,
                });
            }
        };
        /**
         * Adds a room handler.
         * @param eventName the event name
         * @param handlerName the name for the handler. Must be unique for the eventName.
         * @param handler the handler function
         */
        this.addHandler = function (eventName, handlerName, handler) {
            if (_this.handlers[eventName] === undefined) {
                _this.handlers[eventName] = {};
            }
            _this.handlers[eventName][handlerName] = handler;
        };
        /**
         * Processes an event
         * @param event the event to emit
         */
        this.process = function (event) {
            _this.logger.debug('Connection %s handling event %o with handlers %o', _this.id, event, _this.handlers);
            var connectionHandlers = _this.handlers[event.topic];
            if (connectionHandlers !== undefined) {
                Object.values(connectionHandlers).map(function (handler) { return handler(event); });
            }
        };
        /**
         * Emits an event to the connection
         * @param event the event to emit
         */
        this.emit = function (event) {
            _this.emitBuffer.push(event);
        };
        /**
         * Clears all handlers
         */
        this.clearHandlers = function () {
            _this.handlers = {};
        };
        this.logger = connectionLogger || (0, pino_1.default)();
        this.id = connectionId;
        this.socket = socket;
        this.room = room;
    }
    return Connection;
}());
exports.Connection = Connection;
/**
 * A room that rapida clients can join
 */
var Room = /** @class */ (function () {
    function Room(_a) {
        var _this = this;
        var id = _a.id, namespace = _a.namespace, roomManagerProvider = _a.roomManagerProvider, roomLogger = _a.roomLogger, maxUpdatesPerSecond = _a.maxUpdatesPerSecond;
        /**
         * The rooms active connections
         */
        this.connections = {};
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
        this._run = function () {
            _this._schedule(perf_hooks_1.performance.now());
        };
        this._schedule = function (t1) {
            setTimeout(function () {
                var t2 = perf_hooks_1.performance.now();
                _this.roomManager.update((t2 - t1) * 0.001);
                _this.tick();
                _this._schedule(t2);
            }, _this.tickDelay);
        };
        /**
         * Processes all events in the process buffer, emits all events in the emit buffer
         */
        this.tick = function () {
            // process all events in the process buffer
            _this.processBuffer
                .splice(0, _this.processBuffer.length)
                .forEach(function (event) { return _this.process(event); });
            // emit all events in the emit buffer as a batch event
            var eventsToEmit = _this.emitBuffer.splice(0, _this.emitBuffer.length);
            if (eventsToEmit.length > 0) {
                _this.namespace.emit(rapida_common_1.Events.BATCH_EVENT_NAME, {
                    topic: rapida_common_1.Events.BATCH_EVENT_NAME,
                    data: eventsToEmit,
                });
            }
            // tick connections
            Object.values(_this.connections).map(function (c) { return c.tick(); });
        };
        /**
         * Adds a connection
         * @param connection the connection to add
         */
        this.addConnection = function (connection) {
            _this.connections[connection.id] = connection;
        };
        /**
         * Removes a connection
         * @param id the id of the connection to remove
         */
        this.removeConnection = function (id) {
            delete _this.connections[id];
        };
        /**
         * Adds a room handler.
         * @param eventName the event name
         * @param handlerName the name for the handler. Must be unique for the eventName.
         * @param handler the handler function
         */
        this.addHandler = function (eventName, handlerName, handler) {
            if (_this.handlers[eventName] === undefined) {
                _this.handlers[eventName] = {};
            }
            _this.handlers[eventName][handlerName] = handler;
        };
        /**
         * Emits an event to the room
         * @param event the event to emit
         */
        this.emit = function (event) {
            _this.emitBuffer.push(event);
        };
        /**
         * Processes an event
         * @param event the event to emit
         */
        this.process = function (event) {
            _this.logger.debug('Room %s handling event %o with handlers %o', _this.id, event, _this.handlers);
            var roomHandlers = _this.handlers[event.topic];
            if (roomHandlers !== undefined) {
                Object.values(roomHandlers).map(function (handler) { return handler(event); });
            }
        };
        this.id = id;
        this.namespace = namespace;
        this.roomManagerProvider = roomManagerProvider;
        this.logger = roomLogger || (0, pino_1.default)();
        this.tickDelay = 1000 / (maxUpdatesPerSecond || 60);
        // set up namespace room connection handling
        this.namespace.on('connection', function (socket) {
            _this.logger.info("new connection from socket id \"" + socket.id + "\" for namespace " + namespace.name);
            // create a new connection in the room
            var connection = new Connection({
                connectionId: socket.id,
                room: _this,
                connectionLogger: _this.logger,
                socket: socket,
            });
            _this.addConnection(connection);
            _this.logger.info("added new connection to room \"" + _this.id + "\" with id \"" + connection.id + "\"");
            // handle disconnects
            socket.on('disconnect', function () {
                // remove the connection from the room
                _this.roomManager.onDisconnect(connection);
                _this.removeConnection(connection.id);
            });
            // set up event handling for the new connection
            socket.onAny(function (eventName, event) {
                _this.logger.debug('Room %s received event "%s" %o with handlers %o', _this.id, eventName, event, _this.handlers);
                if (eventName === rapida_common_1.Events.BATCH_EVENT_NAME) {
                    event.data.map(function (e) {
                        _this.process(e);
                        connection.process(e);
                    });
                }
                else {
                    _this.process(event);
                    connection.process(event);
                }
            });
            // emit a client connection event
            _this.logger.debug('Emitting ClientConnection event for id %s', socket.id);
            connection.emit({
                topic: rapida_common_1.Events.CLIENT_CONNECTION_EVENT_NAME,
                data: {
                    clientId: socket.id,
                },
            });
            // call the room managers on connection method
            _this.roomManager.onConnection(connection);
        });
        // create the room manager
        this.roomManager = this.roomManagerProvider(this);
        // run room manager initialisation logic
        this.roomManager.init();
        // start the room update loop
        this._run();
    }
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    Room.prototype.removeHandler = function (eventName, handlerId) {
        if (this.handlers[eventName] !== undefined) {
            delete this.handlers[eventName][handlerId];
        }
    };
    return Room;
}());
exports.Room = Room;
/**
 * An abstract class that can be extended to define the behaviour of a room
 */
var RoomManager = /** @class */ (function () {
    function RoomManager(id, room) {
        this.id = id;
        this.room = room;
    }
    Object.defineProperty(RoomManager.prototype, "namespace", {
        /**
         * The namespace for the room managers room
         */
        get: function () {
            if (this.room === undefined) {
                throw new Error('room is not available yet');
            }
            return this.room.namespace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomManager.prototype, "logger", {
        /**
         * The logger for the room managers room
         */
        get: function () {
            if (this.room === undefined) {
                throw new Error('room is not available yet');
            }
            return this.room.logger;
        },
        enumerable: false,
        configurable: true
    });
    return RoomManager;
}());
exports.RoomManager = RoomManager;
