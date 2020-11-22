import Vue from "vue";
import Vuex from "vuex";
import { login, userinfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    routes: [], 
  },
  getters: {
    token(state) {
      return state.token;
    },
    routes(state){
      return state.routes;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }

  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { code, message, token } = response;
            commit("SET_TOKEN", token);
            setToken(token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
      removeToken();
      resetRouter()
    },
    getInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        userinfo({ token: state.token }).then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          // console.log(data.menu)
          commit('SET_ROUTES', data.menu)

          resolve(data)
        }).catch(error=>{
          removeToken()  // 暂时为权限做的限制
          reject(error)
        });
      });
    },
  },
  modules: {},
});

