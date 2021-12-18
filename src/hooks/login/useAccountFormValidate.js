import { useField, useForm } from "vee-validate";
import { account, password, isAgree } from "@/utils/vee-validate-schema";
import { loginByAccountAndPassword } from "@/api/user";
import useLoginAfter from "@/hooks/login/useLoginAfter";

export default function useAccountFormValidate() {
  // 创建账号登陆表单验证
  const { handleSubmit: accountFormHandleSubmit } = useForm({
    // 指定表单验证规则
    validationSchema: {
      account,
      password,
      isAgree,
    },
  });
  // 对用户名进行验证（使用account规则）
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  // 对密码进行验证（使用password规则）
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 对协议进行验证（使用isAgree规则）
  const { value: accountIsAgreeField, errorMessage: accountIsAgreeError } =
    useField("isAgree");

  //#默认
  accountField.value = "ydsuper";
  passwordField.value = "123123";

  // 登录成功/失败 操作方法
  const { loginSuccessFn, loginFailedFn } = useLoginAfter();

  //#region 账号登录
  const onAccountFormSubmit = accountFormHandleSubmit((value) => {
    // console.log(value); //@log
    loginByAccountAndPassword(value).then(loginSuccessFn).catch(loginFailedFn);
  });
  //#endregion

  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountIsAgreeField,
    accountIsAgreeError,
    onAccountFormSubmit,
  };
}
