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
exports.pino = exports.io = exports.RoomManager = exports.Connection = exports.Room = exports.Server = void 0;
var pino = __importStar(require("pino"));
exports.pino = pino;
var io = __importStar(require("socket.io"));
exports.io = io;
var core_1 = require("./core");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return core_1.Connection; } });
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return core_1.Room; } });
Object.defineProperty(exports, "RoomManager", { enumerable: true, get: function () { return core_1.RoomManager; } });
var server_1 = __importDefault(require("./server"));
exports.Server = server_1.default;
