import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";

export default function useGoods() {
  const route = useRoute();
  // 存储数据
  const result = ref(null);

  // 获取数据
  const getGoodsDetail = (id) => {
    getGoodsDetailById(id).then((res) => {
      result.value = res.result;
    });
  };
  getGoodsDetail(route.params.id);

  // 路由跳转更新
  onBeforeRouteUpdate((to) => {
    getGoodsDetail(to.params.id);
  });

  return result;
}
