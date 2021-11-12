<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      v-for="(item, i) in category.list"
      :key="item.id"
      @mouseenter="open(i)"
      @mouseleave="close(i)"
    >
      <RouterLink :to="`/category/${item.id}`" @click="close(i)">
        {{ item.name }}
      </RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="subItem in item.children" :key="subItem.id">
            <RouterLink :to="`/category/sub/${subItem.id}`" @click="close(i)">
              <img :src="subItem.picture" :alt="subItem.name" />
              <p>{{ subItem.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "AppHeaderNav",
  setup() {
    const store = useStore();
    const category = store.state["category"];

    const open = (index) => {
      console.log("open:", index);
      store.commit("category/open", index);
    };

    const close = (index) => {
      console.log("close:", index);
      store.commit("category/close", index);
    };

    return {
      category,
      open,
      close,
    };
  },
};
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }

    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;

      &.open {
        height: 132px;
        opacity: 1;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
  }
}
</style>
