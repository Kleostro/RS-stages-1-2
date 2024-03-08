import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import type PageInterface from '../types/interfaces.ts';
import ButtonComponent from '../../shared/button/Button.ts';
import STORE_KEYS from '../../app/Storage/types/enums.ts';
import { type UserDataInterface } from '../../app/Storage/types/interfaces.ts';
import { PAGES_IDS, PAGES_STATE } from '../types/enums.ts';
import Mediator from '../core/mediator/mediator.ts';
import AppEvents from '../core/mediator/types/enums.ts';

class StartPage implements PageInterface {
  public id: string;

  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  private title: HTMLHeadingElement | null;

  private subtitle: HTMLHeadingElement;

  private descr: HTMLDivElement | null;

  private startBtn: ButtonComponent | null;

  private logOutBtn: ButtonComponent | null;

  private singletonMediator: Mediator;

  constructor(id: string, parent: HTMLDivElement, storage: StorageComponent) {
    this.id = id;
    this.parent = parent;
    this.storage = storage;

    this.title = null;
    this.subtitle = createBaseElement({ tag: 'h2' });
    this.descr = null;
    this.startBtn = null;
    this.logOutBtn = null;

    this.singletonMediator = Mediator.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.newUser,
      this.greeting.bind(this),
    );

    this.page = this.createHTML(this.id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public greeting(): string {
    const userData = this.storage.get<UserDataInterface>(STORE_KEYS.USER);
    const greeting = `Hello, ${userData?.name} ${userData?.surname}!`;
    this.subtitle.textContent = greeting;
    return greeting;
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
      innerContent: this.greeting(),
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
      {},
      {
        key: 'click',
        value: (): void => {
          window.location.hash = PAGES_IDS.MAIN;
        },
      },
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
