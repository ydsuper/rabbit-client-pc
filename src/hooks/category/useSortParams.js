import { ref } from "vue";

export default function useSortParams(emit) {
  const sortParams = ref({
    sortField: "", //排序类型
    sortMethod: "desc", //根据价格正序倒序
    inventory: false, //是否有库存
    onlyDiscount: false, //是否仅显示特惠商品
  });
  //#region 更新排序条件
  const updateSortParams = (target) => {
    // 更新排序条件
    sortParams.value = { ...sortParams.value, ...target };
    // 将排序条件传递给父组件
    emit("onSortParamsChanged", sortParams.value);
  };
  //#endregion

  return { sortParams, updateSortParams };
}
