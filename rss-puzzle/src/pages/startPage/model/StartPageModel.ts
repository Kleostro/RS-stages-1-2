import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import type ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import STORE_KEYS from '../../../app/Storage/types/enums.ts';
import { type UserDataInterface } from '../../../app/Storage/types/interfaces.ts';
import { PAGES_IDS } from '../../types/enums.ts';
import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import StartPageView from '../ui/StartPageView.ts';

class StartPageModel implements PageInterface {
  private storage: StorageModel;

  private id: string;

  private pageView: StartPageView;

  private page: HTMLDivElement;

  private subtitle: HTMLHeadingElement;

  private startBtn: ButtonModel;

  private logOutBtn: ButtonModel;

  private singletonMediator: MediatorModel<unknown>;

  constructor(id: string, parent: HTMLDivElement, storage: StorageModel) {
    this.id = id;
    this.pageView = new StartPageView(id, parent);
    this.page = this.pageView.getHTML();
    this.subtitle = this.pageView.getSubTitle();
    this.startBtn = this.pageView.getStartBtn();
    this.logOutBtn = this.pageView.getLogOutBtn();
    this.storage = storage;

    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.newUser,
      this.greeting.bind(this),
    );

    this.setHandlers();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  public greeting(): string {
    const userData = this.storage.get<UserDataInterface>(STORE_KEYS.USER);
    const greeting = `Hello, ${userData?.name} ${userData?.surname}!`;
    this.subtitle.textContent = greeting;
    return greeting;
  }

  private logOut(): void {
    this.storage.remove(STORE_KEYS.USER);
    this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
  }

  private setHandlers(): void {
    this.logOutBtn
      .getHTML()
      .addEventListener(EVENT_NAMES.click, this.logOut.bind(this));

    this.startBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
    });
  }
}

export default StartPageModel;
