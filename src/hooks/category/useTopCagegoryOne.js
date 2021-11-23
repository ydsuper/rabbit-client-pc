// 导入 API
import { getTopCategoryById } from "@/api/category";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default function useTopCagegoryOne() {
  const route = useRoute();
  let result = ref(null);

  const getData = (id) => {
    getTopCategoryById(id).then((res) => {
      result.value = res.result;
    });
  };
  // 获取data
  getData(route.params.id);

  // 路由更新周期
  onBeforeRouteUpdate((to) => {
    // console.log("toUrl", to); //@log
    getData(to.params.id);
  });

  return result;
}
