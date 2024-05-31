import BaseCreateElement from '../../BaseCreateElement';
import { checkLetter } from '../game/gameStates';
import './keyboard.scss';

const keyboardBox = new BaseCreateElement('div', ['keyboard']);
const keyboardBoxElem = keyboardBox.elem;

for (let i = 65; i <= 90; i += 1) {
  const keyboardBtn = new BaseCreateElement('button', ['btn-reset', 'keyboard__btn']);
  const keyboardBtnElem = keyboardBtn.elem;
  const btnLetter = String.fromCharCode(i);
  keyboardBtnElem.textContent = btnLetter;
  keyboardBtnElem.addEventListener('click', (e) => checkLetter(e.target, btnLetter));
  keyboardBoxElem.append(keyboardBtnElem);
}

export default keyboardBoxElem;
