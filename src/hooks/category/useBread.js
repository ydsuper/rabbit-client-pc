// 导入 API
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default function useBread(type = "top") {
  const route = useRoute();
  const store = useStore();

  // 一级 面包屑
  if (type === "top") {
    // 利用computed计算属性 一开始没有分类数据id
    return computed(() => {
      return store.state.category.list.find(
        (item) => item.id === route.params.id
      );
    });
  }
  // 一级>二级 面包屑
  else if (type === "sub") {
    return computed(() => {
      let topCategory = null;
      let subCategory = null;
      // 遍历一级分类
      store.state.category.list.forEach((top) => {
        // 遍历二级分类
        top.children?.forEach((sub) => {
          // 判断分类id是否和路由参数id一样
          if (sub.id === route.params.id) {
            console.log("一二级:", top, sub);
            topCategory = top;
            subCategory = sub;
          }
        });
      });
      return { topCategory, subCategory };
    });
  }
}
