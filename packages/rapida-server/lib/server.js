"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rapida_common_1 = require("@isaacmason/rapida-common");
var http_1 = require("http");
var pino_1 = __importDefault(require("pino"));
var socket_io_1 = require("socket.io");
var core_1 = require("./core");
var Server = /** @class */ (function () {
    function Server(_a) {
        var _this = this;
        var port = _a.port, corsClientOrigin = _a.corsClientOrigin, serverLogger = _a.serverLogger;
        /**
         * Starts the server
         */
        this.start = function () {
            _this.http.listen(_this.port);
        };
        /**
         * Registers a new room manager
         * @param roomManagerId the room manager ID
         * @param roomManagerProvider a function that returns a new room manager for a given room manager id
         */
        this.registerRoomManager = function (roomManagerId, roomManagerProvider) {
            _this.roomManagerProviders[roomManagerId] = roomManagerProvider;
        };
        /**
         * Creates a new room with a given room manager
         * @param roomManagerId the room manager ID to create a room for. A room manager provider with the given room manager ID must exist
         * @param roomId an optional roomId
         */
        this.createRoom = function (roomManagerId, roomId) {
            // check if the socket io server is available
            if (_this.io === undefined) {
                throw new Error('Server io socket server is not ready');
            }
            // get the room id
            var id = roomId || (0, rapida_common_1.uuid)();
            if (_this.rooms[id] !== undefined) {
                throw new Error("A room with the room id " + id + " already exists");
            }
            // get the room manager
            var roomManagerProvider = _this.roomManagerProviders[roomManagerId];
            if (roomManagerProvider === undefined) {
                throw new Error('no room manager provider registered for the given room manager id');
            }
            // create a new io namespace with the room id
            var namespace = _this.io.of("/" + id);
            // create a new room
            var room = new core_1.Room({
                id: id,
                roomManagerProvider: roomManagerProvider,
                namespace: namespace,
                roomLogger: _this.logger,
            });
            _this.rooms[room.id] = room;
            return room;
        };
        this.logger = serverLogger || (0, pino_1.default)();
        this.port = port;
        this.corsClientOrigin = corsClientOrigin;
        this.rooms = {};
        this.roomManagerProviders = {};
        var cors = this.corsClientOrigin !== undefined
            ? {
                origin: this.corsClientOrigin,
                methods: ['GET', 'POST'],
            }
            : undefined;
        this.http = (0, http_1.createServer)();
        this.io = new socket_io_1.Server(this.http, {
            cors: cors,
        });
    }
    /**
     * Retrieves currently active rooms
     */
    Server.prototype.getRooms = function () {
        return Object.values(this.rooms);
    };
    return Server;
}());
exports.default = Server;
