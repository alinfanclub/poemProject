import { createStore } from "vuex";
import { getAuthFromCookie, getUserFromCookie } from "@/utils/cookies";

const store = createStore({
  state() {
    return {
      userName: getUserFromCookie() || "",
      token: getAuthFromCookie() || "",
    };
  },
  getters: {
    isLogin(state) {
      return state.userName !== "";
    },
  },
  mutations: {
    setUsername(state, username) {
      state.userName = username;
    },
    clearUsername(state) {
      state.userName = "";
    },
    setToken(state, token) {
      state.token = token;
    },
  },
});

export default store;
