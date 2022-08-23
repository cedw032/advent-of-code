import fs from "fs";

const splitInput = fs
  .readFileSync("./day-03.input")
  .toString()
  .split("\n")
  .map((s) => s.split("").map((i) => +i));

const gammaBin = splitInput
  .reduce((tally, row) => {
    return row.map((v, i) => v + tally[i]);
  }, new Array<number>(12).fill(0))
  .map((d) => Math.round(d / splitInput.length));

const epsilonBin = gammaBin.map((d) => 1 - d);

const gamma = gammaBin.reverse().reduce(decimalFromBits, 0);
const epsilon = epsilonBin.reverse().reduce(decimalFromBits, 0);

console.log(gamma * epsilon);

function decimalFromBits(carry: number, bit: number, index: number): number {
  return carry + bit * Math.pow(2, index);
}

// PT 2
let oxCandidates = splitInput,
  coCandidates = splitInput;

for (let i = 0; i < 12; ++i) {
  const mostCommon = oxCandidates
    .reduce((tally, row) => {
      return row.map((v, i) => v + tally[i]);
    }, new Array<number>(12).fill(0))
    .map((d) => (d / oxCandidates.length >= 0.5 ? 1 : 0));

  const leastCommon = coCandidates
    .reduce((tally, row) => {
      return row.map((v, i) => v + tally[i]);
    }, new Array<number>(12).fill(0))
    .map((d) => (d / coCandidates.length >= 0.5 ? 0 : 1));

  oxCandidates.length !== 1 &&
    (oxCandidates = oxCandidates.filter((c) => c[i] === mostCommon[i]));
  coCandidates.length !== 1 &&
    (coCandidates = coCandidates.filter((c) => c[i] === leastCommon[i]));
}

const ox = oxCandidates[0].reverse().reduce(decimalFromBits);
const co = coCandidates[0].reverse().reduce(decimalFromBits);

console.log(oxCandidates.length, coCandidates.length);

console.log(ox * co);
