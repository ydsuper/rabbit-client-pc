<template>
  <form class="xtx-form" @submit="onSubmitHandler">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入用户名"
          v-model="accountField"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="请输入手机号"
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
          placeholder="请输入验证码"
          v-model="codeField"
        />
        <span class="code" @click="getMsgCode">{{
          isActive ? `剩余${count}秒` : "发送验证码"
        }}</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="passwordField"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          type="password"
          placeholder="请确认密码"
          v-model="rePasswordField"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import useBindNewAccountFormValid from "@/hooks/login/useBindNewAccountFormValid";

export default {
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { onSubmitHandler, ...bindNewAccountValid } =
      useBindNewAccountFormValid(props);
    return { onSubmitHandler, ...bindNewAccountValid };
  },
};
</script>

<style scoped lang="less">
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
