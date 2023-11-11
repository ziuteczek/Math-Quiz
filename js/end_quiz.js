'use strict';
export function endQuiz(quizEls, answers = [], quizData) {
  Object.values(quizEls).forEach((el) => el.remove());
  document.body.insertAdjacentHTML(
    'afterbegin',
    generateSolutionHTML(quizData.title, answers, quizData)
  );
}
const generateSolutionHTML = (title, userAnswers, quizData) => {
  const correctAnswers = calcCorrectAnswers(userAnswers);
  const correctAnswersPercent = Math.round(
    (correctAnswers / userAnswers.length) * 100
  );
  return `<h2>${title}</h2>
  <div class='resolt-container'>
    <div class="solution">${generateUserAnswers(userAnswers, quizData)}</div>
    <div class="resoult">
      <h3>Wynik</h3>
      <svg viewBox="0 0 36 36" class="circular-chart">
      <path class="circle"
        stroke-dasharray="${correctAnswersPercent}, 100"
        d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="7" y="22" class="percentage" font-weight="bold">${correctAnswersPercent}%</text>
        </svg>
        </svg>
      </div>
  </div>`;
};
const calcCorrectAnswers = (answers) =>
  answers.reduce(
    (corrAnsws, answ) => (answ[0] === answ[1] ? ++corrAnsws : corrAnsws),
    0
  );

const generateUserAnswers = (userAnswers, quizData) => {
  let answerHTML = '',
    a,
    b;
  for (let i = 0; i < quizData.answer.length; i++) {
    const isCorrectClass =
      userAnswers[i][0] === quizData.answer[i] ? 'true' : 'false';
    [a, b] = quizData.numbers[i];
    answerHTML += `<div class="${isCorrectClass}">${a} ${quizData.operation} ${b} = ${quizData.answer[i]}</div>`;
  }
  return answerHTML;
};
