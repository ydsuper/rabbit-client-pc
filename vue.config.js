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
};
