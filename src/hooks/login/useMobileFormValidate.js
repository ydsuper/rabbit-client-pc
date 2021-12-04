import { useField, useForm } from "vee-validate";
import { mobile, code, isAgree } from "@/utils/vee-validate-schema";

export default function useMobileFormValidate() {
  // 创建账号登陆表单验证
  const { handleSubmit: mobileFormHandleSubmit } = useForm({
    // 指定表单验证规则
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });
  // 对用户名进行验证（使用account规则）
  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  // 对密码进行验证（使用password规则）
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 对协议进行验证（使用isAgree规则）
  const { value: mobileIsAgreeField, errorMessage: mobileIsAgreeError } =
    useField("isAgree");

  //#region 账号登录
  const onMobileFormSubmit = mobileFormHandleSubmit((value) => {
    console.log(value);
  });
  //#endregion

  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    mobileIsAgreeField,
    mobileIsAgreeError,
    onMobileFormSubmit,
  };
}
