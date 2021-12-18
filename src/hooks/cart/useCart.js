import { useStore } from "vuex";
import { computed } from "vue";
import Message from "../../components/library/Message";
import Confirm from "../../components/library/Confirm";

export default function useCart() {
  const store = useStore();

  //#region 可购买商品数据
  // 可购买商品列表
  const effectiveGoodsList = computed(
    () => store.getters["cart/effectiveGoodsList"]
  );
  // 可购买商品数量
  const effectiveGoodsCount = computed(
    () => store.getters["cart/effectiveGoodsCount"]
  );
  // 可购买商品总价
  const effectiveGoodsPrice = computed(
    () => store.getters["cart/effectiveGoodsPrice"]
  );
  //#endregion

  // 删除商品方法
  const deleteGoodsOfCartBySkuId = (skuId) => {
    Confirm({
      content: "您确定要删除该商品吗？",
    })
      .then(() => {
        store.dispatch("cart/deleteGoodsOfCartBySkuId", skuId).then(() => {
          Message({ type: "success", text: "购物车的商品删除成功" });
        });
      })
      .catch(() => {});
  };

  //#region 失效商品数据
  const invalidGoodsList = computed(
    () => store.getters["cart/invalidGoodsList"]
  );
  //#endregion

  //#region 用户选择的商品数据
  // 用户选择的商品数量
  const userSelectedGoodsCount = computed(
    () => store.getters["cart/userSelectedGoodsCount"]
  );
  // 用户选择的商品价格
  const userSelectedGoodsPrice = computed(
    () => store.getters["cart/userSelectedGoodsPrice"]
  );
  //#endregion

  //#region 更新购物车
  // 更新本地购物车数据
  const updateCartList = () => {
    store.dispatch("cart/updateGoodsBySkuId").then(() => {
      Message({ type: "success", text: "本地购物车的商品信息更新成功" });
    });
  };

  // 获取全选按钮的状态
  const selectAllButtonStatus = computed(
    () => store.getters["cart/selectedAllBtnStatus"]
  );

  return {
    effectiveGoodsList,
    effectiveGoodsCount,
    effectiveGoodsPrice,
    deleteGoodsOfCartBySkuId,
    invalidGoodsList,
    userSelectedGoodsCount,
    userSelectedGoodsPrice,
    updateCartList,
    selectAllButtonStatus,
  };
}
