<template>
  <AppTopNav />
  <AppHeader />
  <AppHeaderSticky />
  <slot />
  <AppFooter />
</template>
<script>
import AppTopNav from "@/components/AppTopNav";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import AppHeaderSticky from "@/components/AppHeaderSticky";
import { useStore } from "vuex";

export default {
  name: "LayoutTemplate",
  components: { AppHeaderSticky, AppHeader, AppFooter, AppTopNav },
  setup() {
    const store = useStore();
    store.dispatch("category/getCategories");
  },
};
</script>
