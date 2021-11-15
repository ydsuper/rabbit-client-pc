import { ref, onMounted, onUnmounted } from "vue";

/**
 * 【滚动距离】
 * @returns {Ref<UnwrapRef<number>>}
 */
export default function useScrollTop() {
  const scrollTop = ref(0);
  const scrollTopHandler = () => {
    scrollTop.value = document.documentElement.scrollTop;
  };
  onMounted(() => {
    window.addEventListener("scroll", scrollTopHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollTopHandler);
  });

  return scrollTop;
}
