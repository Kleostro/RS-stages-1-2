import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';

import type PageInterface from '../../types/interfaces.ts';
import LoginPageView from '../view/LoginPageView.ts';
import LOGIN_PAGE_STYLES from '../view/loginPage.module.scss';
import PAGES_IDS from '../../types/enums.ts';
import LoginFormModel from '../../../widgets/LoginForm/model/LoginFormModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';

class LoginPageModel implements PageInterface {
  private loginPageView: LoginPageView;

  private router: RouterModel;

  private eventMediator = MediatorModel.getInstance();

  private loginFormModel = new LoginFormModel();

  constructor(parent: HTMLDivElement, router: RouterModel) {
    this.loginPageView = new LoginPageView(parent);
    this.router = router;
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
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (
        params === PAGES_IDS.LOGIN_PAGE ||
        params === PAGES_IDS.DEFAULT_PAGE
      ) {
        if (StoreModel.getState().currentUser) {
          this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
        } else {
          this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
        }
        this.visible();
      } else {
        this.hidden();
      }
    });
  }

  private initPage(): void {
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
    loginFormHTML.addEventListener(EVENT_NAMES.SUBMIT, () => {
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    });
    this.subscribeToMediator();
  }
}

export default LoginPageModel;
