import { ref } from "vue";

export default function useCheckoutAddressSwitch(emit) {
  // 控制弹窗显隐
  const visible = ref(false);

  // 点击切换地址
  const onSwitchAddress = (address) => {
    // 自定事件：切换当前收货地址
    emit("onSwitchChagned", address);
    // 隐藏弹窗
    visible.value = false;
  };

  return { visible, onSwitchAddress };
}
