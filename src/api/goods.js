/**
 * @goodsAPI 商品详情API
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

/**
 * 根据ID获取推荐商品
 * @param id 商品id（传入了商品id表示获取相关商品数据 没有id参数获取猜你喜欢）
 * @returns {*}
 */
export function getRelevantGoods(id, limit = 16) {
  return request.get("/goods/relevant", { id, limit });
}

/**
 * 获取热销商品
 * @param id 商品ID 根据该商品推荐其同类的热销商品
 * @param limit 获取多少条商品数据
 * @param type 热销类型, 1为24小时，2为周榜，3为总榜，默认为1
 * @returns {*}
 */
export function getHotGoods(id, limit = 3, type = 1) {
  return request.get("/goods/hot", { id, limit, type });
}

/**
 * 获取商品评论头部数据
 * @param id 商品id
 * @returns {*}
 */
export function getCommentInfo(id) {
  // return request.get(`/goods/${id}/evaluate`, { id });
  return request.get(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    { id }
  );
}

export function getCommentList(id) {
  // return request.get(`/goods/${id}/evaluate/page`, { id });
  return request.get(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    { id }
  );
}
