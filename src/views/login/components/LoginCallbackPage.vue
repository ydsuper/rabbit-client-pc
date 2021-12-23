<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-if="!loading && !isBind">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <LoginCallbackBindPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackPatch";
import { ref } from "vue";
import { findAccountByOpenId } from "@/api/user";
import useLoginAfter from "@/hooks/login/useLoginAfter";
export default {
  name: "LoginCallbackPage",
  components: {
    LoginCallbackBindPatch,
    LoginCallbackBindPhone,
    LoginFooter,
    LoginHeader,
  },
  setup() {
    const hasAccount = ref(true);
    const { loginSuccessFn } = useLoginAfter();

    // 获取QQ登录用户的 openid
    // 1.检查用户的登录状态
    const Login = window.QC.Login;

    const loading = ref(false); //检索账号加载状态
    const isBind = ref(false); //假设用户已使用 QQ 绑定了账号
    const unionId = ref("");
    if (Login.check()) {
      // 更新loading状态
      loading.value = true;
      // 2.向QQ互联网发送请求使用 access_token 换取用户的唯一标识 openid
      Login.getMe((openid) => {
        console.log("openid", openid);
        unionId.value = openid;
        findAccountByOpenId({ unionId: openid })
          .then((data) => {
            loading.value = false;
            isBind.value = true;
            loginSuccessFn(data);
          })
          .catch((error) => {
            loading.value = false;
            isBind.value = false;
            console.log(error);
          });
      });

      // 获取 QQ个人信息
      window.QC.api("get_user_info").success((res) => {
        console.log("user_info", res);
      });
      window.QC.api("getUnionId").success((res) => {
        console.log("unionid", res);
      });
    }

    return { hasAccount, loading, isBind, unionId };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}

.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
</style>
