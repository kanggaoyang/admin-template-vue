"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _asyncRoutes = _interopRequireDefault(require("@/router/asyncRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {},
  getters: {
    routes: function routes() {
      return _asyncRoutes["default"];
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});

exports["default"] = _default;