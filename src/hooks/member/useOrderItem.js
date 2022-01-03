import useCountDown from "@/hooks/useCountDown";
import Confirm from "@/components/library/Confirm";
import { confirmReceiptGoods, deleteOrder } from "@/api/member";
import Message from "@/components/library/Message";

export default function useOrderItem(props, emit) {
  const { count, start } = useCountDown();
  // 判断状态 待付订单
  if (props.order.orderState === 1) {
    start(props.order.countDown);
  }

  //#region 取消订单
  const onCancelButtonClick = (id) => {
    emit("onCancelOrder", id);
  };
  //#endregion

  //#region 删除订单
  const onDeleteButtonClick = async (id) => {
    // Confirm({ content: "订单删除后不可恢复" }).then(() =>
    //   deleteOrder([id])
    //     .then(() => Message({ type: "success", text: "订单删除成功" }))
    //     .then(() => emit("onReloadOrderList"))
    // );
    try {
      // 弹起确认框
      await Confirm({ content: "订单删除后不可恢复" });
      // 发起请求 删除订单
      await deleteOrder([id]);
      // 提示成功
      Message({ type: "success", text: "订单删除成功" });
      // 成功获取订单列表
      emit("onReloadOrderList");
    } catch {
      return false;
    }
  };
  //#endregion

  //#region 确认收货
  const onConfirmReceiptButtonClick = async (id) => {
    try {
      await Confirm({ title: "确认收货", content: "确定要进行收货吗？" });
      await confirmReceiptGoods(id);
      Message({ type: "success", text: "确认收货成功" });
      emit("onReloadOrderList");
    } catch {
      return false;
    }
  };
  //#endregion

  //#region 查看物流
  const onViewLogisticsButtonClick = (id) => {
    emit("onViewLogistics", id);
  };
  //#endregion

  return {
    count,
    onCancelButtonClick,
    onDeleteButtonClick,
    onConfirmReceiptButtonClick,
    onViewLogisticsButtonClick,
  };
}
