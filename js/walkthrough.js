'use strict';
import * as generator from './quiz_question_generator.js';
export function startQuiz(
  operation,
  quizDifficulty,
  length,
  allowNegativeAnswer
) {
  const quizData = generator.quizQuestionGenerator(
    operation,
    quizDifficulty,
    length,
    allowNegativeAnswer
  );
  const quizLength = quizData.answer.length;
  const quizElements = createElements();
  for (let i = 0; i < quizLength; i++) {
    askQuestion(
      quizElements.question,
      quizData.operation,
      ...quizData.numbers[i]
    );
    if (
      checkAnswer(quizData.answer[i], quizElements.submit, quizElements.answer)
    ) {
      console.log('dobrze');
    }
  }
}
const createElements = function (questionContainer = document.body) {
  const elementsToCreate = ['h3', 'p', 'input', 'button'];
  const quizElements = elementsToCreate.map((quizElement) =>
    document.createElement(quizElement)
  );
  quizElements.forEach((element) => questionContainer.append(element));
  return {
    title: quizElements[0],
    question: quizElements[1],
    answer: quizElements[2],
    submit: quizElements[3],
  };
};
const askQuestion = function (questionEl, operation, a, b) {
  if (operation === '/') {
    operation = ':';
  }
  questionEl.textContent = `Ile to ${a} ${operation} ${b}`;
};
async function checkAnswer(answer, btn, input) {
  for (let tries = 3; tries > 0; tries--) {
    const userAnswer = await getAnswer(btn, input);
    if (userAnswer === answer) {
      console.log('dobrze');
      return true;
    }
  }
  return false;
}
async function getAnswer(btn, input) {
  try {
    const userInput = await waitForUserInput(btn, input);
    return userInput;
  } catch (error) {
    console.log('Błąd:', error);
  }
}
function waitForUserInput(btn, input) {
  return new Promise((r) => {
    btn.addEventListener('click', () => {
      const userInput = input.value;
      input.value = '';
      r(Number(userInput));
    });
  });
}
