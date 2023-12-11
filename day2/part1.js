const fs = require("fs");
const limit = { red: 12, green: 13, blue: 14 };

const input = fs.readFileSync("./day2/input.txt", "utf-8").split("\n");
const cleaned_input = input
  .map((i) => i.split(":").at(1).trim())
  .map((s) => s.split(";"))
  .map((l) => l.map((s) => s.trim().split(",")));
console.log(cleaned_input);

const result = cleaned_input.reduce((total, current, index) => {
  let max_red = 0;
  let max_green = 0;
  let max_blue = 0;
  current.forEach((pick) => {
    pick.forEach((ball) => {
      const ballNumber = ball.match(/\d+/)[0];
      const ballType = ball.at(-1);
      switch (ballType) {
        case "d": //red
          max_red = Math.max(max_red, ballNumber);
          break;
        case "n": //green
          max_green = Math.max(max_green, ballNumber);
          break;
        case "e": //blue
          max_blue = Math.max(max_blue, ballNumber);
          break;
        default:
          console.log("[ERR] unexpected ball color");
      }
    });
  });
  if (
    max_red <= limit.red &&
    max_green <= limit.green &&
    max_blue <= limit.blue
  ) {
    return total + index + 1;
  }
  return total;
}, 0);

console.log(result);
