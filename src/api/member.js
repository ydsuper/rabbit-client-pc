/**
 * @memberAPI 个人中心API
 */
import request from "@/utils/request";

/**
 * 获取个人收藏
 * @param collecType 收藏类型，1为商品，2为专题，3为品牌
 * @param page 页码
 * @param pageSize 每页数据条数
 * @returns {*}
 */
export function getCollection({ collectType = 1, page = 1, pageSize = 10 }) {
  return request.get(
    "/member/collect",
    { collectType, page, pageSize },
    { withToken: true }
  );
}

/**
 * 获取订单列表
 * @param page 页码
 * @param pageSize 每页数据条数
 * @param orderState 订单状态 0为全部 1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取
 * @returns {*}
 */
export function getOrderList({ page, pageSize, orderState }) {
  return request.get(
    "/member/order",
    { page, pageSize, orderState },
    { withToken: true }
  );
}

/**
 * 取消订单
 * @param id
 * @param cancelReason
 * @returns {*}
 */
export function cancelOrder({ id, cancelReason }) {
  return request.put(
    `/member/order/${id}/cancel`,
    { cancelReason },
    { withToken: true }
  );
}

/**
 * 删除订单
 * @param ids 订单ID集合
 * @returns {*}
 */
export function deleteOrder(ids) {
  return request.delete("/member/order", { ids }, { withToken: true });
}

/**
 * 确认收货
 * @param id
 * @returns {*}
 */
export function confirmReceiptGoods(id) {
  return request.put(`/member/order/${id}/receipt`, {}, { withToken: true });
}

/**
 * 获取订单物流信息
 * @param id 订单ID
 * @returns {*}
 */
export function getLogisticsByOrderId(id) {
  return request.get(`/member/order/${id}/logistics`, {}, { withToken: true });
}

/**
 * 获取订单详情
 * @param id 订单ID
 * @returns {*}
 */
export function getOrderDetail(id) {
  return request.get(`/member/order/${id}`, {}, { withToken: true });
}

/**
 * 创建新的订单(根据订单ID)
 * @param id 订单ID
 * @returns {*}
 */
export function createOrderById(id) {
  return request.get(`/member/order/repurchase/${id}`, {}, { withToken: true });
}
