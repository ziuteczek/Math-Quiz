'use strict';
import * as generator from './quiz_question_generator.js';
import * as end from './end_quiz.js';
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
  const answerCont = document.body;
  const inputContainer = document.querySelector('.input-question-container');
  const quizElements = createElements(answerCont);
  quizElements.questionNum.classList.add('questionNum');
  quizElements.title.textContent = quizData.title;
  quizElements.submit.textContent = 'wyślij';
  elementsToContainer(
    inputContainer,
    quizElements.question,
    quizElements.answer
  );
  const usersAnswers = [];
  for (let i = 0; i < quizLength; i++) {
    quizElements.questionNum.textContent = `${i + 1}/${quizLength}`;
    askQuestion(
      quizElements.question,
      quizData.operation,
      ...quizData.numbers[i]
    );
    const answer = await getPromise(quizElements.submit, quizElements.answer);
    quizElements.answer.value = '';
    usersAnswers.push([answer, quizData.answer[i]]);
  }
  end.endQuiz(quizElements, usersAnswers, quizData);
}
function getPromise(btn, textArea) {
  return new Promise((resolve) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      resolve(Number(textArea.value));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        resolve(Number(textArea.value));
      }
    });
  });
}
const createElements = function (questionContainer = document.body) {
  const elementsToCreate = ['h3', 'p', 'input', 'button', 'p'];
  const quizElements = elementsToCreate.map((quizElement) =>
    document.createElement(quizElement)
  );
  quizElements.forEach((element) => {
    questionContainer.append(element);
    element.classList.add('question');
  });
  return {
    title: quizElements[0],
    question: quizElements[1],
    answer: quizElements[2],
    submit: quizElements[3],
    questionNum: quizElements[4],
  };
};
const askQuestion = function (questionEl, operation, a, b) {
  questionEl.textContent = `${a} ${operation} ${b} = `;
};
function elementsToContainer(container, ...elements) {
  elements.forEach((element) => {
    element.remove();
    container.appendChild(element);
  });
}
