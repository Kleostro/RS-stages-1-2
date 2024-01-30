import CreateElement from '../../../CreateElement';
import './settingsAppView.scss';

const APP_THEME_NAMES = ['light', 'dark'];

class SettingsAppView {
  constructor(winners) {
    this.winners = winners;
    this.#createHTML();
    this.theme = APP_THEME_NAMES[0];
    this.winnersBtn.addEventListener('click', this.#winnersClickHandler.bind(this));
    this.themeBtn.addEventListener('click', this.#toggleThemeHandler.bind(this));
  }

  /**
  * get HTML settings
  * @returns {Element} HTML-Element settings
  */
  getHTML() {
    return this.settingsAppBox;
  }

  /**
  * winners click handler
  */
  #winnersClickHandler() {
    this.winners.show();
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
    this.settingsAppBox = new CreateElement({ classes: ['header__settings'] });
    this.winnersBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'header__settings-winners-btn'], textContent: 'Winners' });
    this.themeBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'header__settings-theme-btn'], textContent: APP_THEME_NAMES[0] });

    this.settingsAppBox.append(this.winnersBtn, this.themeBtn);
  }
}

export default SettingsAppView;
