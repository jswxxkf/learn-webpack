const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
    new CssMinimizerPlugin(),
  ],
  optimization: {
    // 对代码进行压缩(compress)、丑化(mangle)相关的操作
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true, // 利用多核CPU并发处理
        terserOptions: {
          // 各种配置
          // mangle: true,
          // toplevel: true,
          // keep_classnames: false,
          // keep_fnames: false,
          // ......
        },
      }),
    ],
  },
};
