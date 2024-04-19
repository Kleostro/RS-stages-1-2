import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import LOGIN_PAGE_STYLES from './loginPage.module.scss';

class LoginPageView {
  private parent: HTMLDivElement;

  private authenticationMessage: HTMLSpanElement;

  private authenticationWrapper: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.authenticationMessage = this.createAuthenticationMessage();
    this.authenticationWrapper = this.createAuthenticationWrapper();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public show(): boolean {
    this.page.classList.remove(LOGIN_PAGE_STYLES.loginPage_hidden);
    return true;
  }

  public hide(): boolean {
    this.page.classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
    return true;
  }

  public getShowAuthenticationMessage(): HTMLSpanElement {
    return this.authenticationMessage;
  }

  public getShowAuthenticationWrapper(): HTMLDivElement {
    return this.authenticationWrapper;
  }

  private createAuthenticationMessage(): HTMLSpanElement {
    this.authenticationMessage = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [LOGIN_PAGE_STYLES.authenticationMessage],
    });

    return this.authenticationMessage;
  }

  private createAuthenticationWrapper(): HTMLDivElement {
    this.authenticationWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOGIN_PAGE_STYLES.authenticationWrapper],
    });

    this.authenticationWrapper.append(this.authenticationMessage);

    return this.authenticationWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOGIN_PAGE_STYLES.loginPage],
    });

    this.page.append(this.authenticationWrapper);
    this.parent.append(this.page);

    return this.page;
  }
}
export default LoginPageView;
