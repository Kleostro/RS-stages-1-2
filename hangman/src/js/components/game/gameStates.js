import data from '../../../data/data.json';
import BaseCreateElement from '../../BaseCreateElement';
import keyboardBoxElem from '../keyboard/keyboard';
import { showModal, endGameModal } from '../modal/modalFunctions';
import { answerBoxElem, questionTitleElem, wrongGuessElem } from '../quiz/quiz';

const MAX_ATTEMPTS = 6;
let currentAnswer = '';
let guessedLettersArr = [];
let wrongGuessCount = 0;

const restartGame = () => {
  answerBoxElem.innerHTML = '';
  guessedLettersArr = [];
  wrongGuessCount = 0;

  for (let i = 0; i < currentAnswer.length; i += 1) {
    const letterField = new BaseCreateElement('span', ['quiz__answer-letter']);
    const letterFieldElem = letterField.elem;
    answerBoxElem.append(letterFieldElem);
  }

  document.querySelectorAll('.man-part').forEach((item) => {
    const currentItem = item;
    currentItem.style.opacity = 0;
  });
  keyboardBoxElem.querySelectorAll('.keyboard__btn').forEach((btn) => {
    const currentBtn = btn;
    currentBtn.disabled = false;
  });
};

const endGame = (outcome) => {
  setTimeout(() => {
    endGameModal(outcome, currentAnswer);
  }, 500);
};

export const checkLetter = (currentBtn, btnLetter) => {
  const currentBtnElem = currentBtn;
  currentBtnElem.disabled = true;
  if (currentAnswer.includes(btnLetter)) {
    [...currentAnswer].forEach((currentLetter, index) => {
      if (currentLetter === btnLetter) {
        const currentLetterElem = document.querySelectorAll('.quiz__answer-letter')[index];
        currentLetterElem.textContent = currentLetter;
        currentLetterElem.style.borderBottom = 'none';
        guessedLettersArr.push(currentLetter);
      }
    });
  } else {
    document.querySelectorAll('.man-part')[wrongGuessCount].style.opacity = 1;
    wrongGuessCount += 1;
    wrongGuessElem.innerHTML = `Number of incorrect answers: <span class="quiz__wrong-accent">${wrongGuessCount} / ${MAX_ATTEMPTS}</span>`;
  }

  if (wrongGuessCount === MAX_ATTEMPTS) {
    endGame('defeat');
    keyboardBoxElem.querySelectorAll('.keyboard__btn').forEach((btn) => {
      const currBtn = btn;
      currBtn.disabled = true;
    });
  }

  if (guessedLettersArr.length === currentAnswer.length) endGame('win');
};

const mouseCheckLetter = (e) => {
  const key = e.key.toUpperCase();
  const keyCode = e.keyCode || e.code;

  if (/^[A-Z]/.test(key) && keyCode >= 65 && keyCode <= 90) {
    const keyboardBtns = document.querySelectorAll('.keyboard__btn');
    let currBtn;
    keyboardBtns.forEach((btn) => {
      if (btn.textContent === key) currBtn = btn;
    });
    if (!currBtn.disabled) checkLetter(currBtn, key);
  }
};

const mouseCheckWrapper = (e) => mouseCheckLetter(e);

export const startGame = () => {
  showModal();
  const { question, answer } = data[Math.floor(Math.random() * data.length)];
  questionTitleElem.textContent = question;
  wrongGuessElem.innerHTML = `Number of incorrect answers: <span class="quiz__wrong-accent">0 / ${MAX_ATTEMPTS}</span>`;
  currentAnswer = answer;
  restartGame();
  document.removeEventListener('keydown', mouseCheckWrapper);
  document.addEventListener('keydown', mouseCheckWrapper);
};
