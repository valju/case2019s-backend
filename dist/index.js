"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/api/index"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _CONSTANTS = require("./CONSTANTS");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return app.use(_CONSTANTS.SERVER_SETTINGS.api_url_prefix, _index["default"]);

          case 2:
            _context.next = 4;
            return app.get("/", function (req, res) {
              res.send("Hello from the Node&Express Backend!").end();
            });

          case 4:
            _context.next = 6;
            return app.use(function (error, req, res, next) {
              return res.status(error.status || 500).json({
                error: error.message
              });
            });

          case 6:
            _context.next = 8;
            return app.listen(_CONSTANTS.SERVER_SETTINGS.port);

          case 8:
            console.log("Node server started and listens to               port ".concat(_CONSTANTS.SERVER_SETTINGS.port, "."));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init();