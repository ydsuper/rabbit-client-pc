<template>
  <ul>
    <li v-for="item in goods" :key="item.id">
      <GoodsItem :goods="item" />
    </li>
  </ul>
</template>
<script>
import GoodsItem from "@/views/category/components/GoodsItem";
export default {
  name: "GoodsList",
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
