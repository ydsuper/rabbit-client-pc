import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Message from "@/components/library/Message";

export default function useLoginAfter() {
  const router = useRouter();
  const store = useStore();

  // 登录成功
  const loginSuccessFn = ({ result }) => {
    // console.log(result); //@log
    store.commit("user/setUser", {
      id: result.id, //用户id
      avatar: result.avatar, //用户头像
      nickname: result.nickname, //用户你猜
      account: result.account, //用户账号
      mobile: result.mobile, //用户手机号
      token: result.token, //用户登录令牌
    });
    // 跳转到首页
    router.push("/").then(() => {
      // 登录成功之后的提示信息
      Message({ type: "success", text: "登录成功" });
    });
  };

  // 登录失败
  const loginFailedFn = (error) => {
    const msg = error.err.response.data.message;
    Message({ type: "error", text: msg });
  };

  return { loginSuccessFn, loginFailedFn };
}
