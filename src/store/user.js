const user = {
  namespaced: true, //开启命名空间
  state() {
    return {
      // 用户信息
      profile: {
        id: "", //用户id
        avatar: "", //用户头像
        nickname: "", //用户你猜
        account: "", //用户账号
        mobile: "", //用户手机号
        token: "", //用户登录令牌
      },
      // 重定向地址
      redirectURL: "",
    };
  },
  mutations: {
    setUser(state, payload = {}) {
      state.profile = payload;
      // if (Object.getOwnPropertyNames(payload).length !== 0) {
      //   state.profile = Object.assign(state.profile, payload);
      // } else {
      //   state.profile = {};
      // }
    },
    setToken(state, payload = "") {
      state.profile.token = payload;
    },
    // 设置重定向地址
    setRedirectURL(state, payload = "") {
      state.redirectURL = payload;
    },
  },
  actions: {},
};

export default user;
