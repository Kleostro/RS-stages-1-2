import PAGES_IDS from '../../../pages/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import HeaderView from '../view/HeaderView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import { STATE_FIELDS } from '../../../shared/Store/initialData.ts';
import STORE_KEYS from '../../../shared/SessionStorage/types/enums.ts';
import type SessionStorageModel from '../../../shared/SessionStorage/model/SessionStorage.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import { setCurrentUser } from '../../../shared/Store/actions/actions.ts';

class HeaderModel {
  private view: HeaderView = new HeaderView();

  private eventMediator = EventMediatorModel.getInstance();

  private router: RouterModel;

  private storage: SessionStorageModel;

  constructor(router: RouterModel, storage: SessionStorageModel) {
    this.router = router;
    this.storage = storage;
    this.init();
  }

  public getHTML(): HTMLElement {
    return this.view.getHTML();
  }

  private logoutButtonHandler(): void {
    const logOutData = {
      id: null,
      type: API_TYPES.USER_LOGOUT,
      payload: {
        user: {
          login: StoreModel.getState().currentUser?.login,
          password: StoreModel.getState().currentUser?.password,
        },
      },
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.LOG_OUT, logOutData);
    this.storage.remove(STORE_KEYS.CURRENT_USER);
    StoreModel.dispatch(setCurrentUser(null));
    this.view.getLogoutButton().setDisabled();
    this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
  }

  private setLogoutButtonHandler(): void {
    const logoutButton = this.view.getLogoutButton().getHTML();
    const aboutButton = this.view.getAboutButton().getHTML();

    logoutButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.logoutButtonHandler.bind(this),
    );

    aboutButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.router.navigateTo.bind(this.router, PAGES_IDS.ABOUT_PAGE),
    );
  }

  private changeCurrentUserLogin(): void {
    const userLogin = this.view.getUserLogin();
    userLogin.textContent = StoreModel.getState().currentUser?.login || '';
    this.view.getLogoutButton().setEnabled();
  }

  private init(): void {
    this.setLogoutButtonHandler();

    StoreModel.subscribe(
      STATE_FIELDS.CURRENT_USER,
      this.changeCurrentUserLogin.bind(this),
    );
  }
}

export default HeaderModel;
