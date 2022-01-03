<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!finalAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ finalAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            finalAddress.contact.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$3")
          }}
        </li>
        <li>
          <span>收货地址：</span>{{ finalAddress.fullLocation }}
          {{ finalAddress.address }}
        </li>
      </ul>
      <a href="javascript:" @click="modifyAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="onSwitchAddress">切换地址</XtxButton>
      <XtxButton class="btn" @click="onAddAddress">添加地址</XtxButton>
    </div>
    <!-- 添加收货地址 -->
    <AddressEdit
      ref="addressEditInstance"
      @onAddressChanged="onAddressChanged"
    />
    <!-- 切换收货地址 -->
    <AddressSwitch
      ref="addressSwitchInstance"
      :list="addresses"
      :activeAddressId="finalAddress?.id"
      @onSwitchChagned="onSwitchChagned"
    />
  </div>
</template>
<script>
import AddressEdit from "@/views/pay/components/AddressEdit";
import useCheckoutAddress from "@/hooks/order/useCheckoutAddress";
import AddressSwitch from "@/views/pay/components/AddressSwitch";
export default {
  name: "CheckoutAddress",
  components: { AddressSwitch, AddressEdit },
  setup() {
    const {
      addressEditInstance,
      onAddAddress,
      getAddresses,
      addressSwitchInstance,
      onSwitchAddress,
    } = useCheckoutAddress();

    const {
      addresses,
      finalAddress,
      onAddressChanged,
      modifyAddress,
      onSwitchChagned,
    } = getAddresses();

    return {
      addressEditInstance,
      onAddAddress,
      getAddresses,
      addresses, //收货地址列表
      finalAddress, //默认地址
      onAddressChanged, //更新地址
      modifyAddress, //修改地址
      addressSwitchInstance, //切换地址ref
      onSwitchAddress,
      onSwitchChagned,
    };
  },
};
</script>
<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
