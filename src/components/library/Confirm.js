import XtxConfirm from "./XtxConfirm";
import { createVNode, render } from "vue";

const container = document.createElement("div");
document.body.appendChild(container);

export default function Confirm({ title, content }) {
  return new Promise((resolve, reject) => {
    // 0.用户点击【确认】or【取消】按钮
    const onSureButtonClickHandler = () => {
      resolve();
      onRemoveFade();
    };
    const onCancelButtonClickHandler = () => {
      reject();
      onRemoveFade();
    };
    // 离场动画：延迟400ms 并 移除虚拟dom
    const onRemoveFade = () => {
      vnode.el.classList.remove("fade");
      vnode.el.children[0].classList.remove("fade");
      setTimeout(() => {
        render(null, container); //清除虚拟dom
      }, 400);
    };

    // 1.创建虚拟DOM
    const vnode = createVNode(XtxConfirm, {
      title,
      content,
      // 点击[确认][取消]方法
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    // 2.将虚拟dom 渲染成真实dom
    render(vnode, container);

    setTimeout(() => {
      vnode.el.classList.add("fade");
      vnode.el.children[0].classList.add("fade");
    });
  });
}
