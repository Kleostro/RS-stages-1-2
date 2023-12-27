import BaseCreateElement from '../../../../BaseCreateElement';

const resultBtn = new BaseCreateElement('button', ['btn-reset', 'result']);
const resultBtnElem = resultBtn.elem;
resultBtnElem.textContent = 'Results';

export default resultBtnElem;
