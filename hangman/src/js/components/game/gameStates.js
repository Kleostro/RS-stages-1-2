import data from '../../../data/data.json';
import BaseCreateElement from '../../BaseCreateElement';

let currentAnswer = '';
const guessedLettersArr = [];
let wrongGuessCount = 0;

export const startGame = () => {
  const { question, answer } = data[Math.floor(Math.random() * data.length)];
  const quizAnswerBox = document.querySelector('.quiz__answer');
  currentAnswer = answer;
  for (let i = 0; i < currentAnswer.length; i += 1) {
    const letterField = new BaseCreateElement('span', ['quiz__answer-letter']);
    const letterFieldElem = letterField.elem;
    quizAnswerBox.append(letterFieldElem);
  }
  document.querySelector('.quiz__question').textContent = question;
};

export const checkLetter = (currentBtn, btnLetter) => {
  const currentBtnElem = currentBtn;
  currentBtnElem.disabled = true;
  if (currentAnswer.includes(btnLetter)) {
    [...currentAnswer].forEach((currentLetter, index) => {
      if (currentLetter === btnLetter) {
        guessedLettersArr.push(currentLetter);
        document.querySelectorAll('.quiz__answer-letter')[index].textContent = currentLetter;
      }
    });
  } else {
    document.querySelectorAll('.man-part')[wrongGuessCount].classList.remove('hidden');
    wrongGuessCount += 1;
  }
};
