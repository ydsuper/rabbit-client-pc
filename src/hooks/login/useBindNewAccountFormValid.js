import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/vee-validate-schema";
import { createNewAccountBindQQ, getRegisterMsgCode } from "@/api/user";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/login/useLoginAfter";

export default function useBindNewAccountFormValid(props) {
  // 创建表单验证对象
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      code,
      mobile,
      password,
      rePassword,
    },
  });
  // 创建用于验证用户名的表单项验证对象
  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  // 创建验证验证码的表单项验证对象
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 创建验证手机号的表单项验证对象
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileVaild,
  } = useField("mobile");
  // 创建验证密码的表单项验证对象
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 创建验证两次密码是否一致的表单验证项对象
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");

  //#region 获取短信验证码
  const { count, start, isActive } = useCountDown();
  const getMsgCode = async () => {
    const { valid } = await mobileVaild();
    if (valid && !isActive.value) {
      // try..catch.. 适合处理此无需返回值的情况
      try {
        await getRegisterMsgCode(mobileField.value);
        Message({ type: "success", text: "验证码发送成功" });
        // 开启计时器
        start(60);
      } catch (error) {
        const msg = error.err.response.data.message;
        Message({ type: "error", text: msg });
      }
    }
  };
  //#endregion

  // 表单提交方法
  const { loginSuccessFn, loginFailedFn } = useLoginAfter();
  const onSubmitHandler = handleSubmit((value) => {
    console.log(value);
    createNewAccountBindQQ({
      unionId: props.unionId,
      account: value.checkUserAccount,
      mobile: value.mobile,
      code: value.code,
      password: value.password,
    })
      // 注册绑定QQ成功
      .then(loginSuccessFn)
      // 注册绑定QQ失败
      .catch(loginFailedFn);
  });

  return {
    accountField,
    accountError,
    codeField,
    codeError,
    mobileField,
    mobileError,
    passwordField,
    passwordError,
    rePasswordField,
    rePasswordError,
    onSubmitHandler,
    getMsgCode,
    count,
    start,
  };
}
