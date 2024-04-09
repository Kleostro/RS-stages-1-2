import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';

import type PageInterface from '../../types/interfaces.ts';
import LoginPageView from '../view/LoginPageView.ts';
import LOGIN_PAGE_STYLES from '../view/loginPage.module.scss';
import PAGES_IDS from '../../types/enums.ts';
import LoginFormModel from '../../../widgets/LoginForm/model/LoginFormModel.ts';

class LoginPageModel implements PageInterface {
  private loginPageView: LoginPageView;

  private mediator = MediatorModel.getInstance();

  private loginFormModel = new LoginFormModel();

  constructor(parent: HTMLDivElement) {
    this.loginPageView = new LoginPageView(parent);
    this.initPage();
  }

  public getHTML(): HTMLDivElement {
    return this.loginPageView.getHTML();
  }

  private visible(): void {
    this.loginPageView
      .getHTML()
      .classList.remove(LOGIN_PAGE_STYLES.loginPage_hidden);
  }

  private hidden(): void {
    this.loginPageView
      .getHTML()
      .classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
  }

  private subscribeToMediator(): void {
    this.mediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (
        params === PAGES_IDS.LOGIN_PAGE ||
        params === PAGES_IDS.DEFAULT_PAGE
      ) {
        this.visible();
      } else {
        this.hidden();
      }
    });
  }

  private initPage(): void {
    this.getHTML().append(this.loginFormModel.getHTML());
    this.subscribeToMediator();
  }
}

export default LoginPageModel;
