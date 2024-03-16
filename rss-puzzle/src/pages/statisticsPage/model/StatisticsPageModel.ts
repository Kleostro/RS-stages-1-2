import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import StatisticsPageView from '../ui/StatisticsPageView.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { PAGES_IDS } from '../../types/enums.ts';

class StatisticsPageModel {
  private id: string;

  private page: HTMLDivElement;

  private pageView: StatisticsPageView;

  private singletonMediator: MediatorModel<unknown>;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.pageView = new StatisticsPageView(id, parent);
    this.singletonMediator = MediatorModel.getInstance();
    this.page = this.pageView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  private init(): void {
    const nextRoundBtn = this.pageView.getNextRoundBtn().getHTML();
    nextRoundBtn.addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.nextRound, '');
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
    });
  }
}

export default StatisticsPageModel;
