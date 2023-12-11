const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
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

const getPairs = (r, c) => {
  const pairs = [];
  const pairsId = new Set();
  for (let i = -1; i < 2; i++) {
    const currRow = r + i;
    if (currRow < 0 || currRow >= nRow) continue;
    for (let j = -1; j < 2; j++) {
      const currCol = c + j;
      if (currCol < 0 || currCol >= nCol) continue;
      const item = grid[currRow][currCol];
      if (typeof item === "object" && !pairsId.has(item.pairId)) {
        pairs.push(item);
        pairsId.add(item.pairId);
      }
    }
  }
  return pairs;
};

let gearRatioSum = 0;
for (let r = 0; r < nRow; r++) {
  for (let c = 0; c < nCol; c++) {
    if (isDigid(input[r][c]) || input[r][c] === ".") continue;
    // gear
    const pairs = getPairs(r, c);
    if (pairs.length === 2) {
      gearRatioSum +=
        Number.parseInt(pairs[0].accNum, 10) *
        Number.parseInt(pairs[1].accNum, 10);
    }
  }
}

console.log(gearRatioSum);
