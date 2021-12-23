import { useStore } from "vuex";
import { computed } from "vue";
import Message from "../../components/library/Message";
import Confirm from "../../components/library/Confirm";
import { useRouter } from "vue-router";

export default function useCart() {
  const store = useStore();
  const router = useRouter();

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

  //#region 删除单个商品
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
  //#endregion

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
  //#endregion

  // 获取全选按钮的状态
  const selectAllButtonStatus = computed(
    () => store.getters["cart/selectedAllBtnStatus"]
  );

  //#region 批量删除用户选择的商品、清空失效商品
  const deleteBatchGoodsOfCart = (flag) => {
    let content = "";
    // 判断flag的类型 即要删除的商品类型
    if (flag === "userSelectedGoodsList") {
      if (userSelectedGoodsCount.value === 0) {
        Message({ type: "warn", text: "请选择要删除的商品" });
        return;
      }
      content = "您确定要删除所有选中的商品吗";
    } else if (flag === "invalidGoodsList") {
      if (invalidGoodsList.value.length === 0) {
        Message({ type: "warn", text: "没有失效的商品" });
        return;
      }
      content = "您确定要清空所有失效的商品吗";
    }
    // 弹框确认是否要删除
    Confirm({ content })
      .then(() => {
        store
          .dispatch("cart/deleteGoodsOfCartByUserSelectedOrInvalid", flag)
          .then(() => {
            Message({ type: "success", text: "商品删除成功" });
          });
      })
      .catcu(() => {});
  };
  //#endregion

  // 更新购物车仲的商品数量
  const changeGoodsCountOfCartBySkuId = ({ skuId, count }) => {
    store.dispatch("cart/updateGoodsOfCartBySkuId", { skuId, count });
  };

  // 下单结算按钮
  const jumpToCheckout = () => {
    // 判断用户是否选择了商品
    if (userSelectedGoodsCount.value === 0) {
      return Message({ type: "warn", text: "请至少选择一个商品" });
    }
    // 跳转到结算页面
    router.push("/checkout/order");
  };

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
    deleteBatchGoodsOfCart,
    changeGoodsCountOfCartBySkuId,
    jumpToCheckout,
  };
}
