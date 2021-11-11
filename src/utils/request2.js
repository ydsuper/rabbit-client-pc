// 引入axios
import axios from "axios";
import { BASE_URL } from "./url";

// 创建实例
const instance = axios.create({
  // 配置基地址
  baseURL: BASE_URL,
  // 超时
  timeout: 3000,
  // 鉴权token 不可以加到这里，因为创建实例时，可能在token更新之前(加到配置里即可)
  // headers: {
  //   authorization: localStorage.getItem("hkzf_token")
  // }
});

/**
 * 使用axios实例发起请求
 * @param {*} options 请求实例配置项
 * @returns {Promise} 请求结果
 */
const baseRequest = (options) => {
  // 添加 鉴权token
  options.headers = {
    // authorization: localStorage.getItem("hkzf_token"),
    authorization: "Bearer xxxxxx",
  };

  // 返回实例请求结果
  return instance(options)
    .then((res) => {
      console.log("options", options);
      console.log("请求", res);
      const data = res.data || {};
      // 请求失败时
      if (res.status !== 201 && res.status !== 200) {
        // 请求失败时，在这里集中处理
        // 这里请求失败时，会被下面catch捕捉
        return Promise.reject({ res, data });
      }
      // 请求成功时
      if (res.status === 200 || res.status === 201) {
        // 400时，代表token出现问题
        if (data.status === 400) {
          // 移除token
          localStorage.removeItem("hkzf_token");
          return Promise.reject(data);
        }
        // 返回获取数据
        return Promise.resolve(data.data);
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
const request = ["post", "put", "patch"].reduce((request, method) => {
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

["get", "delete", "head"].forEach((method) => {
  /**
   *
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
