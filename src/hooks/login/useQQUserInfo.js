import { ref } from "vue";

// 获取QQ 信息
export default function useQQUserInfo() {
  // QQ互联对象
  const QC = window.QC;
  // QQ昵称
  const nickename = ref("");
  // QQ头像
  const avatar = ref("");

  if (QC.Login.check()) {
    // https://graph.qq.com/user/get_user_info?oauth_consumer_key=100556005&access_token=941A9FB005A89E412E2A312E67E3FA54&openid=0FBC964BA51479C554DB343232A00798&format=json
    QC.api("get_user_info").success((res) => {
      console.log(res);

      nickename.value = res.data.nickname;
      avatar.value = res.data.figureurl_1;
    });
  }
  return { nickename, avatar };
}
