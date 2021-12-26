const name = "xkf";
const age = 26;

const printInfo = () => {
  console.log(`${name} is ${age} years old`);
};

Promise.resolve("111").then((res) => {
  console.log("Asynchronous test passed~");
});

export { name, age, printInfo };
