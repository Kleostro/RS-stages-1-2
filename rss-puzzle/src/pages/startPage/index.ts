import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import type PageInterface from '../types/interfaces.ts';
import ButtonComponent from '../../shared/button/Button.ts';

class StartPage implements PageInterface {
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

    const title = createBaseElement({
      tag: 'h1',
      cssClasses: [styles.page__title],
      innerContent: 'RSS Puzzle',
    });

    const descr = createBaseElement({
      tag: 'p',
      cssClasses: [styles.page__descr],
      innerContent: 'Your RSS reader',
    });

    const startBtn = new ButtonComponent('Start', [
      styles.page__btn,
      'btn-reset',
    ]);

    this.page.append(title, descr, startBtn.getHTML());

    this.parent.append(this.page);
    return this.page;
  }
}

export default StartPage;
