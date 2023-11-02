import * as generator from './quiz_question_generator.js';
import * as gatherInfo from './gather_quiz_info.js';
const pickQuizBtns = document.querySelectorAll('.chose-quiz__btn');
pickQuizBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    gatherInfo.getQuizInfo(document.body,this.getAttribute("operation"));
  });
});
export function createQuiz(operator,difficulty,length,canBeNegative) {
  const quizInfo = generator.quizQuestionGenerator(operator,difficulty,length,canBeNegative);
}