import { useField, useForm } from "vee-validate";
import { mobile, code, isAgree } from "@/utils/vee-validate-schema";
import { getLoginMsgCode, loginByMobileMsgCode } from "@/api/user";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/login/useLoginAfter";

export default function useMobileFormValidate(instance) {
  // 创建账号登陆表单验证
  const { handleSubmit: mobileFormHandleSubmit } = useForm({
    // 指定表单验证规则
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });
  // 对手机号进行验证（使用account规则）
  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  // 对短信验证码进行验证（使用password规则）
  const { value: codeField, errorMessage: codeError } = useField("code");
  // 对协议进行验证（使用isAgree规则）
  const { value: mobileIsAgreeField, errorMessage: mobileIsAgreeError } =
    useField("isAgree");

  //#region 发送验证码
  // 校验规则
  const { validate: mobileValidate } = useField("mobile");
  // 获取手机号是否验证通过
  // const getMobileIsValidate = async () => {
  //   let { valid } = await mobileValidate();
  //   console.log(valid);
  // };
  // 导入计时器（验证码）
  const { count, start, isActive } = useCountDown();

  // 发送验证码
  const getMsgCode = async () => {
    const { valid } = await mobileValidate();
    if (valid && !isActive.value) {
      try {
        // 发送请求 获取手机验证码
        await getLoginMsgCode(mobileField.value);
        instance.$message({ type: "success", text: "验证码发送成功" });
        // 开启倒计时
        start(60);
      } catch (error) {
        const msg = error.err.response.data.message;
        instance.$message({ type: "error", text: msg });
      }
    }
  };
  //#endregion

  // 登录成功/失败 操作方法
  const { loginSuccessFn, loginFailedFn } = useLoginAfter();

  //#region 手机号登录
  const onMobileFormSubmit = mobileFormHandleSubmit((value) => {
    loginByMobileMsgCode(value).then(loginSuccessFn).catch(loginFailedFn);
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
    getMsgCode,
    count,
    isActive,
  };
}
