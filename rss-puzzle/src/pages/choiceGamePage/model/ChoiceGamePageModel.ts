import type PageInterface from '../../types/interfaces.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import ChoiceGamePageView from '../ui/ChoiceGamePageView.ts';
import ChoiceGameApi from '../api/ChoiceGameApi.ts';
import type {
  CompletedRound,
  levelInfo,
} from '../../../shared/api/types/interfaces.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { PAGES_IDS } from '../../types/enums.ts';
import styles from '../ui/style.module.scss';
import getComplexityColor from '../../../utils/getComplexityColor.ts';
import type { LastRoundInfo } from '../../../widgets/playground/types/interfaces.ts';
import STORE_KEYS from '../../../app/Storage/types/enums.ts';
import { COMPLEXITY_COLORS } from '../types/enums.ts';

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
    this.singletonMediator.subscribe(
      AppEvents.newCompletedRound,
      this.switchCompletedRound.bind(this),
    );
    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.setGameData.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.switchCompletedRound.bind(this),
    );

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

  private switchParentClassByButtonClass(): void {
    const btns = this.pageView.getRoundBtns();
    const btnsHTML: HTMLButtonElement[] = [];
    btns.forEach((item) => {
      btnsHTML.push(item.getHTML());
    });

    const groupedByParent = new Map<HTMLElement, HTMLElement[]>();

    btnsHTML.forEach((btn) => {
      const parent = btn.parentElement;
      if (parent) {
        if (groupedByParent.has(parent)) {
          groupedByParent.get(parent)?.push(btn);
        } else {
          groupedByParent.set(parent, [btn]);
        }
      }
    });

    groupedByParent.forEach((buttons, parent) => {
      const lvl = Number(parent.getAttribute('id'));
      const hasAnyClass = (classes: string[]): boolean =>
        buttons.every((btn) =>
          btn.classList.contains(styles[classes[Number(lvl)]]),
        );

      const allButtonsHaveClass = hasAnyClass(COMPLEXITY_COLORS);
      if (allButtonsHaveClass) {
        parent.classList.add(styles[COMPLEXITY_COLORS[Number(lvl)]]);
      } else {
        parent.classList.remove(styles[COMPLEXITY_COLORS[Number(lvl)]]);
      }
    });
  }

  private switchCompletedRound(): void {
    const completedRounds = this.storage.get<CompletedRound[]>(
      STORE_KEYS.COMPLETED_ROUND,
    );
    const btns = this.pageView.getRoundBtns();

    btns.forEach((btn) => {
      const lvl = btn.getHTML().getAttribute('currentLVL');
      const round = btn.getHTML().getAttribute('currentRound');
      const complexity = getComplexityColor(Number(lvl));
      if (
        completedRounds?.some(
          (obj) => obj.lvl.toString() === lvl && obj.round.toString() === round,
        )
      ) {
        btn.getHTML().classList.add(styles[complexity]);
      } else {
        btn.getHTML().classList.remove(styles[complexity]);
      }
    });
    this.switchParentClassByButtonClass();
  }

  private setHandlersForBtns(): void {
    const btns = this.pageView.getRoundBtns();

    btns.forEach((btn) => {
      btn.getHTML().addEventListener(EVENT_NAMES.click, () => {
        const currentLVL = Number(btn.getHTML().getAttribute('currentLVL'));
        const currentRound = Number(btn.getHTML().getAttribute('currentRound'));
        const currentDataLVL = {
          gameData: this.gameData,
          currentRound,
          currentLVL,
        };
        this.singletonMediator.notify(AppEvents.newGame, currentDataLVL);
        this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
      });
    });
  }

  private setGameData(): void {
    const lastRoundData: LastRoundInfo | undefined = this.storage.get(
      STORE_KEYS.LAST_ROUND,
    );
    if (lastRoundData) {
      const currentDataLVL = {
        gameData: this.gameData,
        currentRound: lastRoundData.currentRound,
        currentLVL: lastRoundData.currentLVL,
      };
      this.singletonMediator.notify(AppEvents.newGame, currentDataLVL);
    } else {
      const data = {
        gameData: this.gameData,
        currentRound: 0,
        currentLVL: 1,
      };
      this.singletonMediator.notify(AppEvents.newGame, data);
    }
  }

  private init(): HTMLDivElement {
    this.getGameData()
      .then((data) => {
        this.gameData = data;
      })
      .then(() => {
        this.pageView.initHTML(this.gameData);
        this.setHandlersForBtns();
        this.switchCompletedRound();
        this.switchParentClassByButtonClass();
        this.setGameData();
      })
      .catch(() => {});

    this.page = this.pageView.createHTML(this.id);
    return this.page;
  }
}

export default ChoiceGamePageModel;
