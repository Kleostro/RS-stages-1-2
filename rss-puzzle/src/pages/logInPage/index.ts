/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import LoginForm from '../../widgets/loginForm/LoginForm.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import { PAGES_IDS, PAGES_STATE } from '../types/enums.ts';
import Mediator from '../core/mediator/mediator.ts';
import STORE_KEYS from '../../app/Storage/types/enums.ts';
import type PageInterface from '../types/interfaces.ts';
import AppEvents from '../core/mediator/types/enums.ts';

class LogInPage implements PageInterface {
  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private singletonMediator: Mediator;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.parent = parent;
    this.storage = storage;
    this.singletonMediator = Mediator.getInstance();
    this.page = this.createHTML(id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public checkAuthUser(): void {
    const userData = this.storage.get(STORE_KEYS.USER);
    if (userData.name !== '') {
      this.singletonMediator.notify(AppEvents.newUser, userData);
      window.location.hash = PAGES_IDS.START;
    } else {
      window.location.hash = PAGES_IDS.LOG_IN;
    }
  }

  public saveAuthUser(userData: {
    [key: string]: FormDataEntryValue | null;
  }): void {
    this.storage.add(STORE_KEYS.USER, JSON.stringify(userData));
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: 'div',
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.page.style.display = PAGES_STATE.HIDDEN;

    const loginForm = new LoginForm(this);

    this.page.append(loginForm.getHTML());
    this.parent.append(this.page);
    return this.page;
  }
}

export default LogInPage;
