import CreateElement from '../../CreateElement';
import './headerView.scss';
import SettingsAppView from './settingsApp/SettingsAppView';

/** Create a header
 * @class
 * @param {object} winners - winners class instance
 */
class HeaderView {
  constructor(winners) {
    this.settingsApp = new SettingsAppView(winners);
    this.winners = winners;
    this.#createHTML();
  }

  /**
   * get HTML header
   * @returns {Element} HTML-Element header
   */
  getHTML() {
    return this.header;
  }

  /**
   * create HTML header
   */
  #createHTML() {
    this.header = new CreateElement({ tag: 'header', classes: ['header'] });
    this.title = new CreateElement({
      tag: 'h1',
      classes: ['header__title'],
      textContent: 'Nonograms',
    });
    this.headerContainer = new CreateElement({
      tag: 'div',
      classes: ['header__container', 'container'],
    });
    this.burger = new CreateElement({
      tag: 'button',
      classes: ['btn-reset', 'burger'],
    });
    this.burgerLineOne = new CreateElement({
      tag: 'span',
      classes: ['burger__line'],
    });
    this.burgerLineTwo = new CreateElement({
      tag: 'span',
      classes: ['burger__line'],
    });
    this.burgerLineThree = new CreateElement({
      tag: 'span',
      classes: ['burger__line'],
    });

    this.burger.addEventListener('click', () => {
      this.burger.classList.toggle('open');
      this.burger.previousSibling.classList.toggle('open');
      document.body.classList.toggle('stop-scroll');
    });

    this.burger.append(
      this.burgerLineOne,
      this.burgerLineTwo,
      this.burgerLineThree,
    );

    this.headerContainer.append(
      this.title,
      this.settingsApp.getHTML(),
      this.burger,
    );
    this.header.append(this.headerContainer);
  }
}
export default HeaderView;
