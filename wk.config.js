const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "eval-source-map",
  entry: "./src/main.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
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
  ],
};
