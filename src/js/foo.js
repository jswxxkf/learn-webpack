const name = "why";
const age = 18;

const printInfo = () => {
  console.log(`${name} is ${age} years old`);
};

Promise.resolve("111").then((res) => {
  console.log("Asynchronous test passed~");
});

export { name, age, printInfo };
