"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _home = _interopRequireDefault(require("./home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.use('/', _home["default"]);
var _default = routes;
exports["default"] = _default;