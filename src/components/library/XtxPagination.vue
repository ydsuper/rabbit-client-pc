<template>
  <div class="xtx-pagination">
    <a @click="currentPage > 1 ? currentPage-- : ''" href="javascript:"
      >上一页</a
    >
    <span v-show="pageInfo.start > 1">...</span>
    <a
      href="javascript:"
      v-for="item in pageInfo.buttons"
      :key="item"
      :class="{ active: item === currentPage }"
      @click="currentPage = item"
      >{{ item }}</a
    >
    <span v-show="pageInfo.end < pageInfo.totalPage">...</span>
    <a
      @click="currentPage < pageInfo.totalPage ? currentPage++ : ''"
      href="javascript:"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, reactive } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxPagination",
  props: {
    // 当前页
    page: {
      type: Number,
      default: 1,
    },
    // 总数据条数
    count: {
      type: Number,
      default: 1,
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const currentPage = useVModel(props, "page", emit);
    // 分页数据
    const p = reactive({
      totalCount: props.count, // 总数据条数
      size: props.pageSize, // 每页数据条数
      buttonNumber: 5, // 页码个数
    });
    // 计算偏移量
    const pageOffset = Math.floor(p.buttonNumber / 2);
    //#region 计算页码
    // 1.用户点击更改页码 2.筛选条件发生变化
    const pageInfo = computed(() => {
      let start = currentPage.value - pageOffset;
      let end = start + p.buttonNumber - 1;
      // 总页数
      const totalPage = Math.ceil(p.totalCount / p.size);

      // 控制范围
      if (start < 1) {
        start = 1;
        // 利用tmp 判断最左偏移量（不改变数组）
        const tmp = p.buttonNumber;
        end = tmp > totalPage ? totalPage : tmp;
      } else if (end > totalPage) {
        end = totalPage;
        // 利用tmp 判断最右偏移量（不改变数组）
        const tmp = end - p.buttonNumber + 1;
        start = tmp < 1 ? 1 : tmp;
      }

      const buttons = [];
      // 生成展示页码
      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }
      return { buttons, totalPage, start, end };
    });
    //#endregion

    return { pageInfo, currentPage };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
