import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import LoginPageView from '../view/LoginPageView.ts';
import LOGIN_PAGE_STYLES from '../view/loginPage.module.scss';
import PAGES_IDS, {
  AUTHENTICATION_ANIMATE_DETAILS,
} from '../../types/enums.ts';
import LoginFormModel from '../../../widgets/LoginForm/model/LoginFormModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import type { MessageFromServer } from '../../../utils/isFromServerMessage.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import type SessionStorageModel from '../../../shared/SessionStorage/model/SessionStorage.ts';
import STORE_KEYS from '../../../shared/SessionStorage/types/enums.ts';
import isUser from '../../../utils/isUser.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import type LoginUser from '../../../shared/Server/ServerApi/types/interfaces.ts';
import { setCurrentUser } from '../../../shared/Store/actions/actions.ts';

class LoginPageModel implements PageInterface {
  private loginPageView: LoginPageView;

  private router: RouterModel;

  private storage: SessionStorageModel;

  private eventMediator = EventMediatorModel.getInstance();

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

  private show(): boolean {
    this.loginPageView
      .getHTML()
      .classList.remove(LOGIN_PAGE_STYLES.loginPage_hidden);
    return true;
  }

  private hide(): boolean {
    this.loginPageView
      .getHTML()
      .classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
    return true;
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

      this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_REQUEST, userData);
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
    } else {
      this.hide();
    }

    return true;
  }

  private handleSuccessMessage(): boolean {
    const userData = this.loginFormModel.getUserData();
    StoreModel.dispatch(setCurrentUser(userData));
    this.storage.add(STORE_KEYS.CURRENT_USER, JSON.stringify(userData));
    this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    this.hide();
    return true;
  }

  private showErrorMessage(error: string): boolean {
    const authenticationWrapper =
      this.loginPageView.getShowAuthenticationWrapper();
    this.loginPageView.getShowAuthenticationMessage().textContent = error;
    authenticationWrapper.animate(AUTHENTICATION_ANIMATE_DETAILS.params, {
      duration: AUTHENTICATION_ANIMATE_DETAILS.duration,
      easing: AUTHENTICATION_ANIMATE_DETAILS.easing,
    });
    return true;
  }

  private handleErrorMessage(checkedMessage: MessageFromServer): boolean {
    if (checkedMessage?.payload?.error) {
      this.showErrorMessage(checkedMessage?.payload?.error);
    }
    return true;
  }

  private handleMessageFromServer(checkedMessage: MessageFromServer): boolean {
    const savedUser = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (savedUser && isUser(savedUser)) {
      StoreModel.dispatch(setCurrentUser(savedUser));
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
      this.hide();
      return true;
    }

    if (checkedMessage?.type !== API_TYPES.ERROR) {
      this.handleSuccessMessage();
    } else if (checkedMessage?.id === this.loginFormModel.getMessageID()) {
      this.handleErrorMessage(checkedMessage);
    }
    return true;
  }

  private subscribeToMediator(): boolean {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.switchPage(String(params));
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_CONNECT, () => {
      this.checkAuthorizedUser();
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_IN_RESPONSE, (message) => {
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleMessageFromServer(checkedMessage);
      }
    });
    return true;
  }

  private initPage(): boolean {
    this.subscribeToMediator();
    this.hide();
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
    return true;
  }
}

export default LoginPageModel;
