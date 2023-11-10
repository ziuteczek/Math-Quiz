'use strict';
import * as gatherInfo from './gather_quiz_info.js';
const pickQuizBtns = document.querySelectorAll('.chose-quiz__btn');
const btnsContainer = document.querySelector(".chose-quiz")
document.querySelector(".nav-title").addEventListener("click",()=> location.reload())
pickQuizBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    pickQuizBtns.forEach(btn => btn.remove())
    gatherInfo.getQuizInfo(btnsContainer,this.getAttribute("operation"));
  });
});