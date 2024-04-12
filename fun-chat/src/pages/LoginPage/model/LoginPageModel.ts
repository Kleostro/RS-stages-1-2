import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';

import type PageInterface from '../../types/interfaces.ts';
import LoginPageView from '../view/LoginPageView.ts';
import LOGIN_PAGE_STYLES from '../view/loginPage.module.scss';
import PAGES_IDS, {
  AUTHENTICATION_ANIMATE_DETAILS,
} from '../../types/enums.ts';
import LoginFormModel from '../../../widgets/LoginForm/model/LoginFormModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import type { Message } from '../../../utils/isFromServerMessage.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import type SessionStorageModel from '../../../shared/SessionStorage/model/SessionStorage.ts';
import STORE_KEYS from '../../../shared/SessionStorage/types/enums.ts';
import isUser from '../../../utils/isUser.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import type LoginUser from '../../../shared/Server/ServerApi/types/interfaces.ts';

class LoginPageModel implements PageInterface {
  private loginPageView: LoginPageView;

  private router: RouterModel;

  private storage: SessionStorageModel;

  private eventMediator = MediatorModel.getInstance();

  private loginFormModel = new LoginFormModel();

  constructor(
    parent: HTMLDivElement,
    router: RouterModel,
    storage: SessionStorageModel,
  ) {
    this.loginPageView = new LoginPageView(parent);
    this.router = router;
    this.storage = storage;
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

  private checkAuthorizedUser(): User | null {
    const currentUser = this.storage.get(STORE_KEYS.CURRENT_USER);

    if (currentUser && isUser(currentUser)) {
      const userData: LoginUser = {
        id: null,
        type: API_TYPES.USER_LOGIN,
        payload: {
          user: currentUser,
        },
      };

      StoreModel.dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: currentUser,
      });
      this.eventMediator.notify(MEDIATOR_EVENTS.CREATE_NEW_USER, userData);
      return currentUser;
    }

    return null;
  }

  private switchPage(params: string): boolean {
    if (params === PAGES_IDS.LOGIN_PAGE || params === PAGES_IDS.DEFAULT_PAGE) {
      if (StoreModel.getState().currentUser) {
        this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
        this.hide();
      } else {
        this.show();
      }
    }

    return true;
  }

  private handleSuccessMessage(): void {
    const userData = this.loginFormModel.getUserData();
    StoreModel.dispatch({
      type: ACTIONS.SET_CURRENT_USER,
      payload: userData,
    });
    this.storage.add(STORE_KEYS.CURRENT_USER, JSON.stringify(userData));
    this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    this.hide();
  }

  private showErrorMessage(error: string): void {
    const authenticationWrapper =
      this.loginPageView.getShowAuthenticationWrapper();
    this.loginPageView.getShowAuthenticationMessage().textContent = error;
    authenticationWrapper.animate(AUTHENTICATION_ANIMATE_DETAILS.params, {
      duration: AUTHENTICATION_ANIMATE_DETAILS.duration,
      easing: AUTHENTICATION_ANIMATE_DETAILS.easing,
    });
  }

  private handleErrorMessage(checkedMessage: Message): void {
    if (checkedMessage?.payload?.error) {
      this.showErrorMessage(checkedMessage?.payload?.error);
    }
  }

  private handleMessageFromServer(checkedMessage: Message): void {
    const savedUser = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (savedUser && isUser(savedUser)) {
      StoreModel.dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: savedUser,
      });
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
      this.hide();
      return;
    }

    if (checkedMessage?.type !== API_TYPES.ERROR) {
      this.handleSuccessMessage();
    } else if (checkedMessage?.id === this.loginFormModel.getMessageID()) {
      this.handleErrorMessage(checkedMessage);
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
    this.checkAuthorizedUser();
    this.subscribeToMediator();
    this.hide();
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
  }
}

export default LoginPageModel;
