import CreateElement from '../../CreateElement';
import { gameContainer } from '../game/gameLayout';
import { createUniqueMatrixSizeObj } from '../game/utils';
import nonogramsData from '../../../data/nonograms.json';

export const sizeBtns = [];
export const nonogramBtns = [];
const uniqueMatrixSizeObj = createUniqueMatrixSizeObj();

const settingsBox = new CreateElement({
  tag: 'div',
  classes: ['settings'],
  parent: gameContainer,
});

export const sizes = new CreateElement({
  tag: 'div',
  classes: ['sizes'],
  parent: settingsBox,
});

export const sizesBox = new CreateElement({
  tag: 'div',
  classes: ['sizes__box'],
  parent: sizes,
});

const sizesTitle = new CreateElement({
  tag: 'strong',
  classes: ['sizes__title'],
  parent: sizesBox,
  textContent: 'Size: ',
});

export const sizesSubtitle = new CreateElement({
  tag: 'span',
  classes: ['sizes__subtitle'],
  parent: sizesTitle,
  textContent: '5x5',
});

export const sizesDropList = new CreateElement({
  tag: 'ul',
  classes: ['list-reset', 'sizes__list', 'hidden'],
  parent: sizes,
});

uniqueMatrixSizeObj.forEach((size) => {
  const sizesListItem = new CreateElement({
    tag: 'li',
    classes: ['sizes__list-item'],
    parent: sizesDropList,
  });

  const sizeBtn = new CreateElement({
    tag: 'button',
    classes: ['btn-reset', 'sizes__list-btn'],
    parent: sizesListItem,
    textContent: size,
  });

  if (size === Array.from(uniqueMatrixSizeObj)[0]) {
    sizeBtn.disabled = true;
  }
  sizeBtns.push(sizeBtn);
});

export const nonograms = new CreateElement({
  tag: 'div',
  classes: ['nonograms'],
  parent: settingsBox,
});

export const nonogramsBox = new CreateElement({
  tag: 'div',
  classes: ['nonograms__box'],
  parent: nonograms,
});

export const nonogramsTitle = new CreateElement({
  tag: 'strong',
  classes: ['nonograms__title'],
  parent: nonogramsBox,
  textContent: 'Selected: ',
});

export const nonogramsSubtitle = new CreateElement({
  tag: 'span',
  classes: ['nonograms__subtitle'],
  parent: nonogramsTitle,
});

export const nonogramsDropList = new CreateElement({
  tag: 'ul',
  classes: ['list-reset', 'nonograms__list', 'hidden'],
  parent: nonograms,
});

const filterNonogramsArr = nonogramsData
  .filter((item) => item.size === sizesSubtitle.textContent);

filterNonogramsArr.forEach((_, index) => {
  const nonogramsListItem = new CreateElement({
    tag: 'li',
    classes: ['nonograms__list-item'],
    parent: nonogramsDropList,
  });

  const nonogramBtn = new CreateElement({
    tag: 'button',
    classes: ['btn-reset', 'nonograms__list-btn'],
    parent: nonogramsListItem,
    textContent: filterNonogramsArr[index].title,
  });

  if (filterNonogramsArr[0].title === filterNonogramsArr[index].title) {
    nonogramBtn.disabled = true;
    nonogramsSubtitle.textContent = filterNonogramsArr[index].title;
  }
  nonogramBtns.push(nonogramBtn);
});

export const startGameBtn = new CreateElement({
  tag: 'button',
  classes: ['btn-reset', 'settings__start-btn'],
  parent: settingsBox,
  textContent: 'Play',
});
