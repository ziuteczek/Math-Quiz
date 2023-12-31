'use strict';
const handleNegative = (a, b) => (a > b ? [a, b] : [b, a]);
const handlePositive = (a, b) => [a, b];
const getDividers = (n, allowNotIntegers = false) => {
  const dividers = [];
  const dividableToHalf = allowNotIntegers
    ? (n, i) => n / i - Math.floor(n / i) === 0.5
    : false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0 || dividableToHalf) {
      dividers.push(i);
    }
  }
  return dividers;
};
const isRepeated = (toCheck, quizNums = []) =>
  quizNums.some((nums) => toCheck.every((val, i) => val === nums[i]));
const handleDivision = function (minNum, maxNum, length) {
  const nums = [];
  let a, aDividers, b;
  for (let i = 0; i < length; i++) {
    do {
      do {
        a = Math.floor(Math.random() * (minNum - maxNum)) + maxNum;
        aDividers = getDividers(a);
      } while (aDividers.length == 0);
      b = aDividers[Math.floor(Math.random() * aDividers.length)];
    } while (isRepeated([a, b], nums));
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
  if (operation === '/') {
    return handleDivision(minNumber, maxNumber, quizLength);
  }
  const quizNumbers = [];
  const chceckfunction = canBeNegative ? handlePositive : handleNegative;
  let a, b;
  for (let i = 0; i < quizLength; i++) {
    do {
      a = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
      b = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    } while (isRepeated([a, b], quizNumbers));
    quizNumbers.push(chceckfunction(a, b));
  }
  return quizNumbers;
};
const quizDiffHandler = function (diff, length, canBeNegative, operation) {
  return generateQuizNumbers(
    length,
    ...diffToRange(diff,operation),
    canBeNegative,
    operation
  );
};
const diffToRange = (difficulty, operation) => {
  console.log(operation);
  if (operation === '+' || operation === '-')
    switch (difficulty) {
      case 1:
        return [1, 15];
      case 2:
        return [10, 50];
      case 3:
        return [50, 100];
    }
  else if (operation === '/') {
    switch (difficulty) {
      case 1:
        return [1, 20];
      case 2:
        return [30, 50];
      case 3:
        return [50, 100];
    }
  }
  else {
    switch (difficulty) {
      case 1:
        return [2, 5];
      case 2:
        return [4, 7];
      case 3:
        return [7, 10];
    }
  }
};
const operatorToString = (operator) => {
  let operationName;
  switch (operator) {
    case '*':
      operationName = 'Mnożenie';
      break;
    case '+':
      operationName = 'Dodawanie';
      break;
    case '-':
      operationName = 'Odejmowanie';
      break;
    case '/':
      operationName = 'Dzielenie';
      break;
  }
  return operationName;
};
const createTitleString = (minNum, maxNum, operation) =>
  `${operatorToString(operation)} w zakresie od ${minNum} do ${maxNum}`;
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
    title: createTitleString(...diffToRange(difficulty, operation), operation),
  };
  return quizData;
}
