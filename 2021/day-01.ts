import fs from "fs";

const answer = fs
  .readFileSync("./day-01.input")
  .toString()
  .split("\n")
  .map((i) => +i.trim())
  .filter((v, i, s) => i !== s.length - 1 && v < s[i + 1]).length;

console.log(answer);

const answer2 = fs
  .readFileSync("./day-01.input")
  .toString()
  .split("\n")
  .map((i) => +i.trim())
  .map((v, i, s) => (i < s.length - 2 ? v + s[i + 1] + s[i + 2] : 0))
  .filter((v, i, s) => i !== s.length - 1 && v < s[i + 1]).length;

console.log(answer2);
