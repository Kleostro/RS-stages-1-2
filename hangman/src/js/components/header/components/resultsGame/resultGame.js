import BaseCreateElement from '../../../../Classes/BaseCreateElement';
import './resultGame.scss';

const resultBtn = new BaseCreateElement('button', ['result']);
const resultBtnElem = resultBtn.elem;
resultBtnElem.textContent = 'Results';

export default resultBtnElem;
