import CreateElement from '../../CreateElement';
import './headerView.scss';
import SettingsAppView from './settingsApp/SettingsAppView';

/** Create a header
* @class
* @param {object} winners - winners class instance
*/
class HeaderView {
  constructor(winners) {
    this.settingsApp = new SettingsAppView();
    this.winners = winners;
    this.#createHTML();

    this.winnersBtn.addEventListener('click', this.#winnersClickHandler.bind(this));
  }

  /**
  * get HTML header
  * @returns {Element} HTML-Element header
  */
  getHTML() {
    return this.header;
  }

  #winnersClickHandler() {
    this.winners.show();
  }

  #createHTML() {
    this.header = new CreateElement({ tag: 'header', classes: ['header'] });
    this.headerContainer = new CreateElement({ tag: 'div', classes: ['header__container', 'container'] });
    this.title = new CreateElement({ tag: 'h1', classes: ['header__title'], textContent: 'Nonograms' });
    this.winnersBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'header__winners-btn'], textContent: 'Winners' });

    this.headerContainer.append(this.title, this.winnersBtn, this.settingsApp.getHTML());
    this.header.append(this.headerContainer);
  }
}

export default HeaderView;
