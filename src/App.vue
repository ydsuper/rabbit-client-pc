<template>
  <div id="nav">
    <p @click="onClickHandler">{{ $store.state["user"].profile }}</p>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
// import { requestWithoutToken } from "@/utils/request";
import request from "@/utils/request";
export default {
  setup() {
    const store = useStore();
    const onClickHandler = () => {
      console.log(111);
      // store.commit("user/setUser", { id: "1", nickname: "小明" });
      store.commit("user/setUser");
    };

    async function getData() {
      // const data = await requestWithoutToken({
      //   url: "/topics",
      // });
      const data = await request.get("/topics", {}, { withToken: true });
      console.log("data", data);
      // requestWithoutToken.get("/topics").then((res) => {
      //   console.log("res", res);
      // });
    }
    getData();

    return {
      onClickHandler,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
