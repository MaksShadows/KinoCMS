 // module.exports = {
//   publicPath: "",
// };

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: false,
  outputDir: "./dist",
  assetsDir: "static",
  indexPath: "templates/index.html",
};
