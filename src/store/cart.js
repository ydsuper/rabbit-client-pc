import {
  addGoodsToCart,
  deleteGoodsOfCartBySkuIds,
  getCartList,
  mergeCart,
  selectAllOrUnselectAll,
  updateGoodsBySkuId,
  updateGoodsOfCartBySkuId,
} from "../api/cart";

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
    // 设置购物车列表
    setCart(state, payload) {
      state.list = payload;
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
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 发送请求，将商品添加到服务器购物车
        await addGoodsToCart({
          skuId: goods.skuId,
          count: goods.count,
        });
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除购物车中的商品
    async deleteGoodsOfCartBySkuId({ rootState, commit, dispatch }, skuId) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        await deleteGoodsOfCartBySkuIds([skuId]);
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        commit("deleteGoodsOfCartBySkuId", skuId);
      }
    },
    // 更新购物车中的商品（自动更新）
    async updateGoodsBySkuId({ rootState, state, commit, dispatch }) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        state.list.forEach(({ skuId, id }, index) => {
          updateGoodsBySkuId({ skuId, id }).then((data) => {
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
    async updateGoodsOfCartBySkuId({ rootState, commit, dispatch }, goods) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 更新商品信息
        console.log(goods);
        await updateGoodsOfCartBySkuId(goods);
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        commit("updateGoodsBySkuId", goods);
      }
    },
    // 更新购物车中的所有商品的按钮状态
    async selectedAll({ rootState, getters, commit, dispatch }, isAll) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 登录
        // 获取商品 skuId 数组
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        await selectAllOrUnselectAll({ ids, selected: isAll });
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        getters.effectiveGoodsList.forEach((item) => {
          commit("updateGoodsBySkuId", {
            skuId: item.skuId,
            selected: isAll,
          });
        });
      }
    },
    // 批量删除商品（用户选择、无效商品）
    async deleteGoodsOfCartByUserSelectedOrInvalid(
      { getters, rootState, commit, dispatch },
      flag
    ) {
      if (rootState.user.profile.token) {
        // 登录
        // 获取要批量删除的 skuId 数组
        const skuIds = getters[flag].map((item) => item.skuId);
        // 请求批量删除商品
        await deleteGoodsOfCartBySkuIds(skuIds);
        dispatch("updateCartList");
      } else {
        // 未登录
        getters[flag].forEach((item) => {
          commit("deleteGoodsOfCartBySkuId", item.skuId);
        });
      }
    },
    // 更新商品规格信息
    async updateGoodsOfCartBySkuChanged(
      { rootState, state, commit, dispatch },
      { oldSkuId, newSku }
    ) {
      if (rootState.user.profile.token) {
        // 登录（因未提供对应接口，采取先删除、再添加的方式达到修改的目的）
        // 查找原商品
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        // 删除原商品
        await deleteGoodsOfCartBySkuIds([oldSkuId]);
        // 添加新商品（即修改过规格后的原商品）
        await addGoodsToCart({
          skuId: newSku.skuId,
          count: oldGoods.count,
        });
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        const newGoods = {
          ...oldGoods,
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.specsText,
        };
        // 删除原商品
        commit("deleteGoodsOfCartBySkuId", oldSkuId);
        // 插入新商品
        commit("addGoodsToCart", newGoods);
      }
    },
    // 合并购物车
    async mergeCart({ state, commit }) {
      if (state.list.length === 0) return;
      // 待合并的购物车列表
      const carts = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      try {
        // 发送合并购物车请求
        await mergeCart(carts);
        // 清空购物车
        commit("setCart", []);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 更新购物车商品
    async updateCartList({ rootState, commit }) {
      if (rootState.user.profile.token) {
        // 登录
        const data = await getCartList();
        commit("setCart", data.result);
      } else {
        // 未登录
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
