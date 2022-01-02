import _ from "lodash";
import dayjs from "dayjs";

_.join(["aaa", "bbb"]);
console.log(`今天是${dayjs().date()}号 print in ./src/index.js`);

import("./js/bar").then(({ default: country }) => {
  console.log(`./js/bar.js异步导出了${country}`);
});
