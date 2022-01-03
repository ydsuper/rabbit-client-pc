<template>
  <div>
    <p>NOTFOUND</p>
    <RouterLink to="/" class="backhome">返回首页</RouterLink>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="less" scoped>
.backhome {
  color: @xtxColor;
}
</style>
