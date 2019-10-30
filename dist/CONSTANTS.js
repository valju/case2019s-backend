"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVER_SETTINGS = exports.DB_SETTINGS = void 0;
var DB_SETTINGS = {
  driverModule: "mysql",
  host: "localhost",
  port: "3308",
  user: "a1605342",
  password: "muNALB96m",
  database: "a1605342",
  multipleStatements: true,
  debug: true,
  connPoolMin: 0,
  connPoolMax: 7
};
exports.DB_SETTINGS = DB_SETTINGS;
var SERVER_SETTINGS = {
  port: 8787,
  api_url_prefix: "/api"
};
exports.SERVER_SETTINGS = SERVER_SETTINGS;