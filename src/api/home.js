/**
 * @homeAPI 首页API
 */
import request from "@/utils/request";

// 获取首页分类数据
export function getCategoriesAPI() {
  return request.get("/home/category/head");
}

/**
 * 获取热门品牌
 * @param limit
 * @returns {*}
 */
export function getBrands(limit = 10) {
  return request.get("/home/brand", { limit });
}

/**
 * 获取轮播数据
 * @param distributionSite 广告区域投放位置（1为首页，2为分类商品页） 默认是1
 * @returns {*}
 */
export function getBanners(distributionSite = 1) {
  return request.get("/home/banner", { distributionSite });
}

/**
 * 获取新鲜好物
 * @param limit 商品数量
 * @returns {*}
 */
export function getNewGoods(limit = 4) {
  return request.get("/home/new", { limit });
}

/**
 * 获取人气推荐
 * @returns {*}
 */
export function getHomeHot() {
  return request.get("/home/hot");
}

/**
 * 获取产品区块
 * @returns {*}
 */
export function getProducts() {
  return request.get("/home/goods");
}

/**
 * 获取最新专题
 * @param limit 限制数据数量
 * @returns {*}
 */
export function getSpecial(limit) {
  return request.get("/home/special", { limit });
}
