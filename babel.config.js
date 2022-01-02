const presets = [
  // babel预设只是默认将代码进行转换，ES6+的新特性还需要额外的polyfill
  [
    "@babel/preset-env",
    {
      useBuiltIns: "entry",
      corejs: 3,
    },
  ],
  ["@babel/preset-react"],
  ["@babel/preset-typescript"],
];

const plugins = [];

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  plugins.push(["react-refresh/babel"]);
}

module.exports = {
  presets,
  plugins,
};
