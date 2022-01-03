<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>待支付</p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderDetail.id }}</p>
      <p>下单时间：{{ orderDetail.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="orderDetail.orderState === 1">
        <XtxButton
          @click="$router.push('/checkout/pay?orderId=' + orderDetail.id)"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton
          type="gray"
          size="small"
          @click="onCancelOrderHandler(orderDetail.id)"
          >取消订单</XtxButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="orderDetail.orderState === 2">
        <XtxButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
          >再次购买</XtxButton
        >
      </template>
      <!-- 待收货 -->
      <template v-if="orderDetail.orderState === 3">
        <XtxButton
          type="primary"
          size="small"
          @click="onConfirmReceiverButtonClick(orderDetail.id)"
          >确认收货</XtxButton
        >
        <XtxButton type="plain" size="small" @click="onBuyAgain(orderDetail.id)"
          >再次购买</XtxButton
        >
      </template>
      <!-- 待评价 -->
      <template v-if="orderDetail.orderState === 4">
        <XtxButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="orderDetail.orderState === 5">
        <XtxButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
  <!-- 取消确认——弹窗 -->
  <CancelOrder
    ref="cancelOrderInstance"
    @onReloadOrderList="$emit('onReloadOrderList')"
  />
</template>
<script>
import CancelOrder from "@/views/member/order/components/CancelOrder";
import { ref } from "vue";
import Message from "@/components/library/Message";
import Confirm from "@/components/library/Confirm";
import { confirmReceiptGoods } from "@/api/member";
import { useRouter } from "vue-router";
export default {
  name: "DetailAction",
  components: { CancelOrder },
  // 当组件使用代码片段，需要声明emits选项
  emits: ["onReloadOrderList"],
  props: {
    orderDetail: {
      type: Object,
      default: () => ({}),
    },
    getOrderDetail: {
      type: Function,
      default: () => ({}),
    },
  },
  /*
  1. 待付款：立即付款，取消订单
  2. 待发货：再次购买
  3. 待收货：确认收货，再次购买
  4. 待评价：评价商品，再次购买，申请售后
  5. 已完成：查看评价，再次购买，申请售后
  6. 已取消：-
  * */
  setup(props, { emit }) {
    const router = useRouter();

    //#region 1.取消订单
    // 取消订单组件实例
    const cancelOrderInstance = ref(null);
    // 点击取消按钮
    const onCancelOrderHandler = (id) => {
      console.log(cancelOrderInstance);
      // 显示确认框
      cancelOrderInstance.value.visible = true;
      // 传递id
      cancelOrderInstance.value.id = id;
    };
    //#endregion

    //#region 2.确认收货
    const onConfirmReceiverButtonClick = async (id) => {
      try {
        await Confirm({ title: "确认收货", content: "确定要进行收货吗？" });
        await confirmReceiptGoods(id);
        Message({ type: "success", text: "确认收货成功" });
        emit("onReloadOrderList");
      } catch {
        return false;
      }
    };
    //#endregion

    //#region 3.再次购买
    const onBuyAgain = (id) => {
      router.push(`/checkout/order?id=${id}`);
    };
    //#endregion

    return {
      cancelOrderInstance,
      onCancelOrderHandler,
      onConfirmReceiverButtonClick,
      onBuyAgain,
    };
  },
};
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
