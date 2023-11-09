'use strict';
export function endQuiz(quizEls, answers = [], quizData) {
  Object.values(quizEls).forEach((el) => el.remove());
  document.body.insertAdjacentHTML(
    'afterbegin',
    generateSolutionHTML(quizData.title,answers,quizData)
  );
}
const generateSolutionHTML = (title, userAnswers, quizData) =>
  `<h2>${title}</h2>
  <div class="corect-answers">${generateUserAnswers(userAnswers,quizData)}</div>
  <div class="resoult"></div>`;
const generateUserAnswers = (userAnswers, quizData) => {
  let answerHTML = '',a,b;
  for (let i = 0; i < quizData.answer.length; i++) {
    const isCorrectClass = userAnswers[i][0] === quizData.answer[i] ? 'true' : 'false';
    [a,b] = quizData.numbers[i];
    answerHTML += `<div class="${isCorrectClass}">${a} ${quizData.operation} ${b} = ${quizData.answer[i]}</div>`;
  }
  return answerHTML;
};
