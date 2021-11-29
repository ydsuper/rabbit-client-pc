import powerSet from "@/verdors/powerSet";
import { computed } from "vue";

export default function useGoodsSku(props) {
  //#region 一、更新商品规格中的选中状态
  const updateSpecSelected = (spec, value) => {
    if (value.disabled) return;
    if (value.selected) {
      value.selected = false;
    } else {
      spec.values.forEach((item) => {
        item.selected = false;
      });
      value.selected = true;
    }
    updateDisabled(props.specs, pathMap);
  };
  //#endregion

  //#region 二、创建规格查询对象
  const createPathMap = (skus) => {
    const pathMap = {};
    skus.forEach((sku) => {
      if (sku.inventory > 0) {
        const valueNames = sku.specs.map((item) => item.valueName);
        const maxLength = valueNames.length;
        // 使用：幂集算法
        const sets = powerSet(valueNames).filter((item) => item.length);
        sets.forEach((item) => {
          const key = item.join("_");
          const isCompleteSku = item.length === maxLength;
          if (key && !pathMap[key]) {
            if (isCompleteSku) {
              pathMap[key] = sku.id;
            } else {
              pathMap[key] = null;
            }
          }
        });
      }
    });
    return pathMap;
  };
  // 获取规格查询对象
  const pathMap = createPathMap(props.skus);
  //#endregion

  //#region 三、更新规格禁用状态
  //（初始禁用）
  const initDisabled = (specs, pathMap) => {
    specs.forEach((spec) => {
      spec.values.forEach((value) => {
        value.disabled = !(value.name in pathMap);
      });
    });
  };
  //（更新禁用）
  const updateDisabled = (specs, pathMap) => {
    specs.forEach((spec, index) => {
      if (userSelected.value[index]) return;
      console.log("判断undefined", spec.name); //@log
      const selected = JSON.parse(JSON.stringify(userSelected.value));
      console.log("当前选择", selected); //@log
      spec.values.forEach((value) => {
        selected[index] = value.name;
        console.log("判断选择", selected); //@log
        const key = selected.filter((item) => item).join("_");
        value.disabled = !(key in pathMap);
      });
    });
  };
  //#endregion

  //#region 四、获取用户选择的规格（计算属性）
  const userSelected = computed(() => {
    const result = [];
    props.specs.forEach((spec, index) => {
      // 获取被选中的元素
      const selected = spec.values.find((item) => item.selected);
      if (selected) {
        result[index] = selected.name;
      } else {
        result[index] = undefined;
      }
    });
    return result;
  });
  console.log(userSelected);
  //#endregion

  //#region 五、设置默认选中
  const setDefaultSelected = (skuId, skus, specs) => {
    // const target = skus.find((sku) => (sku.id = skuId));
    // const defaultSelected = target.specs.map((item) => item.valueName);
    const defaultSelected = skus
      .find((sku) => (sku.id = skuId))
      .specs.map((item) => item.valueName);
    specs.forEach((spec, index) => {
      spec.values.forEach((value) => {
        if (value.name === defaultSelected[index]) value.selected = true;
      });
    });
  };
  //#endregion

  // 初始化按钮禁用状态
  initDisabled(props.specs, pathMap);
  // 设置默认选中
  setDefaultSelected(props.skuId, props.skus, props.specs);

  return { updateSpecSelected, createPathMap, updateDisabled };
}
