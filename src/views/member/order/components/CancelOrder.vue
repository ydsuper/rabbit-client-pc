<template>
  <XtxDialog title="取消订单" v-model:visible="visible">
    <!-- 组件内容 -->
    <template #default>
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            v-for="(item, i) in cancelReason"
            :key="i"
            :class="{ active: item === selected }"
            @click="selected = item"
            >{{ item }}</a
          >
        </div>
      </div>
    </template>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="visible = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="onSureCancelOrder">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import { cancelReason } from "@/api/constants";
import Message from "@/components/library/Message";
import { cancelOrder } from "@/api/member";

export default {
  name: "CancelOrder",
  setup(props, { emit }) {
    // 控制弹框是否显示
    const visible = ref(false);
    // 存储用户选择的原因
    const selected = ref("");
    // 获取组件实例对象
    const { proxy } = getCurrentInstance();
    // 点击确认 取消订单
    const onSureCancelOrder = async () => {
      try {
        await cancelOrder({ id: proxy.id, cancelReason: selected.value });
        Message({ type: "success", text: "订单取消成功" });
        visible.value = false;
        emit("onReloadOrderList");
      } catch (error) {
        const msg = error.err.response.data.message;
        Message({ type: "error", text: `订单取消失败: ${msg}` });
      }
    };

    return { visible, cancelReason, selected, onSureCancelOrder };
  },
};
</script>
<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 250px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
