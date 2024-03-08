import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import { PAGES_STATE } from '../types/enums.ts';
import type PageInterface from '../types/interfaces.ts';

class MainPage implements PageInterface {
  public id: string;

  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.id = id;
    this.parent = parent;
    this.storage = storage;
    this.page = this.createHTML(this.id);
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

    this.parent.append(this.page);
    return this.page;
  }
}

export default MainPage;
