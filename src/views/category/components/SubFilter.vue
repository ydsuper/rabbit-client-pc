<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filters && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="item in filters.brands"
          :key="item.id"
          :class="{ active: filters.selectedBrandId === item.id }"
          @click="
            filters.selectedBrandId = item.id;
            updateSelectedFilters();
          "
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filters.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="property in item.properties"
          :key="property.id"
          :class="{ active: item.selectedFilterName === property.name }"
          @click="
            item.selectedFilterName = property.name;
            updateSelectedFilters();
          "
          >{{ property.name }}</a
        >
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import useSubCategoryFilter from "@/hooks/category/useSubCategoryFilter";
import XtxSkeleton from "@/components/library/XtxSkeleton";
export default {
  name: "SubFilter",
  components: { XtxSkeleton },
  setup(props, { emit }) {
    // 二级分类数据筛选
    const { filterLoading, updateSelectedFilters, filters } =
      useSubCategoryFilter(emit);

    return {
      updateSelectedFilters,
      filters,
      filterLoading,
    };
  },
};
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
