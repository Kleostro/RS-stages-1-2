import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import type PageInterface from '../types/interfaces.ts';
import ButtonComponent from '../../shared/button/Button.ts';
import STORE_KEYS from '../../app/Storage/types/enums.ts';
import { type UserDataInterface } from '../../app/Storage/types/interfaces.ts';
import { PAGES_IDS, PAGES_STATE } from '../types/enums.ts';

class StartPage implements PageInterface {
  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  private title: HTMLHeadingElement | null;

  private subtitle: HTMLHeadingElement | null;

  private descr: HTMLDivElement | null;

  private startBtn: ButtonComponent | null;

  private logOutBtn: ButtonComponent | null;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.parent = parent;
    this.storage = storage;

    this.title = null;
    this.subtitle = null;
    this.descr = null;
    this.startBtn = null;
    this.logOutBtn = null;

    this.page = this.createHTML(id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public greeting(): void {
    const userData: UserDataInterface = this.storage.get(STORE_KEYS.USER);
    if (this.subtitle) {
      const { name, surname } = userData;
      const greeting = `Hello, ${name} ${surname}!`;
      this.subtitle.innerText = greeting;
    }
  }

  private logOut(): void {
    this.storage.remove(STORE_KEYS.USER);
    window.location.hash = PAGES_IDS.LOG_IN;
  }

  private createTitle(): HTMLHeadingElement {
    this.title = createBaseElement({
      tag: 'h1',
      cssClasses: [styles.page__title],
      innerContent: 'RSS Puzzle',
    });
    return this.title;
  }

  private createSubtitle(): HTMLHeadingElement {
    this.subtitle = createBaseElement({
      tag: 'h2',
      cssClasses: [styles.page__subtitle],
    });
    return this.subtitle;
  }

  private createDescr(): HTMLParagraphElement {
    this.descr = createBaseElement({
      tag: 'p',
      cssClasses: [styles.page__descr],
      innerContent: 'Your RSS reader',
    });
    return this.descr;
  }

  private createStartBtn(): ButtonComponent {
    this.startBtn = new ButtonComponent(
      'Start',
      [styles.page__btn, 'btn-reset'],
      { type: 'submit' },
    );
    return this.startBtn;
  }

  private createLogOutBtn(): ButtonComponent {
    this.logOutBtn = new ButtonComponent(
      'Log out',
      [styles.page__btn, 'btn-reset'],
      {},
      {
        key: 'click',
        value: (): void => {
          this.logOut();
        },
      },
    );

    return this.logOutBtn;
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: 'div',
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.page.style.display = PAGES_STATE.HIDDEN;

    this.title = this.createTitle();
    this.subtitle = this.createSubtitle();
    this.descr = this.createDescr();
    this.startBtn = this.createStartBtn();
    this.logOutBtn = this.createLogOutBtn();

    this.page.append(
      this.title,
      this.subtitle,
      this.descr,
      this.startBtn.getHTML(),
      this.logOutBtn.getHTML(),
    );

    this.parent.append(this.page);
    return this.page;
  }
}

export default StartPage;
