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

export const removeHighlightCells = () => {
  const cells = document.querySelectorAll('.playground__cell');
  const rows = document.querySelectorAll('.playground__row');

  cells.forEach((cell) => {
    cell.classList.remove('cell-highlight');
  });

  rows.forEach((row) => {
    row.classList.remove('row-highlight');
  });
};

export const highlightCurrentColumnAndRow = (event, playGround) => {
  const rect = playGround.element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rowIndex = Math.floor(x / 20) + 1;
  const cellIndex = Math.floor(y / 20) + 1;

  removeHighlightCells();

  if (rowIndex <= 10) {
    const currentRow = document.querySelector(`.playground__row[data-row="${rowIndex}"]`);
    currentRow.classList.add('row-highlight');
  }
  if (cellIndex <= 10) {
    const currentCells = document.querySelectorAll(`.playground__cell[data-cell="${cellIndex}"]`);
    currentCells.forEach((cell) => cell.classList.add('cell-highlight'));
  }
};
