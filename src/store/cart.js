import { updateGoodsOfCartBySkuId } from "../api/cart";

const cart = {
  namespaced: true, //开启命名空间
  state() {
    return {
      list: [], //购物车列表
    };
  },
  mutations: {
    // 添加商品到购物车中
    addGoodsToCart(state, goods) {
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);

      if (index > -1) {
        // splice 方法的返回值是包含被删除元素的数组
        state.list[index].count += goods.count;
        // 删除后再添加到购物车顶端
        if (index === 0) return; //index为0 不需置顶
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        // 将商品直接添加到购物车中
        state.list.unshift(goods);
      }
    },
    // 删除购物车中指定商品
    deleteGoodsOfCartBySkuId(state, skuId) {
      // 查询index
      const index = state.list.findIndex((item) => item.skuId === skuId);
      console.log(index);
      // 删除商品
      if (index > -1) {
        // state.list.splice(index, 1); //方式一
        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },
    // 更新购物车商品
    updateGoodsBySkuId(state, payload) {
      state.list.some((item) => {
        if (item.skuId === payload.skuId) {
          item = Object.assign(item, payload);
          return true;
        }
      });
    },
  },
  actions: {
    /**
     * 添加商品到购物车中去
     * @param rootState 顶级state
     * @param commit
     * @param goods
     * @returns {Promise<void>}
     */
    async addGoodsToCart({ rootState, commit }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除购物车中的商品
    async deleteGoodsOfCartBySkuId({ rootState, commit }, payload) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("deleteGoodsOfCartBySkuId", payload);
      }
    },
    // 更新购物车中的商品（自动更新）
    async updateGoodsBySkuId({ rootState, state, commit }) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        state.list.forEach(({ skuId, id }, index) => {
          updateGoodsOfCartBySkuId({ skuId, id }).then((data) => {
            console.log(index, data);
            data.result.skuId = state.list[index].skuId;
            commit("updateGoodsBySkuId", data.result);
          });
        });
        // 未登录
        // const cartListPromise = state.list.map(({ skuId, id },index) =>
        //   updateGoodsOfCartBySkuId({ skuId, id })
        // );
        // Promise.all(cartListPromise).then((data) => {
        //   data.forEach((item, index) => {
        //     // 为返回数据添加skuId
        //     item.result.skuId = state.list[index].skuId;
        //     // 更新本地购物车数据
        //     commit("updateGoodsBySkuId", item.result);
        //   });
        // });
      }
    },
    // 更新购物车中的商品信息（手动更新）
    updateGoodsOfCartBySkuId({ rootState, commit }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        commit("updateGoodsBySkuId", goods);
      }
    },
    // 更新购物车中的所有商品的按钮状态
    selectedAll({ rootState, getters, commit }, payload) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
      } else {
        // 未登录
        getters.effectiveGoodsList.forEach((item) => {
          commit("updateGoodsBySkuId", {
            skuId: item.skuId,
            selected: payload,
          });
        });
      }
    },
  },
  getters: {
    //#region 计算有效商品
    // 可购买商品列表
    effectiveGoodsList(state) {
      return state.list.filter((item) => item.isEffective && item.stock > 0);
    },
    // 可购买商品数量
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (count, item) => count + item.count,
        0
      );
    },
    // 可购买商品总价
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (price, item) => price + Number(item.nowPrice) * item.count,
        0
      );
    },
    //#endregion
    //#region 计算无效商品
    // 不可购买的商品列表（无效商品列表）
    invalidGoodsList(state) {
      return state.list.filter((item) => !item.isEffective || item.stock === 0);
    },
    //#endregion
    //#region 计算用户选择的商品
    // 用户选择的商品列表
    userSelectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    // 用户选择的商品数量
    userSelectedGoodsCount(state, getters) {
      return getters.userSelectedGoodsList.reduce(
        (count, item) => item.count + count,
        0
      );
    },
    // 用户选择的商品总价
    userSelectedGoodsPrice(state, getters) {
      return getters.userSelectedGoodsList
        .reduce((price, item) => price + Number(item.nowPrice) * item.count, 0)
        .toFixed(2);
    },
    // 按钮是否全选
    selectedAllBtnStatus(state, getters) {
      return (
        getters.effectiveGoodsCount > 0 &&
        getters.userSelectedGoodsCount === getters.effectiveGoodsCount
      );
    },
    //#endregion
  },
};

export default cart;
