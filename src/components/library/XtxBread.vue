<!--<template>-->
<!--  <div class="xtx-bread">-->
<!--    <div class="xtx-bread-item">-->
<!--      <RouterLink to="/">首页</RouterLink>-->
<!--    </div>-->
<!--    <i class="iconfont icon-angle-right"></i>-->
<!--    <div class="xtx-bread-item">-->
<!--      <RouterLink to="/category/10000">电器</RouterLink>-->
<!--    </div>-->
<!--    <i class="iconfont icon-angle-right"></i>-->
<!--    <div class="xtx-bread-item">-->
<!--      <span>空调</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
import { h } from "vue";

export default {
  name: "XtxBread",
  // 使用 Javascript 编写组件模板
  render() {
    // console.log("slots:", this.$slots.default()); //@log
    // 获取插槽内容（Array）
    const slots = this.$slots.default && this.$slots.default();
    // children
    let children = [];
    slots.forEach((item, index) => {
      // 插入每个XtxBreadItem
      children.push(item);
      // 判断当前索引是否小于总长度
      if (index < slots.length - 1) {
        // 添加右箭头
        children.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    // 返回面包屑组件
    return h("div", { class: "xtx-bread" }, children);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
