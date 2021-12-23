import { ref } from "vue";
import { createOrder } from "@/api/order";

export default function useCheckout() {
  // 创建订单并存储订单信息
  const order = ref(null);

  // 发起订单创建申请
  createOrder().then((data) => {
    order.value = data.result;
  });

  return { order };
}
