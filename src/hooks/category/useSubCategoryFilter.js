// 导入 API
import { getSubCategoryFilterById } from "@/api/category";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default function useTopCagegoryOne(emit) {
  const route = useRoute();
  // 筛选分类数据
  let filters = ref(null);
  // 设置筛选数据的加载状态
  const filterLoading = ref(false);

  // 存储用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };

  //#region 【更新用户选择的筛选条件】
  const updateSelectedFilters = () => {
    // 更新用户选择的品牌ID
    selectedFilters.brandId = filters.value.selectedBrandId;
    // 重置用户选择的筛选条件
    selectedFilters.attrs = [];

    // 更新用户选择的筛选条件
    filters.value.saleProperties.forEach((item) => {
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        selectedFilters.attrs.push({
          groupName: item.name,
          propertyName: item.selectedFilterName,
        });
      }
    });
    emit("onFilterChanged", selectedFilters);
  };
  //#endregion

  //#region 【获取筛选数据】
  const getData = (id) => {
    filterLoading.value = true;
    getSubCategoryFilterById(id).then((res) => {
      const data = res.result;
      // 给品牌筛选条件加上 "全部" 选项
      data.brands.unshift({ id: null, name: "全部" });
      // 在其他筛选条件加上 "全部" 选项
      data.saleProperties.forEach((item) => {
        item.properties.unshift({ id: null, name: "全部" });
        // 存储用户选择的筛选条件
        item.selectedFilterName = "全部";
      });
      // 设置默认选中的品牌的ID
      data.selectedBrandId = null;
      // 存储筛选数据
      filters.value = res.result;
      // 更新筛选数据的加载状态
      filterLoading.value = false;
    });
  };
  //#endregion

  getData(route.params.id);

  // 路由更新周期
  onBeforeRouteUpdate((to) => {
    // console.log("toUrl", to); //@log
    getData(to.params.id);
  });

  return { filterLoading, updateSelectedFilters, filters };
}
