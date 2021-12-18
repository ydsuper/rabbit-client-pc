/**
 * 封装全局信息提示 JS 组件
 */

import { createVNode, render } from "vue";

// 1.导入目标 vue 组件
import XtxMessage from "@/components/library/XtxMessage";
// 2.创建一个组件渲染容器
const container = document.createElement("div");
document.body.appendChild(container);

export default function Message({ type, text, time = 3000 }) {
  let timer = null;
  const TIME = time; //销毁时间
  const oDiv = document.createElement("div");
  // 3.将目标vue组件渲染成虚拟 DOM 对象
  const vnode = createVNode(XtxMessage, { type, text });
  console.log("vnode", vnode);
  // 4.将组件的虚拟DOM对象渲染成真实 DOM 对象
  container.appendChild(oDiv);
  render(vnode, oDiv);

  clearTimeout(timer);
  timer = setTimeout(() => {
    // 动画效果隐藏提示
    vnode.component.proxy.show = false;
    // 清除虚拟dom
    // container._vnode = null; //方式一
    render(null, container); //方式二
    setTimeout(() => container.removeChild(oDiv), 50);
  }, TIME);
}
