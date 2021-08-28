module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "ru",
      localeDir: "./src/assets/i18n",
      enableInSFC: false
    }
  },
  productionSourceMap: false,
  outputDir: "./dist",
  assetsDir: "static",
  indexPath: "templates/index.html"
};
