<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeComponentName = 'GoodsDetail'"
        :class="{ active: activeComponentName === 'GoodsDetail' }"
        href="javascript:"
        >商品详情</a
      >
      <a
        @click="activeComponentName = 'GoodsComment'"
        :class="{ active: activeComponentName === 'GoodsComment' }"
        href="javascript:"
        >商品评价<span>({{ goodsDetail.commentCount }}+)</span></a
      >
    </nav>
    <!-- 切换组件内容：根据组件名称动态渲染组件 -->
    <!-- <GoodsDetail v-if="activeComponentName === 'GoodsDetail'"></GoodsDetail> -->
    <!-- <GoodsComment v-if="activeComponentName === 'GoodsComment'"></GoodsComment> -->
    <component :is="activeComponentName"></component>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import GoodsDetail from "@/views/goods/components/GoodsDetail";
import GoodsComment from "@/views/goods/components/GoodsComment";

export default {
  name: "GoodsTab",
  components: { GoodsDetail, GoodsComment },
  setup() {
    const activeComponentName = ref("GoodsDetail");
    const goodsDetail = inject("goodsDetail");
    return { activeComponentName, goodsDetail };
  },
};
</script>
<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
