<template>
  <div class="app-header-sticky" :class="{ show: scrollTop > 78 }">
    <div class="container" v-show="scrollTop > 78">
      <RouterLink to="/" class="logo" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from "@/components/AppHeaderNav";
import useScrollTop from "@/hooks/useScrollTop";
// import { useWindowScroll } from "@vueuse/core";
export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNav },
  setup() {
    const scrollTop = useScrollTop();
    // const { y: scrollTop } = useWindowScroll();

    console.log("top", scrollTop);
    return { scrollTop };
  },
};
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transform: none;
    opacity: 1;
    transition: all 0.3s linear;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
