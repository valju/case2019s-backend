"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryFromFile = getQueryFromFile;

require("@babel/polyfill");

var _mysql = _interopRequireDefault(require("mysql"));

var fs = _interopRequireWildcard(require("fs"));

var _CONSTANTS = require("../CONSTANTS");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// define the SQL scripts location and file names
var scriptFolder = './Database/SQL_Scripts/';
var scriptFiles = ['00_drop_tables.sql', '01_create_tables.sql', '02_insert_technical_test_data.sql']; // read the SQL scripts from filepath

function getQueryFromFile() {
  var query = '';

  for (var i = 0; i < scriptFiles.length; i++) {
    query += fs.readFileSync(scriptFolder + scriptFiles[i], "utf8", function (err, data) {
      if (err) throw err;
      return toString(data);
    });
  }

  return query;
} // create mysql connection


function getConnection() {
  return _getConnection.apply(this, arguments);
}

function _getConnection() {
  _getConnection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _mysql["default"].createConnection({
              host: _CONSTANTS.DB_SETTINGS.host,
              port: _CONSTANTS.DB_SETTINGS.port,
              user: _CONSTANTS.DB_SETTINGS.user,
              password: _CONSTANTS.DB_SETTINGS.password,
              database: _CONSTANTS.DB_SETTINGS.database,
              multipleStatements: _CONSTANTS.DB_SETTINGS.multipleStatements,
              debug: _CONSTANTS.DB_SETTINGS.debug
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getConnection.apply(this, arguments);
}

; // wait for connection promise to complete
// then query remote db with the received client object

getConnection().then(function (client) {
  client.query(getQueryFromFile(), function (err, results, fields) {
    if (err) throw err;
    console.log("database reset successful!");
    client.end();
  });
})["catch"](function (err) {
  console.log(err);
});