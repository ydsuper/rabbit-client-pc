/**
 * 全局组件——应用级
 */
//#region 【全局组件】
// 骨架组件
// import XtxSkeleton from "@/components/library/XtxSkeleton";
// 轮播组件
// import XtxCarousel from "@/components/library/XtxCarousel";
// 查看更多组件
// import XtxMore from "@/components/library/XtxMore";
// 面包屑组件
// import XtxBread from "@/components/library/XtxBread";
// import XtxBreadItem from "@/components/library/XtxBreadItem";

//#endregion

//#region 【全局指令】
import lazy from "@/components/directives/lazy";
//#endregion

//#region 【批量注册组件】
// 1. 获取模块的路径集合 获取模块的导入函数
const importFn = require.context("./", false, /\.vue$/);
// console.dir(importFn);
// 2. 获取到导入的文件的路径
const keys = importFn.keys();
//#endregion

const library = {
  install(app) {
    // app.component("组件名称", "单文件组件");
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBread.name, XtxBread);
    // app.component(XtxBreadItem.name, XtxBreadItem);
    app.directive("lazy", lazy);
    // 3. 批量导入组件
    keys.forEach((item) => {
      // console.log("file:", item, importFn(item));
      const component = importFn(item).default;
      app.component(component.name, component);
    });
  },
};

export default library;
