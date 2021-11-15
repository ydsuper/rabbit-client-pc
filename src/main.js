import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入全局组件——插件式
import library from "@/components/library";

import "normalize.css";
import "@/assets/styles/common.less";

createApp(App).use(store).use(router).use(library).mount("#app");
