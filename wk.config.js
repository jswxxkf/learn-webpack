const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devtool: "nosources-source-map",
  entry: {
    main: "./src/main.js",
    index: "./src/index.js",
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    chunkFilename: "[name].chunk.js",
    publicPath: "/abc",
  },
  externals: {
    lodash: "_",
    dayjs: "dayjs",
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
          "style-loader",
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
          filename: "img/[name].[hash:6][ext]",
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
          filename: "font/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.vue/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "KaifengXue Webpack",
      template: "./public/index.html",
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
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
    new ESLintWebpackPlugin({
      exclude: "**/*.vue",
    }),
    new VueLoaderPlugin(),
    new ReactRefreshPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",
    }),
  ],
  devServer: {
    hot: "only",
    host: "0.0.0.0",
    port: 8090,
    // open: true,
    compress: true,
    static: {
      publicPath: "/abc",
      directory: path.resolve(__dirname, "./abc"),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@": path.resolve(__dirname, "./src/js"),
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
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
          filename: "[id].vendors.js",
          priority: -10,
        },
        default: {
          filename: "[id].common.js",
          priority: -20,
        },
      },
    },
    runtimeChunk: "single",
  },
};
