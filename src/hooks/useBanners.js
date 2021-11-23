// 导入 API
import { getBanners } from "@/api/home";
import { ref } from "vue";

export default function useBanners(distributionSite = 1) {
  let banners = ref(null);
  getBanners(distributionSite).then((res) => {
    banners.value = res.result;
  });
  return banners;
}
