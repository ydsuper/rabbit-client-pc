import { getCategoriesAPI } from "@/api/home";
// 导入分类常量数据
import { topCategories } from "@/api/constants";

const category = {
  namespaced: true, //开启命名空间
  state() {
    return {
      list: topCategories.map((name, i) => ({ name, id: i })), //分类列表
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.list = payload;
    },
    /**
     * 控制导航下拉菜单的显示
     * @param state 状态对象
     * @param index 一级分类ID
     */
    open(state, index) {
      state.list[index].open = true;
    },
    /**
     * 控制导航下拉菜单的隐藏
     * @param state 状态对象
     * @param index 一级分类ID
     */
    close(state, index) {
      state.list[index].open = false;
    },
  },
  actions: {
    /**
     * 获取分类数据
     * @param commit
     * @returns {Promise<void>}
     */
    async getCategories({ commit }) {
      const data = await getCategoriesAPI();
      console.log("res", data);
      // 为每一个元素添加open属性（下拉菜单展示属性）
      data.result.forEach((item) => (item.open = false));
      commit("setCategories", data.result);
    },
  },
};

export default category;
