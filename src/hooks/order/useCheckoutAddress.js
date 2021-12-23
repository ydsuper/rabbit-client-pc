import { ref } from "vue";

export default function useCheckoutAddress() {
  // 存储编辑收货地址组件实例的对象
  const addressEditInstance = ref(null);
  // 添加收货地址
  const addAddress = () => {
    addressEditInstance.value.visible = true;
  };

  return { addressEditInstance, addAddress };
}
