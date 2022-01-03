const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  // devtool: "nosources-source-map",
  // 不需要进行打包的库
  externals: {
    lodash: "_",
    dayjs: "dayjs",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html", "**/.DS_Store"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
    }),
  ],
};
