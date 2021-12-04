<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            v-if="value.picture"
            :src="value.picture"
            :alt="value.name"
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSpecSelected(spec, value)"
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSpecSelected(spec, value)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import useGoodsSku from "@/hooks/goods/useGoodsSku";

export default {
  name: "GoodsSku",
  props: {
    specs: {
      type: Array,
      default: () => [],
    },
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 千言万语都在 useGoodsSku 当中
    const { updateSpecSelected } = useGoodsSku(props, emit);

    return { updateSpecSelected };
  },
  // setup(props) {
  //   const pathMap = createPathMap(props.skus);
  //   console.log("pathMap", pathMap);
  //   updateSpecDisabled(props.specs, pathMap);
  //   setDefaultSelected(props.skuId, props.skus, props.specs);
  //   // 更新规格中的选中状态
  //   const updateSpecSelected = (spec, value) => {
  //     if (value.disabled) return;
  //     if (value.selected) {
  //       value.selected = false;
  //     } else {
  //       spec.values.forEach((item) => (item.selected = false));
  //       value.selected = true;
  //     }
  //     updateDisabled(props.specs, pathMap);
  //   };
  //   return { updateSpecSelected };
  // },
};

//#region 创建规格查询对象的方法
// function createPathMap(skus) {
//   // 规格查询对象
//   const pathMap = {};
//
//   // 遍历所有可组合的规格组合
//   skus.forEach((sku) => {
//     // 判断当前规格组合是否有库存
//     if (sku.inventory > 0) {
//       // 获取有规格的数组
//       const valueNames = sku.specs.map((spec) => spec.valueName);
//       // 获取当前商品的规格数量
//       const max = sku.specs.length;
//       // console.log(valueNames); //@log
//       const sets = powerSet(valueNames).filter((item) => item.length);
//       // console.log(sets); //@log
//
//       // 遍历规格子级组合
//       sets.forEach((set) => {
//         const key = set.join("_");
//         // const isCompleteSku = set.length === max;
//         // 判断规格是否完整
//         const isCompleteSku = set.length === max;
//         // 判断规格查询中是否已经存储了当前规格
//         if (key && !pathMap[key]) {
//           // 规格完整：将skuId作为属性值
//           if (isCompleteSku) {
//             // 将当前规格组合的名称作为规格查询对象的属性, 将当前商品的 skuId 最为属性值
//             pathMap[key] = sku.id;
//           } else {
//             // 如果规格不完整 赋值为null
//             pathMap[key] = null;
//           }
//         }
//       });
//     }
//   });
//
//   // 返回规格查询对象
//   return pathMap;
// }
//#endregion

//#region 更新规格按钮的禁用状态
// function updateSpecDisabled(specs, pathMap) {
//   // 遍历规格数组
//   specs.forEach((spec) => {
//     console.log(spec);
//     // 遍历具体的规格信息
//     spec.values.forEach((value) => {
//       // 设置按钮的禁用状态（如果当前遍历的规格名称不在规格查询字典对象中，说明它需要被禁用）
//       value.disabled = !(value.name in pathMap);
//     });
//   });
// }
//#endregion

//#region 获取用户选中的规格
// function getUserSelected(specs) {
//   // 用于存储用户选择的规格
//   const result = [];
//
//   specs.forEach((spec, index) => {
//     // 在当前规格中查找用户选择的规格
//     const selected = spec.values.find((value) => value.selected);
//     if (selected) {
//       result[index] = selected.name;
//     } else {
//       result[index] = undefined;
//     }
//   });
//
//   return result;
// }
//#endregion

//#region 更新禁用效果
// function updateDisabled(specs, pathMap) {
//   specs.forEach((spec, index) => {
//     const selected = getUserSelected(specs);
//     console.log(selected); //@log
//
//     spec.values.forEach((value) => {
//       if (value.selected) return;
//
//       selected[index] = value.name;
//       const key = selected.filter((item) => item).join("_");
//       value.disabled = !(key in pathMap);
//     });
//   });
// }
//#endregion

//#region 设置规格默认选中效果
// function setDefaultSelected(skuId, skus, specs) {
//   if (!skuId) return;
//
//   const target = skus
//     .find((sku) => sku.id === skuId)
//     .specs.map((spec) => spec.valueName);
//   console.log("target", target);
//
//   specs.forEach((spec) => {
//     spec.values.forEach((value) => {
//       if (target.includes(value.name)) {
//         value.selected = true;
//       }
//     });
//   });
// }
//#endregion
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
