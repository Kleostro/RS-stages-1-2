import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import {
  ABOUT_BUTTON_TEXT,
  APP_NAME,
  LOGOUT_BUTTON_TEXT,
} from '../types/enums.ts';
import HEADER_STYLES from './header.module.scss';

class HeaderView {
  private nameApp: HTMLHeadingElement;

  private userLogin: HTMLSpanElement;

  private aboutButton: ButtonModel;

  private logoutButton: ButtonModel;

  private header: HTMLElement;

  constructor() {
    this.nameApp = this.createNameApp();
    this.userLogin = this.createUserLogin();
    this.aboutButton = this.createAboutButton();
    this.logoutButton = this.createLogoutButton();
    this.header = this.createHTML();
  }

  public getHTML(): HTMLElement {
    return this.header;
  }

  public getUserLogin(): HTMLSpanElement {
    return this.userLogin;
  }

  public getLogoutButton(): ButtonModel {
    return this.logoutButton;
  }

  public getAboutButton(): ButtonModel {
    return this.aboutButton;
  }

  private createNameApp(): HTMLHeadingElement {
    this.nameApp = createBaseElement({
      tag: TAG_NAMES.H1,
      cssClasses: [HEADER_STYLES.nameApp],
      innerContent: APP_NAME,
    });

    return this.nameApp;
  }

  private createUserLogin(): HTMLSpanElement {
    this.userLogin = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [HEADER_STYLES.userLogin],
    });

    return this.userLogin;
  }

  private createAboutButton(): ButtonModel {
    this.aboutButton = new ButtonModel({
      classes: [HEADER_STYLES.aboutButton],
      text: ABOUT_BUTTON_TEXT,
    });

    return this.aboutButton;
  }

  private createLogoutButton(): ButtonModel {
    this.logoutButton = new ButtonModel({
      classes: [HEADER_STYLES.logoutButton],
      text: LOGOUT_BUTTON_TEXT,
    });

    this.logoutButton.setDisabled();

    return this.logoutButton;
  }

  private createHTML(): HTMLElement {
    this.header = createBaseElement({
      tag: TAG_NAMES.HEADER,
      cssClasses: [HEADER_STYLES.header],
    });

    this.header.append(
      this.nameApp,
      this.userLogin,
      this.aboutButton.getHTML(),
      this.logoutButton.getHTML(),
    );

    return this.header;
  }
}

export default HeaderView;
