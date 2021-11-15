// 获取store
import { useStore } from "vuex";
import { computed } from "vue";
import { getBrands } from "@/api/home";

// export default function useMenuList() {
export default function useMenuList() {
  const store = useStore();
  // 定义品牌类
  const brand = {
    id: "brand",
    name: "品牌",
    children: [{ id: "child-brand", name: "推荐品牌" }],
    brands: [],
  };

  //#region 湖区热门品牌数据
  getBrands(6).then((res) => {
    console.log("brand", res);
    brand.brands = res.result;
  });
  //#endregion

  // 获取左侧分类数据
  return computed(() => {
    // 截取一级分类中的二级分类个数
    const list = store.state.category.list.map((item) => ({
      ...item,
      children: item.children ? item.children.slice(0, 2) : [],
    }));
    // 添加品牌类
    list.push(brand);
    console.log("list", list);
    return list;
  });
}
