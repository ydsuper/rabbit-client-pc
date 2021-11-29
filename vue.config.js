module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        __dirname + "/src/assets/styles/variables.less",
        __dirname + "/src/assets/styles/mixin.less",
      ],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 10000 }));
  },
};
