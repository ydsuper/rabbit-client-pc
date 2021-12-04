/**
 * @userAPI 用户API
 */
import request from "@/utils/request";

export function loginByAccountAndPassword({ account, password }) {
  return request.post("/login", { account, password });
}
