module.exports = {
  pluginOptions: {
    // 自动注入 less 文件
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        __dirname + "/src/assets/styles/variables.less",
        __dirname + "/src/assets/styles/mixin.less",
      ],
    },
  },
  chainWebpack: (config) => {
    // 禁用域名检查
    config.devServer.disableHostCheck(true);
    // 小于 10kb 的图片打包为 base64 编码格式
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 10000 }));
    config.plugin("html").tap((args) => {
      args[0].title = "小兔鲜儿 - 新鲜 惠民 快捷！";
      // args[0].title = "学习QQ登录 - 其他 - YDSUPER";
      return args;
    });
    // 修复HMR（热更新）
    config.resolve.symlinks(true);
  },
};
