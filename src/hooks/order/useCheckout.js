import { ref } from "vue";
import { createOrder, submitOrder } from "@/api/order";
import Message from "@/components/library/Message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { createOrderById } from "@/api/member";

export default function useCheckout() {
  const router = useRouter();
  const store = useStore();
  const route = useRoute();

  // 创建订单并存储订单信息
  const order = ref(null);
  // 收货地址组件的实例对象
  const checkoutAddressInstance = ref(null);

  // 判断路由中是否有ID参数
  if (route.query.id) {
    // 创建新的订单（根据订单ID）
    createOrderById(route.query.id).then((data) => {
      order.value = data.result;
    });
  } else {
    // 发起订单创建申请（无ID参数 根据服务器购物车创建订单）
    createOrder().then((data) => {
      order.value = data.result;
    });
  }

  //#region 创建提交订单信息
  const onSubmitOrder = () => {
    // 判断是否选择了地址
    // 收集订单信息
    const orderParams = {
      // 商品集合
      goods: order.value.goods.map((item) => ({
        skuId: item.skuId,
        count: item.count,
      })),
      addressId: checkoutAddressInstance.value.finalAddress?.id, // 地址id
      deliveryTimeType: 1, // 配送时间类型:，1为不限，2为工作日，3为双休或假日
      payType: 1, // 支付方式:1为在线支付，2为货到付款
      payChannel: 1, // 支付渠道:1支付宝、2微信
      buyerMessage: "", // 买家留言
    };
    // 判断收获地址id是否存在
    if (!orderParams.addressId) {
      return Message({ type: "error", text: "请添加收货地址" });
    }
    // 提交订单
    submitOrder(orderParams)
      .then((data) => {
        console.log(data);
        // 1.跳转到支付页面，将订单id作为路由参数
        router.push({
          path: "/checkout/pay",
          query: {
            orderId: data.result.id,
          },
        });
        // 2.将服务端购物车中的商品同步到客户端
        store.dispatch("cart/updateGoodsBySkuId");
      })
      .catch(() => {
        Message({ type: "error", text: "订单提交失败" });
      });
  };

  //#endregion

  return { order, checkoutAddressInstance, onSubmitOrder };
}
