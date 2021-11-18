import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default function useLazyData(apiFn) {
  // 1.创建对象元素
  const target = ref(null);
  // 2.存储数据
  const result = ref(null);
  // 3.监听元素进入可视区
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      console.log("懒加载", isIntersecting); //@log
      if (isIntersecting) {
        // 停止监听懒加载
        stop();
        // 调用API 获取数据
        apiFn().then((res) => {
          // console.log("layData:", res); //@log
          result.value = res.result;
        });
      }
    },
    { threshold: 0 }
  );
  // 返回数据
  return { target, result };
}
