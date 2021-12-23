import store from "@/store";

/**
 * 登录拦截——路由守卫
 * @param to 新路由信息
 * @param from 原路由信息
 * @param next 放行
 */
export default function authGuard(to, from, next) {
  // 指明需要登录的地址
  const requireLogin = ["checkout", "member"];

  // 判断前往的页面是否需要拦截守卫
  if (requireLogin.includes(to.path.split("/")[1])) {
    console.log(store, store.state.user.profile.token);
    // 判断用户是否登录
    if (!store.state.user.profile.token) {
      // 记录重定向地址
      store.commit("user/setRedirectURL", to.fullPath);
      // 未登录
      next({ path: "/login", query: { redirectURL: to.fullPath } });
    } else {
      // 已登录
      next();
    }
  } else {
    // 访问的页面无需登录
    next();
  }

  if (from.path === "/login") {
    console.log(from);
    // 清空重定向地址
    // store.commit("user/setRedirectURL");
  }
}
