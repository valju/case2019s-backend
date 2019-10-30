"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import knex from "../../db/index";
var home = _express["default"].Router(); // GET

/** http://localhost:8787/api/    with method=GET **/


home.get("/", function (req, res) {
  // initialise home page data here
  console.log("home page, get home data here");
});
var _default = home;
exports["default"] = _default;