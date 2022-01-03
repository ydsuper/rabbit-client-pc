/**
 * @request 封装axios请求
 */

//#region 【axios (1)】
// import axios from "axios";
// import { BASE_URL } from "./url";
// import store from "@/store";
// import router from "@/router";
//
// const instanceWithToken = axios.create({ BASE_URL });
//
// const instanceWithoutToken = axios.create({ BASE_URL });
//
// //#region 【WithToken API】
// // 请求拦截器
// instanceWithToken.interceptors.request.use((config) => {
//   const token = store.state.user.profile.token;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
// });
//
// // 响应拦截器
// instanceWithoutToken.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       store.commit("user/setUser", {});
//       router.push("/login").then(() => {});
//     }
//     return Promise.reject(error);
//   }
// );
// //#endregion
//
// //#region 【WithoutToken API】
// // 请求拦截器
// // instanceWithoutToken.interceptors.request.use((config) => {
// //   console.log(config);
// // });
// // 响应拦截器
// instanceWithoutToken.interceptors.response.use((response) => {
//   console.log(response);
//   return response.data;
// });
// //#endregion
//
// function generateReqParams({ url, method = "get", data }) {
//   return {
//     url,
//     method,
//     [method === "get" ? "params" : "data"]: data,
//   };
// }
//
// // 用于发送携带 token 的请求
// export function requestWithToken(reqParams) {
//   return instanceWithToken(generateReqParams(reqParams));
// }
// // 用于发送普通请求
// export function requestWithoutToken(reqParams) {
//   return instanceWithoutToken(generateReqParams(reqParams));
// }
//#endregion

//#region 【axios (2)】
// 引入axios
import axios from "axios";
import { BASE_URL } from "./url";
import store from "@/store";
import router from "@/router";

// 创建实例
const instance = axios.create({
  // 配置基地址
  baseURL: BASE_URL,
  // 超时
  timeout: 3000,
  // 鉴权token 不可以加到这里，因为创建实例时，可能在token更新之前(加到配置里即可)
  // headers: {
  //   authorization: store.state['user'].profile.token
  // }
});

/**
 * 使用axios实例发起请求
 * @param {*} options 请求实例配置项
 * @returns {Promise} 请求结果
 */
const baseRequest = (options) => {
  // 判断是否需要携带Token
  if (options.withToken) {
    // 添加 鉴权token
    options.headers = {
      // Authorization: "Bearer xxxxxx",
      Authorization: `Bearer ${store.state["user"].profile.token}`,
    };
  }

  // 返回实例请求结果
  return instance(options)
    .then((res) => {
      console.log("options", options);
      const data = res.data || {};
      // 请求失败时
      if (res.status !== 201 && res.status !== 200) {
        // 请求失败时，在这里集中处理
        // 这里请求失败时，会被下面catch捕捉
        return Promise.reject({ res, data });
      }
      // 请求成功时
      if (res.status === 200 || res.status === 201) {
        // 401时，代表token出现问题
        if ({ 400: 1, 401: 1 }[data.status]) {
          // 移除token
          store.commit("user/setToken", "");
          router.push("/login").then(() => {});
          return Promise.reject(data);
        }
        // 返回获取数据
        return Promise.resolve(data);
      }
    })
    .catch((err) => {
      // 这里捕获的err，
      // 如果是 instance(options) 中reject触发，那么捕获的err就是 instance(options) 中reject 给的 err
      // 如果是 上面Promise.reject({ res, data }) 触发，那么捕获的err就是 { res, data }
      return Promise.reject({ msg: "请求失败", err });
    });
};

// 封装 请求
const request = ["post", "put", "patch", "delete"].reduce((request, method) => {
  /**
   * 给请求添加方法
   * @param {*} url 请求路由
   * @param {*} data 请求数据
   * @param {*} option 请求配置选项
   * @returns
   */
  request[method] = (url, data = {}, option = {}) => {
    // 调用 axios实例
    return baseRequest(Object.assign({ method, url, data }, option));
  };
  return request;
}, {});

["get", "head"].forEach((method) => {
  /**
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(Object.assign({ url, params, method }, options));
  };
});

export default request;
//#endregion
