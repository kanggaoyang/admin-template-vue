"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = _interopRequireDefault(require("@/layout/components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routesFixed = [{
  path: "/",
  component: _components["default"],
  meta: {// isNav: true
  },
  redirect: "/home",
  children: [{
    name: "Home",
    path: "home",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/Home.vue"));
      });
    }
  }]
}, {
  path: '/permission',
  component: _components["default"],
  redirect: '/permission/page',
  alwaysShow: true,
  // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'lock' // roles: ['admin', 'editor'] // you can set roles in root nav

  },
  children: [{
    path: 'page',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/permission/page'));
      });
    },
    name: 'PagePermission',
    meta: {
      title: 'pagePermission' // roles: ['admin'] // or you can only set roles in sub nav

    }
  }, {
    path: 'directive',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/permission/directive'));
      });
    },
    name: 'DirectivePermission',
    meta: {
      title: 'directivePermission' // if do not set roles, means: this page does not require permission

    }
  }, {
    path: 'role',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/permission/role'));
      });
    },
    name: 'RolePermission',
    meta: {
      title: 'rolePermission',
      roles: ['admin']
    }
  }]
}, {
  path: '/icon',
  component: _components["default"],
  children: [{
    path: 'index',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/icons/index'));
      });
    },
    name: 'Icons',
    meta: {
      title: 'icons',
      icon: 'icon',
      noCache: true
    }
  }]
}];
var _default = routesFixed;
exports["default"] = _default;