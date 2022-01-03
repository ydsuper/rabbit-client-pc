<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span
        class="down-time"
        v-if="order.orderState === 1 && order.countdown !== -1"
      >
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ dayjs.unix(order.countdown).format("mm分ss秒") }}</b>
      </span>
      <!-- 订单状态为 已完成(5)或已取消(6)时可以删除订单 -->
      <a
        v-if="{ 5: 1, 6: 1 }[order.orderState]"
        href="javascript:"
        class="del"
        @click="onDeleteButtonClick(order.id)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <RouterLink class="image" :to="`/goods/${goods.spuId}`">
              <img :src="goods.image" alt="goods.name" />
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }}</span>
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <p v-if="order.orderState === 3">
          <a
            href="javascript:"
            class="green"
            @click="onViewLogisticsButtonClick(order.id)"
            >查看物流</a
          >
        </p>
        <p v-if="order.orderState === 4">
          <a href="javascript:" class="green">评价商品</a>
        </p>
        <p v-if="order.orderState === 5">
          <a href="javascript:" class="green">查看评价</a>
        </p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线付款</p>
      </div>
      <div class="column action">
        <XtxButton
          v-if="order.orderState === 1"
          type="primary"
          size="small"
          @click="$router.push(`/checkout/pay?orderId=${order.id}`)"
          >立即付款</XtxButton
        >
        <XtxButton
          v-if="order.orderState === 3"
          type="primary"
          size="small"
          @click="onConfirmReceiptButtonClick(order.id)"
          >确认收货</XtxButton
        >
        <p>
          <a
            href="javascript:"
            @click="$router.push(`/member/order/${order.id}`)"
            >查看详情</a
          >
        </p>
        <p v-if="order.orderState === 1">
          <a href="javascript:" @click="onCancelButtonClick(order.id)"
            >取消订单</a
          >
        </p>
        <p v-if="{ 2: 1, 3: 1, 4: 1, 5: 1 }[order.orderState]">
          <a
            href="javascript:"
            @click="$router.push(`/checkout/order?id=${order.id}`)"
            >再次购买</a
          >
        </p>
        <p v-if="{ 4: 1, 5: 1 }[order.orderState]">
          <a href="javascript:">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useOrderItem from "@/hooks/member/useOrderItem";
import dayjs from "dayjs";
import { orderStatus } from "@/api/constants";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const {
      count,
      onCancelButtonClick,
      onDeleteButtonClick,
      onConfirmReceiptButtonClick,
      onViewLogisticsButtonClick,
    } = useOrderItem(props, emit);

    return {
      count,
      dayjs,
      orderStatus,
      onCancelButtonClick,
      onDeleteButtonClick,
      onConfirmReceiptButtonClick,
      onViewLogisticsButtonClick,
    };
  },
};
</script>

<style lang="less" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
