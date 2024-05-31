import { showModal, endGameModal, playBtnElem } from '../modal/modal';
import { questionTitleElem, wrongGuessElem } from '../quiz/quiz';
import {
  createAnswerLetterField,
  hideManParts,
  changeKeyboardBtnsDisabled,
  showGuessedLetter,
  getRandomQA,
} from './utilits';

const MAX_ATTEMPTS = 6;
const ANIMATION_END_TIME = 500;
let currentAnswer = '';
let randomQA = {};
let guessedLettersArr = [];
let wrongGuessCount = 0;

const endGame = (outcome) => {
  setTimeout(() => {
    endGameModal(outcome, currentAnswer);
  }, ANIMATION_END_TIME);
};

const addTextWrongGuess = () => {
  wrongGuessElem.innerHTML = `Number of incorrect answers: <span class="quiz__wrong-accent">${wrongGuessCount} / ${MAX_ATTEMPTS}</span>`;
};

const showWrongChoice = () => {
  document.querySelectorAll('.man-part')[wrongGuessCount].style.opacity = 1;
  wrongGuessCount += 1;
  addTextWrongGuess();
};

export const checkLetter = (currentBtn, btnLetter) => {
  const currentBtnElem = currentBtn;
  currentBtnElem.disabled = true;

  if (currentAnswer.includes(btnLetter)) {
    [...currentAnswer].forEach((currentLetter, index) => {
      if (currentLetter === btnLetter) showGuessedLetter(index, currentLetter, guessedLettersArr);
    });
  } else showWrongChoice();

  if (wrongGuessCount === MAX_ATTEMPTS) {
    endGame('defeat');
    changeKeyboardBtnsDisabled(true);
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

const updateCurrentQA = () => {
  do {
    randomQA = getRandomQA();
  } while (questionTitleElem.textContent === randomQA.question);

  currentAnswer = randomQA.answer;
  questionTitleElem.textContent = randomQA.question;
};

export const startGame = () => {
  guessedLettersArr = [];
  wrongGuessCount = 0;
  showModal();
  updateCurrentQA();
  createAnswerLetterField(currentAnswer);
  addTextWrongGuess();
  hideManParts();
  changeKeyboardBtnsDisabled(false);
  document.removeEventListener('keydown', mouseCheckWrapper);
  document.addEventListener('keydown', mouseCheckWrapper);
};

playBtnElem.addEventListener('click', startGame);
