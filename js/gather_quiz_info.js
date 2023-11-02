'use strict';
import { createQuiz } from './index.js';
export function getQuizInfo(diffBtnsLocation, operation) {
  const difficulties = [
    ['łatwy', 'easy1'],
    ['średni', 'middle2'],
    ['trudny', 'hard3'],
  ];
  difficulties.forEach((diff) =>
    diffBtnsLocation.insertAdjacentHTML(
      'beforeend',
      `<button id="${diff[1]}" class="chose-diff-btn">${diff[0]}</button>`
    )
  );
  const choseBtns = diffBtnsLocation.querySelectorAll('.chose-diff-btn');
  choseBtns.forEach((btn) =>
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const quizDifficulty = Number(this.id.slice(-1));
      const answerNegative = handleNegative(quizDifficulty,operation);
      createQuiz(operation,quizDifficulty,quizDifficulty * 4,answerNegative);
      choseBtns.forEach((btn) => btn.remove());
    })
  );
}
const handleNegative = function(difficulty,operation){
    switch (true)
    {
        case difficulty>=2 && operation==="-":
            return true;
        case difficulty>=3 && (operation==="*" || operation==="/"):
            return true; 
        default:
            return false
    }
}