/**
 * @userAPI 购物车API
 */
import request from "@/utils/request";

/**
 * 更新商品信息-库存价格是否有效（支持本地购物车）
 * @param skuId
 * @param id
 * @returns {*}
 */
export function updateGoodsOfCartBySkuId({ skuId, id }) {
  return request.get(`/goods/stock/${skuId}`, { id });
}
