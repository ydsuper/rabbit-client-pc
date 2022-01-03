<template>
  <router-view />
  <!--  <LearnJSX />-->
  <!--  <XtxTabs v-model:active="active">-->
  <!--    <XtxTabTitle v-for="(item, i) in tabData" :key="i">{{-->
  <!--      item.title-->
  <!--    }}</XtxTabTitle>-->
  <!--    <XtxTabContent v-for="(item, i) in tabData" :key="i">{{-->
  <!--      item.content-->
  <!--    }}</XtxTabContent>-->
  <!--  </XtxTabs>-->
</template>

<script>
import request from "@/utils/request";
// import LearnJSX from "@/Test/LearnJSX";

export default {
  // components: { LearnJSX },
  setup() {
    request.get("/message").then((res) => {
      console.log("hello msw", res);
    });
  },
};
</script>

<style lang="less">
//@import "./assets/styles/variables";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
