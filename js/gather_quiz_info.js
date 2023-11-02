'use strict';
export function getQuizInfo(diffBtnsLocation){
    const difficulties = [["łatwy","easy"],["średni","middle"],["trudny","hard"]];
    difficulties.forEach((diff)=>diffBtnsLocation.insertAdjacentHTML("beforeend",`<button id="${diff[1]}" class="chose-diff-btn">${diff[0]}</button>`));
    const choseBtns = diffBtnsLocation.querySelectorAll(".chose-diff-btn");
};