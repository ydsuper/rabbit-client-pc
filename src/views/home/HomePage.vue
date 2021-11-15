<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
      <HomeNew />
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
export default {
  name: "HomePage",
  components: { HomeNew, HomeBanner, HomeCategory, AppLayout },
};
</script>
