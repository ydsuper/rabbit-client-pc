<template>
  <div class="goods-image">
    <div
      class="large"
      :style="{
        backgroundImage: `url(${images[current]}`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
      v-show="show"
    ></div>
    <div class="middle" ref="middleEle">
      <div
        class="layer"
        v-show="show"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
      ></div>
      <img :src="images[current]" alt="" />
    </div>
    <ul class="small">
      <li
        v-for="(item, i) in images"
        :key="i"
        :class="{ active: current === i }"
        @mouseenter="current = i"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const current = ref(0);

    //#region 【放大镜效果】
    // 1.控制镜片和大图的显示隐藏
    const show = ref(false);
    // 2.存储中图元素
    const middleEle = ref(null);
    // 3.获取鼠标和元素之间的位置关系
    const { isOutside, elementX, elementY } = useMouseInElement(middleEle);
    // 4.存储镜片元素位置
    const layerPosition = ref({ left: 0, top: 0 });
    // 5.存储大图背景位置
    const bgPosition = ref({ x: 0, y: 0 });

    // 6.监听放大镜位置变化
    watch([isOutside, elementX, elementY], ([isOut, x, y]) => {
      // 放大镜显示和隐藏
      show.value = !isOut;

      // 更新放大镜位置
      layerPosition.value = {
        left: x - 100,
        top: y - 100,
      };
      // 限制放大镜位置
      if (layerPosition.value.left < 0) layerPosition.value.left = 0;
      else if (layerPosition.value.left > 200) layerPosition.value.left = 200;
      if (layerPosition.value.top < 0) layerPosition.value.top = 0;
      else if (layerPosition.value.top > 200) layerPosition.value.top = 200;

      // 更新大图背景位置
      bgPosition.value = {
        x: -layerPosition.value.left * 2,
        y: -layerPosition.value.top * 2,
      };
    });
    //#endregion

    return {
      current,
      show,
      middleEle,
      isOutside,
      layerPosition,
      bgPosition,
    };
  },
};
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
