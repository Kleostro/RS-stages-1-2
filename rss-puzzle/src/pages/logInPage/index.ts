import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import LoginForm from '../../widgets/loginForm/LoginForm.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';

class LogInPage {
  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  public storage: StorageComponent;

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

    const loginForm = new LoginForm(this.storage);
    this.page.append(loginForm.getHTML());

    this.parent.append(this.page);
    return this.page;
  }
}

export default LogInPage;
