import PAGES_IDS from '../../../pages/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import HeaderView from '../view/HeaderView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import { STATE_FIELDS } from '../../../shared/Store/initialData.ts';

class HeaderModel {
  private view: HeaderView = new HeaderView();

  private router: RouterModel;

  constructor(router: RouterModel) {
    this.router = router;
    this.init();
  }

  public getHTML(): HTMLElement {
    return this.view.getHTML();
  }

  private logoutButtonHandler(): void {
    this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
  }

  private setLogoutButtonHandler(): void {
    const logoutButton = this.view.getLogoutButton().getHTML();

    logoutButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.logoutButtonHandler.bind(this),
    );
  }

  private changeCurrentUserLogin(): void {
    const userLogin = this.view.getUserLogin();
    userLogin.textContent = StoreModel.getState().currentUser?.login || '';
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
