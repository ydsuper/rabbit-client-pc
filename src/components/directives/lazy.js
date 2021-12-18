// 1. 获取指定元素对象
// 2. mounted 当指定元素渲染完成后do work
// 3. 监听元素是否进入可视区
// 4. 如果元素进入可视区 为图片设置 src 属性 停止监听
// 5. 如果图片加载失败 显示默认图片

// 导入默认图片
import defaultImg from "@/assets/images/200.png";

const lazy = {
  /**
   * 要在 Mounted 时期
   * @param el 指定元素对象
   * @param binding 指令的值
   */
  mounted(el, binding) {
    // 1.创建元素监听对象
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // console.log(el, isIntersecting); //@log
      // 1.1判断是否进入可视区
      if (isIntersecting) {
        // 1.2停止监听对象
        observer.unobserve(el);
        // 1.3懒加载图片
        el.src = binding.value;
        // 1.4当图片加载错误时（显示默认图片）
        el.onerror = () => {
          el.src = defaultImg;
        };
      }
    });
    // 2.开启监听对象
    observer.observe(el);
  },
};

export default function directiveLazy(app) {
  app.directive("lazy", lazy);
}
