// 导入 API
import { getHomeHot } from "@/api/home";
import { ref } from "vue";

export default function useNewGoods() {
  let homeHot = ref(null);
  getHomeHot().then((res) => {
    homeHot.value = res.result;
  });
  return homeHot;
}
