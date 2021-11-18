<template>
  <AppLayout>
    <div class="container">
      <!-- 左侧分类栏 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 产品区块 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeProduct from "@/views/home/components/HomeProduct";
import HomeSpecial from "@/views/home/components/HomeSpecial";
export default {
  name: "HomePage",
  components: {
    HomeSpecial,
    HomeProduct,
    HomeBrand,
    HomeHot,
    HomeNew,
    HomeBanner,
    HomeCategory,
    AppLayout,
  },
};
</script>
