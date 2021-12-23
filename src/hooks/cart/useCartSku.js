import { ref } from "vue";
import { getSkuInfoBySkuId } from "../../api/cart";
import Message from "../../components/library/Message";
import { useStore } from "vuex";

export default function useCartSku(props) {
  const store = useStore();
  // 供用户选择的规格选项数据 所有可组合的规格
  const specsAndSkus = ref(null);
  // sku 数据的加载状态
  const loadingSku = ref(false);

  // 控制规格组件的显示与隐藏
  const visible = ref(false);
  // 获取弹层容器
  const target = ref(null);
  // 显示
  const show = () => {
    visible.value = true;
    loadingSku.value = true;

    getSkuInfoBySkuId(props.skuId).then((data) => {
      specsAndSkus.value = data.result;
      loadingSku.value = false;
    });
  };
  // 隐藏
  const hide = () => {
    visible.value = false;
  };
  // 切换
  const toggle = () => {
    visible.value ? hide() : show();
  };

  // 存储用户选择的新的商品规格
  let newSku = null;
  // 监听规格信息变化
  const onSpecChange = (sku) => {
    newSku = sku;
  };

  // 提交规格
  const submitSku = () => {
    // 无论如何都隐藏规格选择框
    hide();
    // 判断用户选择的商品规格是否和之前一样
    if (!newSku || (newSku && newSku.skuId === props.skuId)) {
      console.log(newSku, props.skuId);
      return Message({ type: "warn", text: "商品规格信息没有发生变化" });
    }
    // 更新商品规格
    store.dispatch("cart/updateGoodsOfCartBySkuChanged", {
      oldSkuId: props.skuId,
      newSku,
    });
  };

  return {
    visible,
    target,
    toggle,
    specsAndSkus,
    loadingSku,
    onSpecChange,
    submitSku,
  };
}
