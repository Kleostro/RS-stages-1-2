import CreateElement from '../../../CreateElement';
import './cellView.scss';

/** Create a cell
* @class
* @param {number} cellValue - Cell value: 0 - unpainted, 1 - painted
* @param {string} state - Cell state (default is 'empty')
* @param {boolean} isClickable - flag that indicates the clickability of the cell (default is 'true')
*/
class CellView {
  constructor(cellValue, state = 'empty', isClickable = true) {
    this.state = state;
    this.isClickable = isClickable;
    this.cellValue = cellValue;

    this.cell = new CreateElement({ classes: ['cell'] });

    this.#getField();
    this.#getCrossed();

    this.cell.addEventListener('click', (event) => {
      switch (this.state) {
        case 'empty':
          this.#setField(event);
          break;
        case 'field':
          this.#setEmpty(event);
          break;
        case 'crossed':
          this.#setEmpty(event);
          break;
        default: break;
      }
    });

    this.cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      if (this.cell.classList.contains('crossed')) {
        this.#setEmpty(event);
      } else {
        this.#setCrossed(event);
      }
    });
  }

  /**
   * get HTML cell
   * @returns {Element} HTML-Element cell
   */
  getHTML() {
    return this.cell;
  }

  /**
   * get cell value
   * @returns {number} cell value
   */
  getCellValue() {
    return this.cellValue;
  }

  /**
   * set isClickable property
   * @param {boolean} isClick - flag that indicates the clickability of the cell
   */
  setClickable(isClick) {
    this.isClickable = isClick;
  }

  #setField(event) {
    if (this.isClickable) {
      this.state = 'field';
      event.target.classList.add('field');
    }
  }

  #getField() {
    if (this.isClickable && this.state === 'field') {
      this.cell.classList.add('field');
    }
  }

  #setCrossed(event) {
    if (this.isClickable) {
      this.state = 'crossed';
      event.target.classList.remove('field');
      event.target.classList.add('crossed');
    }
  }

  #getCrossed() {
    if (this.isClickable && this.state === 'crossed') {
      this.cell.classList.remove('field');
      this.cell.classList.add('crossed');
    }
  }

  #setEmpty(event) {
    if (this.isClickable) {
      this.state = 'empty';
      event.target.classList.remove('field', 'crossed');
    }
  }
}

export default CellView;
