export const PLAYGROUND_CLASSES = {
  5: 'playground__small',
  10: 'playground__medium',
  15: 'playground__large',
};

export const CELL_CLASSES = {
  5: 'playground__cell-small',
  10: 'playground__cell-medium',
  15: 'playground__cell-large',
};

export const changePaintedClass = (e) => {
  if (e.target.classList.contains('painted')) e.target.classList.remove('painted');
  else if (e.target.classList.contains('crossed')) e.target.classList.remove('crossed');
  else e.target.classList.add('painted');
};

export const changeCrossedClass = (e) => {
  if (e.target.classList.contains('crossed')) e.target.classList.remove('crossed');
  else {
    e.target.classList.add('crossed');
    e.target.classList.remove('painted');
  }
};
