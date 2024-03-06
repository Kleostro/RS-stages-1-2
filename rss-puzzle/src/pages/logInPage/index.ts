import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import LoginForm from '../../widgets/loginForm/LoginForm.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import type PageInterface from '../types/interfaces.ts';

class LogInPage implements PageInterface {
  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.parent = parent;
    this.storage = storage;
    this.page = this.createHTML(id);
    this.hidden();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public hidden(): void {
    this.page.style.opacity = '0';
  }

  public visible(): void {
    this.page.style.opacity = '1';
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: 'div',
      cssClasses: [styles.page],
      attributes: { id },
    });

    const loginForm = new LoginForm(this);

    this.page.append(loginForm.getHTML());
    this.parent.append(this.page);
    return this.page;
  }
}

export default LogInPage;
