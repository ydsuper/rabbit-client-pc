/**
 * 热门品牌 左右滑动切换
 */
import { computed, ref } from "vue";

export default function useBrandToggle(target) {
  // 计算滚动组数
  const groupNum = computed(() => Math.ceil(target.value?.length / 5) - 1);
  // const max = parseInt(length / 5);
  const currentIndex = ref(0);

  const toggle = (step) => {
    // 计算索引
    const nextIndex = currentIndex.value + step;
    // 判断阻止滚动
    if (nextIndex < 0 || nextIndex > groupNum.value) return;
    // 修改索引
    currentIndex.value = nextIndex;
  };

  return { toggle, currentIndex, groupNum };
}
