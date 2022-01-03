import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderInfoById } from "@/api/order";

export default function usePayResult() {
  // 获取路由信息
  const route = useRoute();
  // 存储订单信息
  const info = ref(null);
  // 获取订单信息
  getOrderInfoById(route.query.orderId).then((data) => {
    // 存储订单信息
    info.value = data.result;
  });

  return { info };
}
