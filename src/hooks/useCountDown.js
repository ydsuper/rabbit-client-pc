/* 封装倒计时控制 */
import { useIntervalFn } from "@vueuse/core";
import { onUnmounted, ref } from "vue";

export default function useCountDown() {
  /** useIntervalFn（setInterval:可以控制暂停）
   * @pause 清除定时器
   * @resume 重新开启定时器
   * @isActive 定时器是否正在执行
   * @immediate 定时器是否立即执行
   */

  const count = ref(0);

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (count.value <= 0) {
        // 清除倒计时
        pause();
      } else {
        count.value--;
      }
    },
    1000,
    {
      immediate: false,
    }
  );

  // 开启倒计时
  const start = (value) => {
    if (!isActive.value) {
      // 重新设置倒计时数值
      count.value = value;
      resume();
    }
  };

  // 组件卸载后 清除定时器
  onUnmounted(pause);
  // 返回计时器开启与数值
  return { count, start, isActive };
}
