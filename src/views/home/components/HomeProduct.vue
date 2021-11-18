<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in products" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            :to="`/category/sub/${subItem.id}`"
            v-for="subItem in item.children"
            :key="subItem.id"
            >{{ subItem.name }}
          </RouterLink>
        </div>
        <XtxMore :path="`/category/${item.id}`" />
      </template>
      <template v-slot:default>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img v-lazy="item.picture" src="" :alt="item.name" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="good in item.goods" :key="good.id">
              <HomeGoods :good="good" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomeGoods from "@/views/home/components/HomeGoods";
import HomePanel from "@/views/home/components/HomePanel";
import XtxMore from "@/components/library/XtxMore";
import useLazyData from "@/hooks/useLazyData";
import { getProducts } from "@/api/home";
export default {
  name: "HomeProduct",
  components: { XtxMore, HomePanel, HomeGoods },
  setup() {
    const { target, result: products } = useLazyData(getProducts);
    return {
      target,
      products,
    };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
            /* 超出省略号 */
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
