import BaseCreateElement from '../../BaseCreateElement';
import './quiz.scss';

const quizBox = new BaseCreateElement('div', ['quiz']);
const quizBoxElem = quizBox.elem;

const questionTitle = new BaseCreateElement('h2', ['quiz__question']);
export const questionTitleElem = questionTitle.elem;

const wrongGuess = new BaseCreateElement('span', ['quiz__wrong']);
export const wrongGuessElem = wrongGuess.elem;

const answerBox = new BaseCreateElement('div', ['quiz__answer']);
export const answerBoxElem = answerBox.elem;

quizBoxElem.append(questionTitleElem, wrongGuessElem, answerBoxElem);

export default quizBoxElem;
