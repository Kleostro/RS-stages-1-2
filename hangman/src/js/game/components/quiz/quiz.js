import BaseCreateElement from '../../../BaseCreateElement';

const quizBox = new BaseCreateElement('div', ['quiz']);
const quizBoxElem = quizBox.elem;

const questionTitle = new BaseCreateElement('h2', ['quiz__question']);
const questionTitleElem = questionTitle.elem;

const wrongGuess = new BaseCreateElement('span', ['quiz__wrong']);
const wrongGuessElem = wrongGuess.elem;

const answerBox = new BaseCreateElement('div', ['quiz__answer']);
const answerBoxElem = answerBox.elem;

quizBoxElem.append(questionTitleElem, wrongGuessElem, answerBoxElem);

export default quizBoxElem;
