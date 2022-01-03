import { computed, ref } from "vue";
import { getAddress } from "@/api/order";
import Message from "@/components/library/Message";

export default function useCheckoutAddress() {
  // 存储编辑收货地址组件实例的对象
  const addressEditInstance = ref(null);
  // 存储切换收货地址组件实例的对象
  const addressSwitchInstance = ref(null);

  //#region 添加收货地址
  const onAddAddress = () => {
    // 打开对话框
    addressEditInstance.value.visible = true;

    // 初始收货地址参数
    addressEditInstance.value.address = {
      provinceCode: "", //省
      cityCode: "", //市
      countyCode: "", //区
      receiver: "", //收货人
      contact: "", //手机号
      address: "", //详细地址
      postalCode: "", //邮政编码
      addressTags: "", //地址标签，逗号分隔
      isDefault: false, //是否默认地址
    };
    addressEditInstance.value.location = ""; //地区
  };
  //#endregion

  //#region 获取收货地址
  const getAddresses = () => {
    // 存储收货地址列表
    const addresses = ref(null);
    // 获取收货地址列表
    const getData = (callback) => {
      getAddress().then((data) => {
        addresses.value = data.result;
        callback && callback(data.result);
      });
    };
    // 初始化收货地址列表
    getData();

    //#region 收货地址列表 & 默认显示列表
    // 存储用户新增的收货地址or切换的收货地址
    const userSelectedAddress = ref();
    // 计算最终能够渲染到页面中的收货地址
    const finalAddress = computed(() => {
      let result = null;

      // 如果用户添加了新的收获地址或者切换了收获地址
      if (userSelectedAddress.value) {
        // 优先渲染
        result = userSelectedAddress.value;
      } else {
        // 查看收货地址列表中是否存在收货地址
        if (addresses.value && addresses.value.length > 0) {
          // 获取默认收货地址
          result = addresses.value.find((item) => item.isDefault === 0);
          // 没有默认地址 就渲染第一个收货地址
          if (!result) {
            result = addresses.value[0];
          }
        }
      }

      return result;
    });
    //#endregion

    //#region 更新收获地址列表
    const onAddressChanged = (id) => {
      getData((list) => {
        userSelectedAddress.value = list.find((item) => item.id === id);
      });
    };
    //#endregion

    //#region 修改地址
    const modifyAddress = () => {
      if (!finalAddress.value)
        return Message({ type: "warn", text: "请先添加一个地址" });
      // 结构出需要回显的数据
      const { fullLocation, isDefault, ...rest } = finalAddress.value;
      // 回显数据
      addressEditInstance.value.location = fullLocation;
      addressEditInstance.value.address = {
        ...rest,
        isDefault: isDefault === 0,
      };
      // 显示弹窗
      addressEditInstance.value.visible = true;
    };
    //#endregion

    //#region 切换地址
    const onSwitchChagned = (address) => {
      userSelectedAddress.value = address;
    };
    //#endregion

    return {
      addresses,
      finalAddress,
      onAddressChanged,
      modifyAddress,
      onSwitchChagned,
    };
  };
  //#endregion

  //#region 切换收货地址
  const onSwitchAddress = () => {
    addressSwitchInstance.value.visible = true;
  };
  //#endregion

  return {
    addressEditInstance, //添加收货地址ref
    onAddAddress,
    getAddresses, //获取收货地址
    addressSwitchInstance, //切换收货地址ref
    onSwitchAddress,
  };
}
