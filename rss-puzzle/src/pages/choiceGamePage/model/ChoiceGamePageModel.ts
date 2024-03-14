import type PageInterface from '../../types/interfaces.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import ChoiceGamePageView from '../ui/ChoiceGamePageView.ts';
import ChoiceGameApi from '../api/ChoiceGameApi.ts';
import type { levelInfo } from '../../../shared/api/types/interfaces.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { PAGES_IDS } from '../../types/enums.ts';

class ChoiceGamePageModel implements PageInterface {
  private id: string;

  private parent: HTMLDivElement;

  private api: ChoiceGameApi;

  private storage: StorageModel;

  private singletonMediator: MediatorModel<unknown>;

  private pageView: ChoiceGamePageView;

  private page: HTMLDivElement;

  private gameData: levelInfo[] = [];

  constructor(id: string, parent: HTMLDivElement, storage: StorageModel) {
    this.id = id;
    this.parent = parent;
    this.api = new ChoiceGameApi();
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.pageView = new ChoiceGamePageView(this.id, this.parent, this.gameData);
    this.page = this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  private async getGameData(): Promise<levelInfo[]> {
    this.gameData = [];
    const gameData = await this.api.getGameData();
    return gameData;
  }

  private setHandlersForBtns(): void {
    const btns = this.pageView.getRoundBtns();
    btns.forEach((btn) => {
      btn.getHTML().addEventListener(EVENT_NAMES.click, () => {
        const currentLVL = Number(btn.getHTML().getAttribute('currentLVL'));
        const currentRound = Number(btn.getHTML().getAttribute('currentRound'));
        const currentDataLVL = {
          gameData: this.gameData[currentLVL].rounds[currentRound],
          currentRound,
          currentLVL,
        };
        this.singletonMediator.notify(AppEvents.newRound, currentDataLVL);
        this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
      });
    });
  }

  private init(): HTMLDivElement {
    this.getGameData()
      .then((data) => {
        this.gameData = data;
        this.page = this.pageView.createHTML(this.id, this.gameData);
        this.setHandlersForBtns();
      })
      .catch(() => {});

    return this.page;
  }
}

export default ChoiceGamePageModel;
