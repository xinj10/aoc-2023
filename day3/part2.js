const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "sample.txt"), "utf-8")
  .split("\n");

const nRow = input.length;
const nCol = input[0].length;

const isDigid = (c) => /^\d$/.test(c);

let pairId = 0;
const grid = input.map((row) => {
  const gridRow = [];
  let accNum = "";
  for (let i = 0; i < row.length; i++) {
    if (isDigid(row[i])) accNum += row[i];
    else {
      if (accNum) {
        for (let j = 0; j < accNum.length; j++) {
          gridRow.push({ accNum, pairId });
        }
        accNum = "";
        pairId += 1;
      }
      gridRow.push(row[i]);
    }
  }

  if (accNum) {
    for (let j = 0; j < accNum.length; j++) {
      gridRow.push({ accNum, pairId });
      accNum = "";
      pairId += 1;
    }
  }
  return gridRow;
});

console.log(grid);
