import LoginFormModel from '../../../widgets/loginForm/model/LoginFormModel.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import { PAGES_IDS, PAGES_STATE } from '../../types/enums.ts';
import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import STORE_KEYS from '../../../app/Storage/types/enums.ts';
import type PageInterface from '../../types/interfaces.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { type UserDataInterface } from '../../../app/Storage/types/interfaces.ts';
import LoginPageView from '../ui/LoginPageView.ts';

class LogInPageModel implements PageInterface {
  private storage: StorageModel;

  private id: string;

  private singletonMediator: MediatorModel<unknown>;

  private pageView: LoginPageView;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement, storage: StorageModel) {
    this.id = id;
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.pageView = new LoginPageView(id, parent);
    this.page = this.pageView.getHTML();
    this.drawForm();
    this.hidden();
  }

  private hidden = (): void => {
    this.page.style.display = PAGES_STATE.HIDDEN;
  };

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  public checkAuthUser(): boolean {
    const userData = this.storage.get<UserDataInterface>(STORE_KEYS.USER);
    if (userData) {
      this.singletonMediator.notify(AppEvents.newUser, userData);
    } else {
      return false;
    }
    return true;
  }

  public saveAuthUser(userData: UserDataInterface): void {
    this.storage.add(STORE_KEYS.USER, JSON.stringify(userData));
    this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.START);
    this.drawForm();
  }

  private drawForm(): void {
    const loginForm = new LoginFormModel(this);
    this.page.append(loginForm.getHTML());
  }
}

export default LogInPageModel;
