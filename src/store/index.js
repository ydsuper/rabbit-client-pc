import { createStore } from "vuex";
//导入 vuex 持久化存储
import createPersistedState from "vuex-persistedstate";

import user from "@/store/user";
import cart from "@/store/cart";
import category from "@/store/category";

export default createStore({
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedState({
      paths: [],
      key: "",
    }),
  ],
});
