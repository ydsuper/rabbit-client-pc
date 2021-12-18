/**
 * @userAPI 用户API
 */
import request from "@/utils/request";

/**
 * 账号登录
 * @param account 账号
 * @param password 密码
 * @returns {*}
 */
export function loginByAccountAndPassword({ account, password }) {
  return request.post("/login", { account, password });
}

/**
 * 获取手机登录验证码
 * @param mobile
 * @returns {*}
 */
export function getLoginMsgCode(mobile) {
  return request.get("/login/code", { mobile });
}

/**
 * 手机号登录
 * @param mobile 手机号
 * @param code 短信验证码
 * @returns {*}
 */
export function loginByMobileMsgCode({ mobile, code }) {
  return request.post("/login/code", { mobile, code });
}

/**
 * 在小兔仙儿应用检索绑定该QQ号的账号
 * @param unionId QQ用户唯一标识
 * @param source 注册来源
 * @returns {*}
 */
export function findAccountByOpenId({ unionId, source = 1 }) {
  return request.post("/login/social", { unionId, source });
}

/**
 * 获取手机验证码（QQ登录，绑定已有账号手机号）
 * @param mobile
 * @returns {*}
 */
export function getBindMobileMsgCode(mobile) {
  return request.get("/login/social/code", { mobile });
}

/**
 * QQ登录 将手机号和QQ进行绑定
 * @param unionId 用户的唯一标识
 * @param mobile 手机号
 * @param code 验证码
 * @returns {*}
 */
export function bindMobileAndQQ({ unionId, mobile, code }) {
  return request.post("/login/social/bind", { unionId, mobile, code });
}

/**
 * 检测用户名是否唯一
 * @param account 用户名
 * @returns {*}
 */
export function checkUsernameIsUnique(account) {
  return request.get("/register/check", { account });
}

/**
 * 获取手机验证码（注册）
 * @param mobile 手机号
 * @returns {*}
 */
export function getRegisterMsgCode(mobile) {
  return request.get("/register/code", { mobile });
}

/**
 * 创建新账号并绑定QQ
 * @param unionId QQ用户唯一标识
 * @param account 用户名
 * @param mobile 手机号
 * @param code 验证码
 * @param password 密码
 * @returns {*}
 */
export function createNewAccountBindQQ({
  unionId,
  account,
  mobile,
  code,
  password,
}) {
  return request.post(`/login/social/${unionId}/complement`, {
    account,
    mobile,
    code,
    password,
  });
}
