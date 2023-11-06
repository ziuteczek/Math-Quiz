'use strict';
import * as gatherInfo from './gather_quiz_info.js';
const pickQuizBtns = document.querySelectorAll('.chose-quiz__btn');
pickQuizBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    gatherInfo.getQuizInfo(document.body,this.getAttribute("operation"));
  });
});