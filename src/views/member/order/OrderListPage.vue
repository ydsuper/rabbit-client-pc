<template>
  <AppMemberLayout>
    <!-- 订单选项卡 -->
    <div class="member-order">
      <XtxTabs v-model:active="active">
        <XtxTabTitle v-for="status in orderStatus" :key="status.name">{{
          status.label
        }}</XtxTabTitle>
      </XtxTabs>

      <!-- 订单列表 -->
      <div class="order-list" v-if="orderList">
        <div class="loading" v-if="loading"></div>
        <template v-if="orderList && !loading && orderList.items.length > 0">
          <OrderItem
            :order="item"
            v-for="item in orderList.items"
            :key="item.id"
            @onCancelOrder="onCancelOrder"
            @onReloadOrderList="getData"
            @onViewLogistics="onViewLogistics"
          />
        </template>
        <div v-if="!loading && orderList?.items?.length === 0" class="none">
          暂无数据
        </div>
        <XtxPagination
          v-if="orderList && totalPage > 1"
          v-model:page="reqParams.page"
          :pageSize="reqParams.pageSize"
          :count="totalCount"
        />
      </div>
    </div>
  </AppMemberLayout>
  <!-- 取消订单——弹窗 -->
  <CancelOrder ref="cancelOrderInstance" @onReloadOrderList="getData" />
  <!-- 查看物流——弹窗 -->
  <OrderLogistics ref="orderLogisticsInstance" />
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { orderStatus } from "@/api/constants";
import useOrderList from "@/hooks/member/useOrderList";
import OrderItem from "@/views/member/order/OrderItem";
import CancelOrder from "@/views/member/order/components/CancelOrder";
import OrderLogistics from "@/views/member/order/components/OrderLogistics";
export default {
  name: "OrderListPage",
  components: { OrderLogistics, CancelOrder, OrderItem, AppMemberLayout },
  setup() {
    const {
      active,
      orderList,
      reqParams,
      loading,
      totalCount,
      totalPage,
      cancelOrderInstance,
      onCancelOrder,
      getData,
      orderLogisticsInstance,
      onViewLogistics,
    } = useOrderList();

    return {
      active,
      orderStatus,
      orderList,
      reqParams,
      loading,
      totalCount,
      totalPage,
      cancelOrderInstance,
      onCancelOrder,
      getData,
      orderLogisticsInstance,
      onViewLogistics,
    };
  },
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}

.loading {
  height: calc(100% - 60px);
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 60px;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center 18%;
}

.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
  background: rgba(255, 255, 255, 0.9);
}
</style>
