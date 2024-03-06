import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import LoginForm from '../../widgets/loginForm/LoginForm.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import type PageInterface from '../types/interfaces.ts';
import { PAGES_STATE } from '../types/enums.ts';

class LogInPage implements PageInterface {
  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.parent = parent;
    this.storage = storage;
    this.page = this.createHTML(id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
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
