import CreateElement from '../../../CreateElement';
import './settingsAppView.scss';
import Mediator, { AppEvent } from '../../core/Mediator';

const SOUND_ON_OFF = ['on', 'off'];
const [soundOn, soundOff] = SOUND_ON_OFF;

const APP_THEME_NAMES = ['dark', 'light'];
const [lightTheme, darkTheme] = APP_THEME_NAMES;

class SettingsAppView {
  constructor(winners) {
    this.winners = winners;
    this.soundOnOff = soundOn;
    this.soundBgOnOff = soundOn;
    this.theme = lightTheme;

    this.singletonMediator = Mediator.getInstance();

    this.#createHTML();

    const LS = JSON.parse(localStorage.getItem('kleostro'));

    if (!LS?.theme) {
      LS.theme = darkTheme;
      localStorage.setItem('kleostro', JSON.stringify(LS));
    }

    if (!LS.sound) {
      LS.sound = soundOn;
      localStorage.setItem('kleostro', JSON.stringify(LS));
    }

    this.#toggleThemeAppFromLS();
    this.#toggleSettingsSoundForLS();
  }

  /**
   * get HTML settings
   * @returns {Element} HTML-Element settings
   */
  getHTML() {
    return this.settingsAppBox;
  }

  #toggleSoundBgClickHandler() {
    this.soundBgOnOff = this.soundBgOnOff === soundOff ? soundOn : soundOff;
    this.singletonMediator.notify(AppEvent.toggleSoundBg, this.soundBgOnOff);
    this.soundBgSettingsBtn.textContent =
      this.soundBgOnOff === soundOff ? soundOff : soundOn;
  }

  #toggleSettingsSoundForLS() {
    const LS = JSON.parse(localStorage.getItem('kleostro'));
    this.soundOnOff = LS.sound;
    this.soundsSettingsBtn.textContent =
      this.soundOnOff === soundOn ? soundOff : soundOn;
  }

  #toggleSettingsSoundClickHandler() {
    this.soundOnOff = this.soundOnOff === soundOn ? soundOff : soundOn;
    this.singletonMediator.notify(
      AppEvent.toggleSettingsSound,
      this.soundOnOff,
    );
    this.soundsSettingsBtn.textContent =
      this.soundOnOff === soundOff ? soundOn : soundOff;

    const LS = JSON.parse(localStorage.getItem('kleostro'));
    LS.sound = this.soundOnOff;
    localStorage.setItem('kleostro', JSON.stringify(LS));
  }

  /**
   * winners click handler
   */
  #winnersClickHandler() {
    this.winners.show();
  }

  /**
   * changes the current application theme click handler
   */
  #toggleThemeHandler() {
    this.theme = this.theme === lightTheme ? darkTheme : lightTheme;
    this.themeBtn.textContent = this.theme;
    document.body.classList.toggle(darkTheme);
    document.body.classList.toggle(lightTheme);

    const LS = JSON.parse(localStorage.getItem('kleostro'));
    LS.theme = this.theme;
    localStorage.setItem('kleostro', JSON.stringify(LS));
  }

  /**
   * changes the current application theme from LS
   */
  #toggleThemeAppFromLS() {
    const LS = JSON.parse(localStorage.getItem('kleostro'));
    this.theme = LS.theme;
    this.themeBtn.textContent = this.theme;
    document.body.classList.toggle(
      this.theme === lightTheme ? darkTheme : lightTheme,
    );
  }

  /**
   * create HTML settings
   */
  #createHTML() {
    this.settingsAppBox = new CreateElement({ classes: ['header__settings'] });
    this.soundBgSettingsBox = new CreateElement({
      classes: ['header__settings-sounds-bg-box'],
    });
    this.soundBgSettingsText = new CreateElement({
      tag: 'span',
      classes: ['header__settings-sounds-bg-text'],
      textContent: 'Background sound:',
    });
    this.soundBgSettingsBtn = new CreateElement({
      tag: 'button',
      classes: ['btn-reset', 'header__settings-sounds-bg-settings-btn'],
      textContent: soundOn,
    });

    this.soundSettingsBox = new CreateElement({
      classes: ['header__settings-sounds-box'],
    });
    this.soundSettingsText = new CreateElement({
      tag: 'span',
      classes: ['header__settings-sounds-text'],
      textContent: 'Settings sound:',
    });
    this.soundsSettingsBtn = new CreateElement({
      tag: 'button',
      classes: ['btn-reset', 'header__settings-sounds-settings-btn'],
      textContent: soundOff,
    });

    this.winnersBtn = new CreateElement({
      tag: 'button',
      classes: ['btn-reset', 'header__settings-winners-btn'],
      textContent: 'Winners',
    });
    this.themeBtn = new CreateElement({
      tag: 'button',
      classes: ['btn-reset', 'header__settings-theme-btn'],
      textContent: lightTheme,
    });

    this.soundBgSettingsBtn.addEventListener('click', () => {
      this.singletonMediator.notify(AppEvent.settingsClick);
      this.singletonMediator.notify(AppEvent.soundBg);
      this.singletonMediator.notify(AppEvent.toggleSoundBg);
      this.#toggleSoundBgClickHandler.apply(this);
    });

    this.soundsSettingsBtn.addEventListener('click', () => {
      this.#toggleSettingsSoundClickHandler.apply(this);
      this.singletonMediator.notify(AppEvent.settingsClick);
    });

    this.winnersBtn.addEventListener('click', () => {
      this.#winnersClickHandler();
      this.singletonMediator.notify(AppEvent.settingsClick);
    });

    this.themeBtn.addEventListener('click', () => {
      this.#toggleThemeHandler.apply(this);
      this.singletonMediator.notify(AppEvent.settingsClick);
    });

    this.soundBgSettingsBox.append(
      this.soundBgSettingsText,
      this.soundBgSettingsBtn,
    );
    this.soundSettingsBox.append(
      this.soundSettingsText,
      this.soundsSettingsBtn,
    );
    this.settingsAppBox.append(
      this.soundBgSettingsBox,
      this.soundSettingsBox,
      this.winnersBtn,
      this.themeBtn,
    );
  }
}

export default SettingsAppView;
