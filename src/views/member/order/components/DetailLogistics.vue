<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{ logistics.list[0].text }}</span>
      <span>{{ logistics.list[0].time }}</span>
    </p>
    <a href="javascript:" @click="onViewLogisticsButtonClick">查看物流</a>
  </div>
  <!-- 查看物流信息:使用传送门组件 修改渲染位置 -->
  <teleport to="#modal">
    <OrderLogistics ref="orderLogisticsInstance" />
  </teleport>
</template>
<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getLogisticsByOrderId } from "@/api/member";
import OrderLogistics from "@/views/member/order/components/OrderLogistics";

export default {
  name: "DetailLogistics",
  components: { OrderLogistics },
  async setup() {
    // 获取路由信息对象
    const route = useRoute();
    // 存储订单物流信息
    const logistics = ref(null);
    // 存储物流信息
    const data = await getLogisticsByOrderId(route.params.id);

    // 测试 延迟
    // await delay(1000);
    // 存储物流信息
    logistics.value = data.result;

    // 订单物流组件实例
    const orderLogisticsInstance = ref(null);
    // 查看物流 按钮点击
    const onViewLogisticsButtonClick = () => {
      // 渲染弹层
      orderLogisticsInstance.value.visible = true;
      // 传递物流信息
      orderLogisticsInstance.value.logistics = logistics.value;
    };

    return { logistics, orderLogisticsInstance, onViewLogisticsButtonClick };
  },
};
// 代码:测试延迟
// async function delay(time) {
//   await new Promise((resolve) => setTimeout(() => resolve(), time));
// }
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
