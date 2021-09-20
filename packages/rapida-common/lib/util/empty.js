"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notEmpty = exports.empty = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var ramda = require("ramda");
var empty = function (value) { return ramda.empty(value); };
exports.empty = empty;
var notEmpty = function (value) { return !(0, exports.empty)(value); };
exports.notEmpty = notEmpty;
