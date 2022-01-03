import { ref, watch } from "vue";
import { getLogisticsByOrderId, getOrderList } from "@/api/member";

export default function useOrderList() {
  // 存储当前选项卡
  const active = ref(0);
  // 存储订单列表
  const orderList = ref();
  // 数据加载状态
  const loading = ref(false);
  // 请求参数
  const reqParams = ref({
    page: 1,
    pageSize: 4,
    orderState: 0,
  });
  // 存储总数据条数
  const totalCount = ref(0);
  // 存储总页数
  const totalPage = ref(0);
  // 取消订单 对话框
  const cancelOrderInstance = ref(null);
  // 查看物流 对话框
  const orderLogisticsInstance = ref(null);

  // 请求获取数据
  const getData = () => {
    loading.value = true;
    getOrderList(reqParams.value).then((data) => {
      // console.log("orderlist", data); //@log
      orderList.value = data.result;
      loading.value = false;
      totalCount.value = data.result.counts; //存储总数据条数
      totalPage.value = data.result.pages; //存储总页数
    });
  };

  // 监控请求参数变化，重新获取订单列表数据
  watch(
    reqParams.value,
    () => getData(),
    // 立即执行
    { immediate: true }
  );

  // 监听当前选项卡
  watch(active, (current) => {
    reqParams.value.page = 1; //重置页码
    reqParams.value.orderState = current; //重置订单状态参数
  });

  // 取消订单 弹窗
  const onCancelOrder = (id) => {
    // 渲染取消订单弹层
    cancelOrderInstance.value.visible = true;
    // 通过组件实例对象传递要取消订单的订单ID
    cancelOrderInstance.value.id = id;
  };

  // 点击查看物流按钮
  const onViewLogistics = (id) => {
    // 通过组件实例对象传递要查询物流的订单的订单ID
    getLogisticsByOrderId(id).then((data) => {
      orderLogisticsInstance.value.logistics = data.result;
      orderLogisticsInstance.value.visible = true;
    });
  };

  return {
    active,
    orderList,
    reqParams,
    loading,
    totalCount,
    totalPage,
    cancelOrderInstance,
    onCancelOrder,
    getData,
    orderLogisticsInstance,
    onViewLogistics,
  };
}
