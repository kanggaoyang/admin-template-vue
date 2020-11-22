import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "@/layout/components";
import store from "../store";
import { getToken } from "../utils/auth";

// const originalPush = VueRouter.prototype.push;

// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: {
      title: "标题",
      icon: "login",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index"),
    meta: {
      title: "404",
      icon: "nofound",
      hidden: true,
    },
  },
  {
    path: "/",
    component: () => import("@/layout/components"),
    redirect: "/home",
    onlySingleChild: true,
    children: [
      {
        name: "Home",
        path: "home",
        meta: {
          icon: "none",
          title: "首页",
          hidden: false,
        },
        component: () => import("@/views/Home.vue"),
      },
    ],
    meta: {
      icon: "none",
      title: "首页",
      hidden: false,
    },
  },
  // {
  //   path: "/user",
  //   component: AppMain,
  //   redirect: "/user/list",
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/user/list"),
  //       name: "User",
  //       meta: { title: "user", icon: "user", noCache: true },
  //     },
  //     {
  //       path: "create",
  //       hidden: true,
  //       component: () => import("@/views/user/create"),
  //       name: "CreateUser",
  //       meta: { title: "创建用户", noCache: true },
  //     },
  //     {
  //       path: "edit",
  //       hidden: true,
  //       component: () => import("@/views/user/edit"),
  //       name: "EditUser",
  //       meta: { title: "编辑用户", noCache: true },
  //     },
  //   ],
  // },
  // {
  //   path: "/article",
  //   component: AppMain,
  //   redirect: "/article/list",
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/article/list"),
  //       name: "Article",
  //       meta: { title: "article", icon: "article", noCache: true },
  //     },
  //     {
  //       path: "create",
  //       hidden: true,
  //       component: () => import("@/views/article/create"),
  //       name: "CreateArticle",
  //       meta: { title: "创建文章", noCache: true },
  //     },
  //     {
  //       path: "edit",
  //       hidden: true,
  //       component: () => import("@/views/article/edit"),
  //       name: "EditArticle",
  //       meta: { title: "编辑文章", noCache: true },
  //     },

  //   ],
  // },
  // {
  //   path: "/article/detail",
  //   hidden: true,
  //   component: () => import("@/views/article/detail"),
  //   name: "DetailArticle",
  //   meta: { title: "查看详情", noCache: true },
  // },
  // {
  //   path: "/permission",
  //   component: AppMain,
  //   redirect: "/permission/admin",
  //   alwaysShow: true, // will always show the root menu
  //   name: "Permission",
  //   meta: {
  //     title: "permission",
  //     icon: "lock",
  //     // roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: "admin",
  //       component: () => import("@/views/permission/admin/index"),
  //       name: "AdminPermission",
  //       meta: {
  //         title: "管理员1",
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //     },
  //     {
  //       path: "menu",
  //       component: () => import("@/views/permission/menu/index"),
  //       name: "MenuPermission",
  //       meta: {
  //         title: "菜单1",
  //         // if do not set roles, means: this page does not require permission
  //       },
  //     },
  //     {
  //       path: "role",
  //       component: () => import("@/views/permission/role/index"),
  //       name: "RolePermission",
  //       meta: {
  //         title: "角色1",
  //         // roles: ["admin"],
  //       },
  //     },
  //   ],
  // },
];
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: routes,
    // mode: "hash",
  });

const router = createRouter();
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      if (store.state.routes && store.state.routes.length === 0) {
        const { menu: asyncroutes } = await store.dispatch("getInfo"); // 加载页面前验证 token 是否有效
        const menus = asyncRoutes(asyncroutes);
        store.commit(
          "SET_ROUTES",
          routes.concat(menus)
        );
        console.log(menus)
        router.addRoutes(menus.concat([
          {
            path: "*",
            redirect: "/404",
            meta: {
              title: "404",
              icon: "nofound",
              hidden: true,
            },
          },
        ]));
        next({ ...to, replace: true });
        // next();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
    }
  }
});

function asyncRoutes(menus) {
  if (!Array.isArray(menus)) return [];

  let parentRoutes = [];
  for (let menu of menus) {
    if (!("children" in menu)) {
      menu.children = [];
    }
    let _parent_route = {
      path: menu.path,
      component: AppMain,
      redirect: menu.redirectTo,
      children: menu.children,
      meta: {
        title: menu.meta.title,
        icon: menu.meta.icon,
        hidden: menu.meta.hidden,
      },
    };
    if (menu && menu.children && menu.children.length > 0) {
      childrenRoutes(menu.children);
    }
    parentRoutes.push(_parent_route);
  }
  return parentRoutes;
}

function childrenRoutes(childRoutes) {
  let routes = [];

  childRoutes.forEach((childroute) => {
    if (!("children" in childroute)) {
      childroute.children = [];
    }
    routes.push({
      path: childroute.path,
      component: () => import(`@/views${childroute.component}`),
      // component: () => require(`@/views${childroute.component}`).default,
      name: childroute.name,
      // redirect: childroute.redirectTo,
      meta: {
        title: childroute.meta.title,
        icon: childroute.meta.icon,
        hidden: childroute.meta.hidden,
        noCache: childroute.noCache,
      },
      children: childroute.children,
    });
    if (childroute.children.length > 0) {
      childrenRoutes(childroute.children);
    }
  });
  childRoutes.splice(0, childRoutes.length, ...routes);
}

export function resetRouter(){
  const newRouter = createRouter()
  console.log(newRouter)
  VueRouter.matcher = newRouter.matcher // reset router
}

export default router;
