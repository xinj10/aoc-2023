import { readFileSync } from "fs";

const input = readFileSync("./day3/input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""));
const nRow = input.length;
const nCol = input[0].length;

const getNeighbor = (r, c) => {
  const nei = [];
  for (let ri = -1; ri < 2; ri++) {
    for (let ci = -1; ci < 2; ci++) {
      const newR = ri + r;
      const newC = ci + c;
      if (newR < 0 || newR >= nRow || newC < 0 || newC >= nCol) {
        continue;
      }
      nei.push([newR, newC]);
    }
  }
  return nei;
};

const checkNearSymbol = (r, c) => {
  const neighbors = getNeighbor(r, c);
  let symbol = false;
  neighbors.forEach((n) => {
    const [nr, nc] = n;
    if (input[nr][nc] === ".") {
      return;
    } else if (/^\d$/.test(input[nr][nc])) {
      return;
    } else {
      symbol = true;
    }
  });
  return symbol;
};

let result = 0;
for (let r = 0; r < nRow; r++) {
  let accNum = 0;
  let flag = false;
  for (let c = 0; c < nCol; c++) {
    const ch = input[r][c];
    if (/^\d$/.test(ch)) {
      accNum = accNum * 10 + Number.parseInt(ch, 10);
      flag = flag || checkNearSymbol(r, c);
    } else {
      if (flag) result += accNum;
      flag = false;
      accNum = 0;
    }
  }
  if (flag) result += accNum;
}
console.log(result);
