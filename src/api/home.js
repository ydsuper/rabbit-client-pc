/**
 * @homeAPI 首页API
 */
import request from "@/utils/request";

// 获取首页分类数据
export function getCategoriesAPI() {
  return request.get("/home/category/head");
}
