import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入全局组件——插件式
import library from "@/components/library";

import "normalize.css";
import "@/assets/styles/common.less";

// 如果当前程序在:开发环境
if (process.env.NODE_ENV === "development") {
  // 动态引入 worker
  const worker = require("./mocks/worker").default;

  console.log("work", worker);
  // 启动拦截程序
  worker
    // onUnhandledRequest: 说明请求拦截不处理
    // quiet: 安静模式,请求拦截成功也不要提示信息
    .start({ onUnhandledRequest() {}, quiet: true })
    .then(() => console.log("%cmsw拦截程序启动成功", "color: green"))
    .catch((e) => console.log(e));
}

createApp(App).use(store).use(router).use(library).mount("#app");
