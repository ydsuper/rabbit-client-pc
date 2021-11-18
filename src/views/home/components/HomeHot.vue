<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <Transition name="fade">
      <ul class="goods-list" v-if="homeHot">
        <li v-for="item in homeHot" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.title" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </Transition>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
// import useHomeHot from "@/hooks/home/useHomeHot";
import useLazyData from "@/hooks/useLazyData";
import { getHomeHot } from "@/api/home";
import HomeSkeleton from "@/views/home/components/HomeSkeleton";
export default {
  name: "HomeHot",
  components: { HomeSkeleton, HomePanel },
  setup() {
    // const homeHot = useHomeHot();
    const { target, result: homeHot } = useLazyData(getHomeHot);
    return { homeHot, target };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
