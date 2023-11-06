'use strict';
import * as generator from './quiz_question_generator.js';
export async function startQuiz(
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
    const answer = await getPromise(quizElements.submit, quizElements.answer);
  }
}
function getPromise(btn, textArea) {
  return new Promise((resolve) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      resolve(textArea.value);
    });
  });
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
  questionEl.textContent = `Ile to ${a} ${operation} ${b}`;
};