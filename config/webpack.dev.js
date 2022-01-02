const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const resolveApp = require("./paths");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: "only",
    host: "0.0.0.0",
    port: 8090,
    // open: true,
    compress: true,
    static: {
      publicPath: "/abc",
      directory: resolveApp("./abc"),
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8088",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  plugins: [new ReactRefreshPlugin()],
};
