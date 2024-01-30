import CreateElement from '../../../CreateElement';
import './settingsAppView.scss';

const APP_THEME_NAMES = ['light', 'dark'];

class SettingsAppView {
  constructor() {
    this.#createHTML();
    this.theme = APP_THEME_NAMES[0];
    this.themeBtn.addEventListener('click', this.#toggleThemeHandler.bind(this));
  }

  /**
  * get HTML settings
  * @returns {Element} HTML-Element settings
  */
  getHTML() {
    return this.themeBtn;
  }

  /**
  * changes the current application theme
  */
  #toggleThemeHandler() {
    this.theme = this.theme === APP_THEME_NAMES[0] ? APP_THEME_NAMES[1] : APP_THEME_NAMES[0];
    this.themeBtn.textContent = this.theme;
    document.body.classList.toggle(APP_THEME_NAMES[1]);
    document.body.classList.toggle(APP_THEME_NAMES[0]);
  }

  /**
  * create HTML settings
  */
  #createHTML() {
    this.themeBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'header__theme-btn'], textContent: APP_THEME_NAMES[0] });
  }
}

export default SettingsAppView;
