const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 配置合并merge相关
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
// 拼接cwd路径
const resolveApp = require("./paths");

const commonConfig = (isProduction) => ({
  // entry的相对路径是相对于context所在的路径(启动webpack的路径)
  entry: {
    main: "./src/main.js",
    index: "./src/index.js",
  },
  output: {
    filename: "js/[name].[chunkhash:6].bundle.js",
    path: resolveApp("./build"),
    chunkFilename: "js/[name].[contenthash:6].chunk.js",
  },
  resolve: {
    alias: {
      "@": resolveApp("./src"),
      "@@": resolveApp("./src/js"),
    },
    mainFiles: ["index"],
    extensions: [
      ".wasm",
      ".mjs",
      ".js",
      ".json",
      ".jsx",
      ".ts",
      ".tsx",
      ".vue",
    ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset",
        generator: {
          filename: "img/[name].[contenthash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|eot|woff2?|json)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[contenthash:6][ext]",
        },
      },
      {
        test: /\.vue/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "KaifengXue Webpack",
      template: "./public/index.html",
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
    new ESLintWebpackPlugin({
      exclude: "**/*.vue",
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    // 对代码进行压缩相关的操作
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    // natural: 自然数 不推荐
    // named: 使用包所在目录作为name 在开发环境推荐
    // deterministic: 确定地生成id, 针对相同文件生成的id是不变的
    chunkIds: "deterministic",
    splitChunks: {
      // async针对异步导入拆包
      // initial针对同步导入
      // all针对异步/同步导入
      chunks: "all",
      // 最小尺寸，如果拆分出来一个，则拆分出来的这个包的大小最小为minSize
      // minSize: 20000,
      // 将大于maxSize的包，拆分成不小于minSize的包
      // maxSize: 20000,
      // minChunks: 引入的包至少被导入了几次
      minChunks: 1,
      // 缓存组
      cacheGroups: {
        // 第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id].[hash:6].vendors.js",
          priority: -10,
        },
        default: {
          filename: "js/[id].[hash:6].common.js",
          priority: -20,
        },
      },
    },
    // true/multiple
    // single
    // Object: {name: xxx}
    // 运行时相关的代码分包，包括模块的导入、解析等等
    runtimeChunk: "single",
  },
});

module.exports = function common(env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;
  return merge(commonConfig(isProduction), config);
};
