// 导入 API
import { getBanners } from "@/api/home";
import { ref } from "vue";

export default function useBanners() {
  let banners = ref(null);
  getBanners().then((res) => {
    banners.value = res.result;
  });
  return banners;
}
