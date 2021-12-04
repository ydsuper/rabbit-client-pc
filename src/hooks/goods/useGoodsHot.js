import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getRelevantGoods } from "@/api/goods";
import { ref } from "vue";

export default function useGoodsHot(props) {
  const route = useRoute();
  const hotGoods = ref(null);
  const names = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
  const type = props.type;

  // 获取数据
  const getGoodsHot = (id) => {
    getRelevantGoods({ id, type }).then((res) => {
      hotGoods.value = res.result;
    });
  };
  getGoodsHot(route.params.id);

  // 路由跳转更新
  onBeforeRouteUpdate((to) => {
    getGoodsHot(to.params.id);
  });

  return { hotGoods, typeName: names[type] };
}
