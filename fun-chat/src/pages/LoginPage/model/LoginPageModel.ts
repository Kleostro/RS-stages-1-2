import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';

import type PageInterface from '../../types/interfaces.ts';
import LoginPageView from '../view/LoginPageView.ts';
import LOGIN_PAGE_STYLES from '../view/loginPage.module.scss';
import PAGES_IDS from '../../types/enums.ts';
import LoginFormModel from '../../../widgets/LoginForm/model/LoginFormModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import type { Message } from '../../../utils/isFromServerMessage.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';

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

  private show(): void {
    this.loginPageView
      .getHTML()
      .classList.remove(LOGIN_PAGE_STYLES.loginPage_hidden);
  }

  private hide(): void {
    this.loginPageView
      .getHTML()
      .classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
  }

  private switchPage(params: string): void {
    if (params === PAGES_IDS.LOGIN_PAGE || params === PAGES_IDS.DEFAULT_PAGE) {
      if (StoreModel.getState().currentUser) {
        this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
        return;
      }
      this.show();
    } else {
      this.hide();
    }
  }

  private handleMessageFromServer(checkedMessage: Message): void {
    if (checkedMessage?.type !== API_TYPES.ERROR) {
      StoreModel.dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: this.loginFormModel.getUserData(),
      });
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    } else if (
      checkedMessage?.type === API_TYPES.ERROR &&
      checkedMessage?.id === this.loginFormModel.getMessageID()
    ) {
      // console.error(checkedMessage.payload.error);
    }
  }

  private subscribeToMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.switchPage(String(params));
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.SET_NEW_USER, (message) => {
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleMessageFromServer(checkedMessage);
      }
    });
  }

  private initPage(): void {
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
    this.subscribeToMediator();
  }
}

export default LoginPageModel;
