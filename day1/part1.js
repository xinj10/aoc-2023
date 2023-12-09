import { readFile } from "node:fs";

const isDigit = (c) => /^\d$/.test(c);

readFile("./day1/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return 0;
  } else {
    const split_data = data.split("\n").map((s) => s.split(""));
    const result = split_data
      .map((a) => a.filter((c) => isDigit(c)))
      .reduce(
        (total, current) =>
          total +
          Number.parseInt(current[0], 10) * 10 +
          Number.parseInt(current.at(-1), 10),
        0
      );
    console.log(result);
  }
});
