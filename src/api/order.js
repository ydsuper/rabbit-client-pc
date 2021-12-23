/**
 * @userAPI 订单API
 */
import request from "@/utils/request";

/**
 * 创建订单
 * @returns {*}
 */
export function createOrder() {
  return request.get("/member/order/pre", {}, { withToken: true });
}
