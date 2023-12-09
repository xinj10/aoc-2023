import { readFileSync } from "node:fs";

const numDict = {
  o: ["one"],
  t: ["two", "three"],
  f: ["four", "five"],
  s: ["six", "seven"],
  e: ["eight"],
  n: ["nine"],
};

const numTable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function isDigit(c) {
  return /^\d$/.test(c);
}

function interpret(s) {
  const numbers = [];
  for (let i = 0; i < s.length; i++) {
    if (isDigit(s[i])) {
      numbers.push(Number.parseInt(s[i], 10));
      continue;
    }
    if (s[i] in numDict) {
      numDict[s[i]]
        .filter((num) => s.substring(i, i + num.length) === num)
        .forEach((num) => numbers.push(numTable[num]));
    }
  }
  return numbers;
}

function parseData(data) {
  data = data.split("\n");
  return data;
}

function solve(data){
  data = parseData(data);
  return data.reduce((total, current) => {
    const legalNumbers = interpret(current).map((num) =>
      Number.parseInt(num, 10)
    );
    return total + legalNumbers[0] * 10 + legalNumbers.at(-1);
  }, 0);
}

const data = readFileSync("./day1/input.txt", "utf-8");
console.log(solve(data));
