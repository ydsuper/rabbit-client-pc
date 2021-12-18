import { useField, useForm } from "vee-validate";
import { mobile, code } from "@/utils/vee-validate-schema";
import { bindMobileAndQQ, getBindMobileMsgCode } from "@/api/user";
import useCountDown from "@/hooks/useCountDown";
import Message from "@/components/library/Message";
import useLoginAfter from "@/hooks/login/useLoginAfter";

export default function useBindPhoneFormValid(props) {
  const { handleSubmit } = useForm({
    // 设置校验规则
    validationSchema: { mobile, code },
  });

  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValid,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");

  //#region 获取验证码
  const { count, start, isActive } = useCountDown();
  const getMsgCode = async () => {
    // 验证手机号
    const { valid } = await mobileValid();
    if (valid && !isActive.value) {
      try {
        await getBindMobileMsgCode(mobileField.value);
        Message({ type: "success", text: "验证码发送成功" });
        start(60);
      } catch (error) {
        const msg = error.err.response.data.message;
        Message({ type: "error", text: msg });
      }
    }
  };
  //#endregion

  // 提交表单
  // 登录成功/失败后的回调函数
  const { loginSuccessFn, loginFailedFn } = useLoginAfter();
  // 表单提交方法
  const onSubmitHandler = handleSubmit((value) => {
    bindMobileAndQQ({ ...value, unionId: props.unionId })
      .then(loginSuccessFn)
      .catch(loginFailedFn);
  });

  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    getMsgCode,
    onSubmitHandler,
    count,
    isActive,
  };
}
