'use strict';
const handleNegative = (a, b) => (a > b ? [a, b] : [b, a]);
const handlePositive = (a, b) => [a, b];
const generateQuizNumbers = function (
  quizLength,
  minNumber,
  maxNumber,
  canBeNegative
) {
  const quizNumbers = [];
  const chceckfunction = canBeNegative ? handlePositive : handleNegative;
  for (let i = 0; i < quizLength; i++) {
    const a = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    const b = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    quizNumbers.push(chceckfunction(a, b));
  }
  return quizNumbers;
};
const quizDiffHandler = function (diff, length, canBeNegative) {
  let quizNums;
  switch (diff) {
    case 1:
      quizNums = generateQuizNumbers(length, 0, 5, canBeNegative);
      break;
    case 2:
      quizNums = generateQuizNumbers(length, 5, 10, canBeNegative);
      break;
    case 3:
      quizNums = generateQuizNumbers(length, 10, 15, canBeNegative);
      break;
    case 4:
      quizNums = generateQuizNumbers(length, 15, 20, canBeNegative);
      break;
    case 5:
      quizNums = generateQuizNumbers(length, 10, 20, canBeNegative);
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
    (canBeNegative = true)
  );
  const quizData = {
    numbers: quizNumbers,
    operation: operation,
    answer: quizNumbers.map((nums) => nums.reduce((a, b) => eval(`${a} ${operation} ${b}`))
    ),
  };
  return quizData;
}
