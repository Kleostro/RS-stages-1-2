import CreateElement from '../../../../CreateElement';
import './cellView.scss';

/** Create a cell
* @class
* @param {number} cellValue - Cell value: 0 - unpainted, 1 - painted
* @param {string} state - Cell state (default is 'empty')
*/
class CellView {
  constructor(cellValue, audio, state = 'empty') {
    this.audio = audio;
    this.cellValue = cellValue;
    this.state = state;

    this.#createHTML();
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
   * sets the field class to a cell
   * @param {event} event - event
   */
  #setField(event) {
    this.audio.playField();
    this.state = 'field';
    event.target.classList.add('field');
  }

  /**
   * sets the field class to a cell
   */
  #getField() {
    if (this.state === 'field') {
      this.cell.classList.add('field');
    }
  }

  /**
   * sets the crossed class to a cell
   * @param {event} event - event
   */
  #setCrossed(event) {
    this.audio.playCrossed();
    this.state = 'crossed';
    event.target.classList.remove('field');
    event.target.classList.add('crossed');
  }

  /**
   * sets the crossed class to a cell
   */
  #getCrossed() {
    if (this.state === 'crossed') {
      this.cell.classList.remove('field');
      this.cell.classList.add('crossed');
    }
  }

  /**
   * removes the field and crossed classes on a cell
   * @param {event} event - event
   */
  #setEmpty(event) {
    this.audio.playEmpty();
    this.state = 'empty';
    event.target.classList.remove('field', 'crossed');
  }

  /**
  * create HTML cell
  */
  #createHTML() {
    this.cell = new CreateElement({ classes: ['cell'] });
  }
}

export default CellView;
