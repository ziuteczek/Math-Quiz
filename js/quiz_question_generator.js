'use strict'
const generateQuizNumbers = function(quizLength,minNumber,maxNumber)
{
  const quizNumbers = [];
  for (let i = 0; i < quizLength;i++)
  {
    const a = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    const b = Math.round(Math.random() * (minNumber - maxNumber)) + maxNumber;
    quizNumbers.push([a,b]);
  }
  return quizNumbers;
}
const quizDiffHandler = function(diff,length)
{
  let quizNums;
  switch(diff)
  {
    case 1:
      quizNums = generateQuizNumbers(length,0,5);
      break;
    case 2:
      quizNums = generateQuizNumbers(length,5,10);
      break;
    case 3:
      quizNums = generateQuizNumbers(length,10,15);
      break;
    case 4:
      quizNums = generateQuizNumbers(length,15,20);
      break;
    case 5:
      quizNums = generateQuizNumbers(length,10,20);
      break;
  }
  return quizNums;
}
export function quizQuestionGenerator(operation,difficulty,length){
  const quizNumbers = quizDiffHandler(difficulty,length);
  const quizData = 
  {
    numbers: quizNumbers,
    operation: operation,
    answer: quizNumbers.map(nums => nums.reduce((a,b) => eval(`${a} ${operation} ${b}`)))
  }
  return quizData; 
}