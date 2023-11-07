'use strict';
const handleNegative = (a, b) => (a > b ? [a, b] : [b, a]);
const handlePositive = (a, b) => [a, b];
const getDividers = (n) => {
  const dividers = [];
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      dividers.push(i);
    }
  }
  return dividers;
};
const handleDivision = function (minNum, maxNum, length) {
  const nums = [];
  let a, aDividers, b;
  for (let i = 0; i < length; i++) {
    do {
      a = Math.floor(Math.random() * (minNum - maxNum)) + maxNum;
      aDividers = getDividers(a);
    } while (!aDividers);
    b = aDividers[Math.floor(Math.random() * aDividers.length)];
    nums.push([a, b]);
  }
  return nums;
};
const generateQuizNumbers = function (
  quizLength,
  minNumber,
  maxNumber,
  canBeNegative,
  operation
) {
  if (operation === "/")
  {
    return handleDivision(minNumber,maxNumber,quizLength)
  }
  const quizNumbers = [];
  const chceckfunction = canBeNegative ? handlePositive : handleNegative;
  for (let i = 0; i < quizLength; i++) {
    const a = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    const b = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    quizNumbers.push(chceckfunction(a, b));
  }
  return quizNumbers;
};
const quizDiffHandler = function (diff, length, canBeNegative,operation) {
  let quizNums;
  switch (diff) {
    case 1:
      quizNums = generateQuizNumbers(length, 0, 5, canBeNegative,operation);
      break;
    case 2:
      quizNums = generateQuizNumbers(length, 5, 10, canBeNegative,operation);
      break;
    case 3:
      quizNums = generateQuizNumbers(length, 10, 15, canBeNegative,operation);
      break;
    case 4:
      quizNums = generateQuizNumbers(length, 15, 20, canBeNegative,operation);
      break;
    case 5:
      quizNums = generateQuizNumbers(length, 10, 20, canBeNegative,operation);
      break;
  }
  return quizNums;
};
export function quizQuestionGenerator(
  operation,
  difficulty,
  length,
  canBeNegative
) {
  const quizNumbers = quizDiffHandler(
    difficulty,
    length,
    (canBeNegative = true),
    operation
  );
  const quizData = {
    numbers: quizNumbers,
    operation: operation,
    answer: quizNumbers.map((nums) =>
      nums.reduce((a, b) => eval(`${a} ${operation} ${b}`))
    ),
  };
  return quizData;
}
