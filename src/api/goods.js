/**
 * @homeAPI 分类页API
 */
import request from "@/utils/request";

/**
 * 根据ID获取商品详情信息
 * @param id 商品ID
 * @returns {*}
 */
export function getGoodsDetailById(id) {
  return request.get("/goods", { id });
}
