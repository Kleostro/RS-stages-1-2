import data from '../../../data/data.json';
import BaseCreateElement from '../../BaseCreateElement';
import { answerBoxElem } from '../quiz/quiz';

export const getRandomQA = () => data[Math.floor(Math.random() * data.length)];

export const createAnswerLetterField = (currentAnswer) => {
  answerBoxElem.innerHTML = '';

  [...currentAnswer].forEach(() => {
    const letterField = new BaseCreateElement('span', ['quiz__answer-letter']);
    const letterFieldElem = letterField.elem;
    answerBoxElem.append(letterFieldElem);
  });
};

export const hideManParts = () => {
  document.querySelectorAll('.man-part').forEach((item) => {
    const currentItem = item;
    currentItem.style.opacity = 0;
  });
};

export const changeKeyboardBtnsDisabled = (isDisabled) => {
  document.querySelectorAll('.keyboard__btn').forEach((btn) => {
    const currentBtn = btn;
    currentBtn.disabled = isDisabled;
  });
};

export const showGuessedLetter = (index, currentLetter, guessedLettersArr) => {
  const currentLetterElem = document.querySelectorAll('.quiz__answer-letter')[index];
  currentLetterElem.textContent = currentLetter;
  currentLetterElem.style.borderBottom = 'none';
  guessedLettersArr.push(currentLetter);
};
