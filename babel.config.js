module.exports = {
  // babel预设只是默认将代码进行转换，ES6+的新特性还需要额外的polyfill
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
    ["@babel/preset-react"],
  ],
};
