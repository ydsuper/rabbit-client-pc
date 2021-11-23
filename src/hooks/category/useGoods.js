import { getGoodsReq } from "@/api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref, watch } from "vue";

export default function useGoods() {
  const route = useRoute();
  // 存储商品数据
  const result = ref(null);
  // 标识加载状态
  const loading = ref(false);
  // 标识数据是否加载完毕
  const finished = ref(false);

  // 获取路由参数id
  const reqParams = ref({
    categoryId: route.params.id,
    page: 0, //当前页
    pageSize: 5, //数据数量
  });

  //#region 获取数据
  const getData = () => {
    // 开启加载
    loading.value = true;
    getGoodsReq(reqParams.value).then((res) => {
      console.log("page:", reqParams.value.page);
      // page=1
      if (reqParams.value.page === 1) {
        result.value = res.result;
        finished.value = false;
      } else {
        result.value = {
          ...result.value,
          items: [...result.value.items, ...res.result.items],
        };
      }
      // 关闭加载
      loading.value = false;
      // 判断数据是否加载完毕
      if (!res.result.pages || reqParams.value.page === res.result.pages) {
        finished.value = true;
      }
    });
  };
  //#endregion
  // watch监听参数更新 重新获取数据
  // watchEffect(getData);
  // watch(() => reqParams.value, getData, { immediate: true });
  watch(() => reqParams.value, getData);

  //#region 更新数据
  const onFilterSortChanged = (target) => {
    console.log("params:", target);
    reqParams.value = { ...reqParams.value, ...target, page: 1 };
  };
  //#endregion

  //#region 路由跳转
  onBeforeRouteUpdate((to) => {
    reqParams.value = {
      ...reqParams.value,
      categoryId: to.params.id,
      page: 1,
    };
  });
  //#endregion

  //#region 加载更多
  const loadMore = () => {
    console.log("page++");
    // reqParams.value.page++;
    reqParams.value = {
      ...reqParams.value,
      page: ++reqParams.value.page,
    };
  };
  //#endregion

  return { result, onFilterSortChanged, loading, finished, loadMore };
}
