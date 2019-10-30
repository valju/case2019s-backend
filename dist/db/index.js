"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _CONSTANTS = require("../CONSTANTS");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// initiate knex with config
var _default = (0, _knex["default"])({
  client: _CONSTANTS.DB_SETTINGS.driverModule,
  connection: {
    host: _CONSTANTS.DB_SETTINGS.host,
    port: _CONSTANTS.DB_SETTINGS.port,
    user: _CONSTANTS.DB_SETTINGS.user,
    password: _CONSTANTS.DB_SETTINGS.password,
    database: _CONSTANTS.DB_SETTINGS.database,
    debug: _CONSTANTS.DB_SETTINGS.debug
  },
  pool: {
    min: _CONSTANTS.DB_SETTINGS.connPoolMin,
    max: _CONSTANTS.DB_SETTINGS.connPoolMax
  }
});

exports["default"] = _default;