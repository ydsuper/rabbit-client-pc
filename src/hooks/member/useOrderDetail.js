import { getOrderDetail } from "@/api/member";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default function useOrderDetail() {
  const route = useRoute();
  // 存储订单详情数据
  const orderDetail = ref();

  // 请求获取数据
  const getData = () => {
    getOrderDetail(route.params.id).then((data) => {
      orderDetail.value = data.result;
    });
  };
  getData();

  return { orderDetail, getData };
}
