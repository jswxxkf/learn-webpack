import _ from "lodash";
import dayjs from "dayjs";
// for babel(entry) ==========
import "core-js/stable";
import "regenerator-runtime/runtime";
// ===========================
import Vue from "vue";
import App from "./vue-sfc/App.vue";
// ===========================
import "./css/title.css";
import "./css/image.less";
import "./font/iconfont.css";
// react test
import "@@/baz.jsx";
import { printInfo } from "@/js/foo";
const { address } = require("@/js/bar.ts");
// vendor

printInfo();
console.log(address);
_.join(["abc", "cba"]);
console.log(`今天是${dayjs().date()}号 print in ./src/main.js`);

const titleEl = document.createElement("h2");
titleEl.innerHTML = "Hello Webpack!";
titleEl.className = "title";
document.body.appendChild(titleEl);

const subTitleEl = document.createElement("div");
subTitleEl.innerHTML = "你好，Webpack！";
subTitleEl.className = "subtitle";
document.body.appendChild(subTitleEl);

const imgEl = document.createElement("img");
imgEl.src = require("./img/2.jpg");
imgEl.className = "image";
document.body.appendChild(imgEl);

const bgEl = document.createElement("div");
bgEl.className = "bg";
document.body.appendChild(bgEl);

const iEl = document.createElement("i");
iEl.className = "iconfont icon-aixin";
document.body.appendChild(iEl);

// vue test
new Vue({
  render: (h) => h(App),
}).$mount("#app-vue");

// for HMR
if (module.hot) {
  module.hot.accept("./js/baz.jsx", () => {
    console.log("代码发生了更新");
  });
}
