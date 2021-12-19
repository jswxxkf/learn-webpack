import { printInfo } from "./js/foo.js";
const { address } = require("./js/bar.js");

import "./css/title.css";
import "./css/image.less";
import "./font/iconfont.css";

printInfo();
console.log(address);

const titleEl = document.createElement("div");
titleEl.innerHTML = "Hello Webpack!";
titleEl.className = "title";
document.body.appendChild(titleEl);

const subTitleEl = document.createElement("div");
subTitleEl.innerHTML = "你好啊，Webpack！";
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
