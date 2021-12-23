const hobbies: Array<string> = ["football", "basketball", "tennis"];

interface IAddress {
  province: string;
  city: string;
}

const address: IAddress = {
  province: "JiangSu",
  city: "WuXi",
};

// console.log(abc);  // 故意让console报错，分析source-map的26条规则

module.exports = {
  hobbies,
  address,
};
