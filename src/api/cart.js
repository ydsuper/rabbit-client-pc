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
export function updateGoodsBySkuId({ skuId, id }) {
  return request.get(`/goods/stock/${skuId}`, { id });
}

/**
 * 根据skuId获取规格信息（供用户选择的规格选项数据、所有可组合的规格
 * @param skuId 商品规格id
 * @returns {*}
 */
export function getSkuInfoBySkuId(skuId) {
  // return request.get(`/goods/sku/${skuId}`);
  return request.get(`/goods/sku/${skuId}`);
}

/**
 * 将本地购物车和服务器端购物车进行合并（WithToken）
 * @param cart
 */
export function mergeCart(cart) {
  return request.post("/member/cart/merge", cart, { withToken: true });
}

/**
 * 获取购物车列表（WithToken）
 * @returns {*}
 */
export function getCartList() {
  return request.get("/member/cart", {}, { withToken: true });
}

/**
 * 将商品加入购物车（WithToken）
 * @param skuId 商品规格skuId
 * @param count 商品数量
 * @returns {*}
 */
export function addGoodsToCart({ skuId, count }) {
  return request.post("/member/cart", { skuId, count }, { withToken: true });
}

/**
 * 删除购物车中的商品（支持单删、批量删除）WithToken
 * @param ids
 * @returns {*}
 */
export function deleteGoodsOfCartBySkuIds(ids) {
  return request.delete("/member/cart", { ids }, { withToken: true });
}

/**
 * 更新购物车中的商品信息（支持是否选中和商品数量）WithToken
 * @param skuId
 * @param selected
 * @param count
 * @returns {*}
 */
export function updateGoodsOfCartBySkuId({ skuId, selected, count }) {
  return request.put(
    `/member/cart/${skuId}`,
    { selected, count },
    { withToken: true }
  );
}

/**
 * 全选、取消全选
 * @param selected 选中状态
 * @param ids skuId 数组
 * @returns {*}
 */
export function selectAllOrUnselectAll({ selected, ids }) {
  return request.put(
    "/member/cart/selected",
    { selected, ids },
    { withToken: true }
  );
}
