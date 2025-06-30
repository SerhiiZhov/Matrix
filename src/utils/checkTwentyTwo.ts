export default function checkTwentyTwo(number: number) {
  number = removeLeadingZeros(number);
  return number > 22 ? sumAllDigits(number) : number;
}

function removeLeadingZeros(number: number) {
  return Number(number);
}

function sumAllDigits(number: number) {
  return String(number)
    .split("")
    .map(Number)
    .reduce((acc, value) => acc + value, 0);
}
