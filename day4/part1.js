const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");
const cleaned_input = input.map((card) => {
  return card
    .split(":")
    .at(1)
    .split("|")
    .map((cardPool) => cardPool.trim().split(/\s+/));
});

const result = cleaned_input.reduce((total, current) => {
  let count = 0;
  for (numA of current[0]) {
    if (current[1].includes(numA)) count++;
  }
  if (count == 0) return total;
  return total + Math.pow(2, count - 1);
}, 0);
console.log(result);
