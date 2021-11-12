// 获取store
import { useStore } from "vuex";
import { computed } from "vue";

export default function useMenuList() {
  const store = useStore();
  // 定义品牌类
  const brand = {
    id: "brand",
    name: "品牌",
    children: [{ id: "child-brand", name: "推荐品牌" }],
    brands: [],
  };
  // 获取左侧分类数据
  return computed(() => {
    // 截取一级分类中的二级分类个数
    const list = store.state.category.list.map((item) => ({
      ...item,
      children: item.children ? item.children.slice(0, 2) : [],
    }));
    // 添加品牌类
    list.push(brand);
    return list;
  });
}
