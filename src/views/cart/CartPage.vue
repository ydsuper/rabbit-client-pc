<template>
  <AppLayout>
    <div class="cart-page">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem>购物车</XtxBreadItem>
        </XtxBread>
        <div class="cart">
          <table>
            <thead>
              <tr>
                <th>
                  <XtxCheckbox
                    :modelValue="selectAllButtonStatus"
                    @update:modelValue="
                      $store.dispatch('cart/selectedAll', $event)
                    "
                    >全选</XtxCheckbox
                  >
                </th>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 有效商品 -->
            <tbody>
              <tr v-if="effectiveGoodsCount === 0">
                <td colspan="6">
                  <EmptyCart />
                </td>
              </tr>
              <tr v-else v-for="goods in effectiveGoodsList" :key="goods.id">
                <td>
                  <XtxCheckbox
                    :modelValue="goods.selected"
                    @update:modelValue="
                      $store.dispatch('cart/updateGoodsOfCartBySkuId', {
                        skuId: goods.skuId,
                        selected: $event,
                      })
                    "
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${goods.id}`"
                      ><img :src="goods.picture" :alt="goods.name"
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ goods.name }}
                      </p>
                      <!-- 选择规格组件 -->
                      <CartSku
                        :skuId="goods.skuId"
                        :attrsText="goods.attrsText"
                      />
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ goods.nowPrice }}</p>
                  <p v-if="goods.price - goods.nowPrice > 0">
                    比加入时降价
                    <span class="red"
                      >&yen;{{
                        (goods.price - goods.nowPrice).toFixed(2)
                      }}</span
                    >
                  </p>
                </td>
                <td class="tc">
                  <XtxNumberBox
                    v-model="goods.count"
                    :max="goods.stock"
                    @update:modelValue="
                      changeGoodsCountOfCartBySkuId({
                        skuId: goods.skuId,
                        count: $event,
                      })
                    "
                  ></XtxNumberBox>
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (goods.nowPrice * goods.count).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:">移入收藏夹</a></p>
                  <p>
                    <a
                      class="green"
                      href="javascript:"
                      @click="deleteGoodsOfCartBySkuId(goods.skuId)"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody>
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr v-for="goods in invalidGoodsList" :key="goods.id">
                <td></td>
                <td>
                  <div class="goods">
                    <RouterLink to="/"
                      ><img :src="goods.picture" :alt="goods.name"
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ goods.name }}
                      </p>
                      <p class="attr">{{ goods.attrsText }}</p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ goods.nowPrice }}</p>
                </td>
                <td class="tc">1</td>
                <td class="tc">
                  <p>&yen;{{ goods.count }}</p>
                </td>
                <td class="tc">
                  <p><a class="green" href="javascript:">删除</a></p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            <XtxCheckbox
              :modelValue="selectAllButtonStatus"
              @update:modelValue="$store.dispatch('cart/selectedAll', $event)"
              >全选</XtxCheckbox
            >
            <a
              href="javascript:"
              @click="deleteBatchGoodsOfCart('userSelectedGoodsList')"
              >删除商品</a
            >
            <a href="javascript:">移入收藏夹</a>
            <a
              href="javascript:"
              @click="deleteBatchGoodsOfCart('invalidGoodsList')"
              >清空失效商品</a
            >
          </div>
          <div class="total">
            共 {{ effectiveGoodsCount }} 件商品，已选择
            {{ userSelectedGoodsCount }} 件，商品合计：
            <span class="red">¥{{ userSelectedGoodsPrice }}</span>
            <XtxButton type="primary" @click="jumpToCheckout"
              >下单结算</XtxButton
            >
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <GoodsRelevant />
      </div>
    </div>
  </AppLayout>
</template>
<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import useCart from "@/hooks/cart/useCart";
import EmptyCart from "./components/EmptyCart";
import CartSku from "./components/CartSku";
export default {
  name: "CartPage",
  components: { CartSku, EmptyCart, GoodsRelevant, AppLayout },
  setup() {
    const {
      effectiveGoodsList,
      effectiveGoodsCount,
      deleteGoodsOfCartBySkuId,
      invalidGoodsList,
      userSelectedGoodsCount,
      userSelectedGoodsPrice,
      updateCartList,
      selectAllButtonStatus,
      deleteBatchGoodsOfCart,
      changeGoodsCountOfCartBySkuId,
      jumpToCheckout,
    } = useCart();

    // 更新本地购物车信息
    updateCartList();

    return {
      effectiveGoodsList,
      effectiveGoodsCount,
      deleteGoodsOfCartBySkuId,
      invalidGoodsList,
      userSelectedGoodsCount,
      userSelectedGoodsPrice,
      selectAllButtonStatus,
      deleteBatchGoodsOfCart,
      changeGoodsCountOfCartBySkuId,
      jumpToCheckout,
    };
  },
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-number-box {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      width: 100%;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
