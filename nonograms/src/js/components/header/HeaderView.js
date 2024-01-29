import CreateElement from '../../CreateElement';
import './headerView.scss';
import SettingsAppView from './settingsApp/SettingsAppView';

/** Create a header
* @class
*/
class HeaderView {
  constructor() {
    this.settingsApp = new SettingsAppView();
    this.#createHTML();
  }

  /**
  * get HTML header
  * @returns {Element} HTML-Element header
  */
  getHTML() {
    return this.header;
  }



  #createHTML() {
    this.header = new CreateElement({ tag: 'header', classes: ['header'] });
    this.headerContainer = new CreateElement({ tag: 'div', classes: ['header__container', 'container'] });
    this.title = new CreateElement({ tag: 'h1', classes: ['header__title'], textContent: 'Nonograms' });

    this.headerContainer.append(this.title, this.settingsApp.getHTML());
    this.header.append(this.headerContainer);
  }
}

export default HeaderView;
