import { ref } from "vue";
import Message from "@/components/library/Message";
import { addAddress, updateAddress } from "@/api/order";

export default function useCheckoutAddressEdit(emit) {
  // 用于控制弹框是否显示
  const visible = ref(false);
  // 存储用户选择的城市文字信息
  const location = ref("");
  // 存储用户最终填写的收获地址
  const address = ref({
    provinceCode: "", //省
    cityCode: "", //市
    countyCode: "", //区
    receiver: "", //收货人
    contact: "", //手机号
    address: "", //详细地址
    postalCode: "", //邮政编码
    addressTags: "", //地址标签，逗号分隔
    isDefault: false, //是否默认地址
  });

  //#region 选择城市信息
  const onCityChanged = (city) => {
    // 存储城市文字信息
    location.value = city.location;
    // 存储城市代码
    address.value.provinceCode = city.provinceCode;
    address.value.cityCode = city.cityCode;
    address.value.countyCode = city.countyCode;
  };
  //#endregion

  //#region 用户确认添加地址
  const onSureClickHandler = async () => {
    // 作为添加收货地址的请求参数
    const target = {
      ...address.value,
      isDefault: address.value.isDefault ? 0 : 1,
    };
    // 判断是否有ID，有为修改收货地址，没有则为添加收货地址
    if (target.id) {
      // 修改收货地址
      try {
        const data = await updateAddress(target);
        // 关闭对话框
        visible.value = false;
        // 添加成功
        Message({ type: "success", text: "修改成功" });
        // 修改新的收货地址
        emit("onAddressChanged", data.result.id);
      } catch (error) {
        // 收货地址修改失败
        const msg = error.err.response.data.message;
        Message({ type: "error", text: `收货地址修改失败 ${msg}` });
      }
    } else {
      //添加收货地址
      try {
        // 发送请求，添加收货地址
        const data = await addAddress(target);
        // 关闭对话框
        visible.value = false;
        // 添加成功
        Message({ type: "success", text: "添加成功" });
        // 获取新的收货地址
        emit("onAddressChanged", data.result.id);
      } catch (error) {
        // 收货地址添加失败
        const msg = error.err.response.data.message;
        Message({ type: "error", text: `收货地址添加失败 ${msg}` });
      }
    }
  };
  //#endregion

  return {
    visible,
    location,
    address,
    onCityChanged,
    onSureClickHandler,
  };
}
