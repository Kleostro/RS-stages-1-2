import MediatorModel from '../../core/mediator/model/MediatorModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import StatisticsPageView from '../ui/StatisticsPageView.ts';
import AppEvents from '../../core/mediator/types/enums.ts';
import { PAGES_IDS } from '../../types/enums.ts';
import isMapOfLineInfoArr from '../../../utils/isMapOfLineInfoArr.ts';
import type MapOfLineInfo from '../../../widgets/playground/types/types.ts';
import styles from '../ui/style.module.scss';
import createListTitle from '../../../utils/createListTitle.ts';
import LIST_TITLES from '../types/enums.ts';

class StatisticsPageModel {
  private id: string;

  private page: HTMLDivElement;

  private pageView: StatisticsPageView;

  private singletonMediator: MediatorModel<unknown>;

  private KNOW_LIST_INDEX = 0;

  private DONT_KNOW_LIST_INDEX = 1;

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

  private switchDisableNextRoundBtn(): void {
    const nextRoundBtn = this.pageView.getNextRoundBtn();
    nextRoundBtn.switchDisabled();
  }

  private fillKnowList(params: MapOfLineInfo): void {
    const knowList = this.pageView.getKnowList();
    const title = createListTitle(LIST_TITLES.KNOW_LIST);
    knowList.append(title);
    params.forEach((value) => {
      const li = this.pageView.createListItem(
        value,
        styles.know_list_item,
        styles.know_list_item__text,
      );
      knowList.append(li);
    });
  }

  private fillDontKnowList(params: MapOfLineInfo): void {
    const dontKnow = this.pageView.getDontKnowList();
    const title = createListTitle(LIST_TITLES.DONT_KNOW_LIST);
    dontKnow.append(title);
    params.forEach((value) => {
      const li = this.pageView.createListItem(
        value,
        styles.dont_know_list_item,
        styles.dont_know_list_item__text,
      );
      dontKnow.append(li);
    });
  }

  private drawRoundInfo(params: unknown): void {
    if (isMapOfLineInfoArr(params)) {
      this.pageView.getKnowList().innerHTML = '';
      this.pageView.getDontKnowList().innerHTML = '';
      this.fillKnowList(params[this.KNOW_LIST_INDEX]);
      this.fillDontKnowList(params[this.DONT_KNOW_LIST_INDEX]);
    }
  }

  private init(): void {
    const nextRoundBtn = this.pageView.getNextRoundBtn();
    nextRoundBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.nextRound, '');
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
      nextRoundBtn.setDisabled();
    });

    this.singletonMediator.subscribe(
      AppEvents.switchDisableNextRoundBtn,
      this.switchDisableNextRoundBtn.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.endRound,
      this.drawRoundInfo.bind(this),
    );
  }
}

export default StatisticsPageModel;
