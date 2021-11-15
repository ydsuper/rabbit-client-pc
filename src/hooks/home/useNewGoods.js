// 导入 API
import { getNewGoods } from "@/api/home";
import { ref } from "vue";

export default function useNewGoods() {
  let banners = ref(null);
  getNewGoods().then((res) => {
    banners.value = res.result;
  });
  return banners;
}
