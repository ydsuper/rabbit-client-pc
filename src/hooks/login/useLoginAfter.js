import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Message from "@/components/library/Message";

export default function useLoginAfter() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  // 登录成功
  const loginSuccessFn = async ({ result }) => {
    // console.log(result); //@log
    store.commit("user/setUser", {
      id: result.id, //用户id
      avatar: result.avatar, //用户头像
      nickname: result.nickname, //用户你猜
      account: result.account, //用户账号
      mobile: result.mobile, //用户手机号
      token: result.token, //用户登录令牌
    });
    // 获取目标地址
    const redirectURL = route.query.redirectURL || store.state.user.redirectURL;

    // 跳转到目前地址 or 首页
    router.push(redirectURL || "/").then(() => {
      // 登录成功之后的提示信息
      Message({ type: "success", text: "登录成功" });
    });
    // 合并购物车
    await store.dispatch("cart/mergeCart");
    // 将服务器端购物车数据同步到本地
    await store.dispatch("cart/updateCartList");
  };

  // 登录失败
  const loginFailedFn = (error) => {
    const msg = error.err.response.data.message;
    Message({ type: "error", text: msg });
  };

  return { loginSuccessFn, loginFailedFn };
}
