<template>
  <AppLayout>
    <div class="xtx-pay-checkout-page" v-if="order">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem path="/cart">购物车</XtxBreadItem>
          <XtxBreadItem>填写订单</XtxBreadItem>
        </XtxBread>
        <div class="wrapper">
          <!-- 收货地址 -->
          <h3 class="box-title">收货地址</h3>
          <div class="box-body">
            <CheckoutAddress ref="checkoutAddressInstance" />
          </div>
          <!-- 商品信息 -->
          <h3 class="box-title">商品信息</h3>
          <div class="box-body">
            <table class="goods">
              <thead>
                <tr>
                  <th>商品信息</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>实付</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="goods in order.goods" :key="goods.id">
                  <td>
                    <a href="javascript:" class="info">
                      <img :src="goods.picture" alt="" />
                      <div class="right">
                        <p>{{ goods.name }}</p>
                        <p>{{ goods.attrsText }}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{ goods.price }}</td>
                  <td>{{ goods.count }}</td>
                  <td>&yen;{{ goods.totalPrice }}</td>
                  <td>&yen;{{ goods.totalPayPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 配送时间 -->
          <h3 class="box-title">配送时间</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:"
              >不限送货时间：周一至周日</a
            >
            <a class="my-btn" href="javascript:">工作日送货：周一至周五</a>
            <a class="my-btn" href="javascript:"
              >双休日、假日送货：周六至周日</a
            >
          </div>
          <!-- 支付方式 -->
          <h3 class="box-title">支付方式</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:">在线支付</a>
            <a class="my-btn" href="javascript:">货到付款</a>
            <span style="color: #999">货到付款需付5元手续费</span>
          </div>
          <!-- 金额明细 -->
          <h3 class="box-title">金额明细</h3>
          <div class="box-body">
            <div class="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{{ order.summary.goodsCount }}</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{{ order.summary.totalPrice }}</dd>
              </dl>
              <dl>
                <dt>运<i></i>费：</dt>
                <dd>¥{{ order.summary.postFee }}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd class="price">¥{{ order.summary.totalPayPrice }}</dd>
              </dl>
            </div>
          </div>
          <!-- 提交订单 -->
          <div class="submit">
            <XtxButton type="primary" @click="onSubmitOrder"
              >提交订单</XtxButton
            >
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import useCheckout from "@/hooks/order/useCheckout";
import CheckoutAddress from "@/views/pay/components/CheckoutAddress";
export default {
  name: "CheckoutPage",
  components: { CheckoutAddress, AppLayout },
  setup() {
    // 获取订单
    const { order, checkoutAddressInstance, onSubmitOrder } = useCheckout();

    return { order, checkoutAddressInstance, onSubmitOrder };
  },
};
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
