<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickename }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="绑定的手机号"
          v-model="mobileField"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          placeholder="短信验证码"
          v-model="codeField"
        />
        <span class="code" @click="getMsgCode">{{
          isActive ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import useQQUserInfo from "@/hooks/login/useQQUserInfo";
import useBindPhoneFormValid from "@/hooks/login/useBindPhoneFormValid";

export default {
  name: "LoginCallbackBindPhone",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { nickename, avatar } = useQQUserInfo();
    const { onSubmitHandler, getMsgCode, ...bindPhoneValid } =
      useBindPhoneFormValid(props);

    return {
      nickename,
      avatar,
      onSubmitHandler,
      getMsgCode,
      ...bindPhoneValid,
    };
  },
};
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
