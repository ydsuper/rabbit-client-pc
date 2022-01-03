<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction
        :orderDetail="orderDetail"
        :getOrderDetail="getData"
        @onReloadOrderList="getData()"
      />
      <!-- 步骤条-->
      <XtxSteps
        v-if="orderDetail"
        :active="orderDetail.orderState === 6 ? 1 : orderDetail.orderState"
      >
        <XtxStepItem
          title="提交订单"
          :desc="orderDetail.createTime"
        ></XtxStepItem>
        <XtxStepItem title="付款成功" :desc="orderDetail.payTime"></XtxStepItem>
        <XtxStepItem
          title="商品发货"
          :desc="orderDetail.consignTime"
        ></XtxStepItem>
        <XtxStepItem title="确认收货" :desc="orderDetail.endTime"></XtxStepItem>
        <XtxStepItem
          title="订单完成"
          :desc="orderDetail.evaluationTime"
        ></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏:使用 Suspense 确保异步顺序 -->
      <Suspense v-if="orderDetail">
        <template v-slot:default>
          <DetailLogistics v-if="[3, 4, 5].includes(orderDetail.orderState)" />
        </template>
        <template v-slot:fallback>loading...</template>
      </Suspense>
      <!-- 订单商品信息 -->
      <DetailOrderGoods :orderDetail="orderDetail" />
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import useOrderDetail from "@/hooks/member/useOrderDetail";
import DetailAction from "@/views/member/order/components/DetailAction";
import DetailLogistics from "@/views/member/order/components/DetailLogistics";
import DetailOrderGoods from "@/views/member/order/components/DetailOrderGooods";
export default {
  name: "OrderDetailPage",
  components: {
    DetailOrderGoods,
    DetailLogistics,
    DetailAction,
    AppMemberLayout,
  },
  setup() {
    const { orderDetail, getData } = useOrderDetail();

    return { orderDetail, getData };
  },
};
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
