<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button v-else @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form @submit="onAccountFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入用户名"
                v-model="accountField"
              />
            </div>
            <div class="error" v-if="accountError">
              <i class="iconfont icon-warning">{{ accountError }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="passwordField"
              />
            </div>
            <div class="error" v-if="passwordError">
              <i class="iconfont icon-warning">{{ passwordError }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="accountIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="accountIsAgreeError">
              <i class="iconfont icon-warning">{{ accountIsAgreeError }}</i>
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <form @submit="onMobileFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="mobileField"
              />
            </div>
            <div class="error" v-if="mobileError">
              <i class="iconfont icon-warning">{{ mobileError }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input
                type="password"
                placeholder="请输入验证码"
                v-model="codeField"
              />
              <span
                class="code"
                :class="{ disabled: isActive }"
                @click="getMsgCode"
                >{{ isActive ? `剩余${count}秒` : "发送验证码" }}</span
              >
            </div>
            <div class="error" v-if="codeError">
              <i class="iconfont icon-warning">{{ codeError }}</i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="mobileIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="mobileIsAgreeError">
              <i class="iconfont icon-warning">{{ mobileIsAgreeError }}</i>
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
    </div>
    <div class="action">
      <!-- QQ登录按钮 -->
      <!-- <span id="qqLoginBtn"> </span>-->
      <!-- <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" /> -->
      <a :href="loginUrl">
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="QQ登录"
        />
      </a>
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import useAccountFormValidate from "@/hooks/login/useAccountFormValidate";
import useMobileFormValidate from "@/hooks/login/useMobileFormValidate";

export default {
  name: "LoginForm",
  setup() {
    // 是否为短信登录
    const isMsgLogin = ref(false);

    const { proxy } = getCurrentInstance();

    const { onAccountFormSubmit, ...accountFormValid } =
      useAccountFormValidate();
    const { onMobileFormSubmit, ...mobileFormValid } =
      useMobileFormValidate(proxy);

    // onMounted(() => {
    //   // 加载QQ登录按钮
    //   window.QC.Login({
    //     btnId: "qqLoginBtn",
    //   });
    // });

    return {
      isMsgLogin,
      onAccountFormSubmit,
      ...accountFormValid,
      onMobileFormSubmit,
      ...mobileFormValid,
      loginUrl: process.env.VUE_APP_QQ_LOGIN,
    };
  },
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        .code.disabled {
          cursor: wait;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
