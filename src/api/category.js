/**
 * @homeAPI 分类页API
 */
import request from "@/utils/request";

/**
 * 获取指定一级分类数据
 * @param id 一级分类ID
 * @returns {*}
 */
export function getTopCategoryById(id) {
  return request.get("/category", { id });
}

/**
 * 根据二级分类ID获取筛选条件
 * @param id 二级分类ID
 * @returns {*}
 */
export function getSubCategoryFilterById(id) {
  return request.get("/category/sub/filter", { id });
}

/**
 * 获取商品列表
 * @param params 分类id、筛选条件、排序条件、分页信息
 * @returns {*}
 */
export function getGoodsReq(params) {
  return request.post("/category/goods", params);
}
