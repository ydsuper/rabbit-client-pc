<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
export default {
  name: "HomePage",
  components: { HomeCategory, AppLayout },
};
</script>
