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
  const answerCont = document.querySelector(".answer");
  const quizElements = createElements(answerCont);
  quizElements.title.textContent = quizData.title;
  quizElements.submit.textContent = "wyślij";
  const usersAnswers = [];
  for (let i = 0; i < quizLength; i++) {
    askQuestion(
      quizElements.question,
      quizData.operation,
      ...quizData.numbers[i]
    );
    const answer = await getPromise(quizElements.submit, quizElements.answer);
    usersAnswers.push([answer, quizData.answer[i]]);
  }
  writeScore(quizElements, usersAnswers);
}
function writeScore(quizElObject, answers = []) {
  Object.values(quizElObject).forEach((element) => element.remove());
  const corectAnswers = answers.reduce((corectAnswers, answer) => {
    if (answer[0] === answer[1]) {
      return corectAnswers++;
    }
    return corectAnswers;
  }, 0);
  const scoreString = `Odpowiedziales/as poprawnie na ${corectAnswers} z ${answers.length} pytań`;
}
function getPromise(btn, textArea) {
  return new Promise((resolve) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      resolve(Number(textArea.value));
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
