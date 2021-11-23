<template>
  <AppLayout>
    <div class="sub-category">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${category?.topCategory?.id}`">{{
            category?.topCategory?.name
          }}</XtxBreadItem>
          <XtxBreadItem
            :id="category?.subCategory?.id"
            :path="`/category/sub/${category?.subCategory?.id}`"
            >{{ category?.subCategory?.name }}</XtxBreadItem
          >
        </XtxBread>
        <!-- 商品筛选组件 -->
        <SubFilter @onFilterChanged="onFilterSortChanged" />
        <!-- 商品区块-->
        <div class="goods-list">
          <!-- 商品排序 -->
          <SubSort @onSortParamsChanged="onFilterSortChanged" />
          <!-- 商品列表 -->
          <GoodsList v-if="goods" :goods="goods.items" />
          <!-- 无限列表加载组件 -->
          <XtxInfiniteLoading
            :loading="loading"
            :finished="finished"
            @infinite="loadMore"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import useBread from "@/hooks/category/useBread";
import SubFilter from "@/views/category/components/SubFilter";
import SubSort from "@/views/category/components/SubSort";
import GoodsList from "@/views/category/components/GoodsList";
import useGoods from "@/hooks/category/useGoods";
export default {
  name: "SubCategoryPage",
  components: { GoodsList, SubSort, SubFilter, AppLayout },
  setup() {
    // 获取用户选择的筛选条件
    // const onFilterChanged = (target) => {
    //   console.log("fliterChange:", target);
    // };
    // 获取排序条件查询
    // const onSortParamsChanged = (target) => {
    //   console.log("sortParams:", target);
    // };

    // 获取商品数据
    const {
      result: goods,
      onFilterSortChanged,
      loading,
      finished,
      loadMore,
    } = useGoods();

    return {
      category: useBread("sub"),
      goods,
      onFilterSortChanged,
      loading,
      finished,
      loadMore,
    };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
