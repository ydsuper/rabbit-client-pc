/**
 * 全局组件——应用级
 */
//#region 【全局组件】
// 骨架组件
import XtxSkeleton from "@/components/library/XtxSkeleton";
// 轮播组件
import XtxCarousel from "@/components/library/XtxCarousel";
// 查看更多组件
import XtxMore from "@/components/library/XtxMore";
//#endregion

//#region 【全局指令】
import lazy from "@/components/directives/lazy";
// 懒加载指令

//#endregion

const library = {
  install(app) {
    // app.component("组件名称", "单文件组件");
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.directive("lazy", lazy);
  },
};

export default library;
