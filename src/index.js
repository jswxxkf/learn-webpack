import _ from "lodash";
import dayjs from "dayjs";

_.join(["aaa", "bbb"]);
console.log(`今天是${dayjs().date()}号 print in ./src/index.js`);

// 添加魔法注释 magic comment,令webpack赋予chunk以name
import(/* webpackChunkName: "bar" */ "./js/bar").then(
  ({ default: country }) => {
    console.log(`./js/bar.js异步导出了${country}`);
  },
);

// 用于测试异步懒加载(vue-router的基本原理)
const button = document.createElement("button");

button.innerHTML = "加载元素";

button.addEventListener("click", () => {
  // 以下也是魔法注释
  // prefetch: 预获取(将来某些导航下可能需要的资源)等待空闲时下载, 而非用户点击按钮后再下载)
  // preload: 预加载(当前导航下可能需要的资源)与父chunk并行下载
  import(
    /* webpackChunkName: "element" */
    /* webpackPrefetch: true */
    "./js/element"
  ).then(({ default: element }) => {
    document.body.appendChild(element);
  });
});

document.body.appendChild(button);
