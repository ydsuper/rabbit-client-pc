<template>
  <div class="ref-goods" v-for="sub in topCategory?.children" :key="sub.id">
    <div class="head">
      <h3>- {{ sub.name }} -</h3>
      <p class="tag">{{ sub.saleProperties }}</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem :goods="goods" v-for="goods in sub.goods" :key="goods.id" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import useTopCategoryOne from "@/hooks/category/useTopCagegoryOne";
export default {
  name: "RecommendGoods",
  components: { GoodsItem },
  setup() {
    return { topCategory: useTopCategoryOne() };
  },
};
</script>

<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
