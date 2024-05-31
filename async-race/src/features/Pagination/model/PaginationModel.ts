import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PaginationView from '../view/PaginationView.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import { QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';

class PaginationModel {
  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private pageID;

  private paginationView: PaginationView = new PaginationView();

  private pagination: HTMLDivElement;

  constructor(pageID: string) {
    this.pageID = pageID;
    this.pagination = this.paginationView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.pagination;
  }

  private loadDataAndSetPageInfo(data: unknown[], limit: number): void {
    let type: (typeof ACTIONS)[keyof typeof ACTIONS];

    if (this.pageID === PAGES_IDS.WINNERS_PAGE) {
      type = ACTIONS.SET_TOTAL_WINNERS_PAGES;
    } else {
      type = ACTIONS.SET_TOTAL_GARAGE_PAGES;
    }

    if (data) {
      const pageSpan = this.paginationView.getCurrentPageSpan();
      const maxPagesCount = Math.ceil(data.length / limit);
      const maxPage = maxPagesCount === 0 ? 1 : maxPagesCount;
      const currentPage =
        type === ACTIONS.SET_TOTAL_GARAGE_PAGES
          ? StoreModel.getState().garagePage
          : StoreModel.getState().winnersPage;
      const textContent = `Page: ${currentPage} / ${maxPage} `;
      pageSpan.textContent = textContent;

      if (
        (type === ACTIONS.SET_TOTAL_GARAGE_PAGES && maxPage) !==
        StoreModel.getState().totalGaragePages
      ) {
        StoreModel.dispatch({
          type,
          payload: maxPage,
        });
        this.checkButtons();
      } else if (
        (type === ACTIONS.SET_TOTAL_WINNERS_PAGES && maxPage) !==
        StoreModel.getState().totalWinnersPages
      ) {
        StoreModel.dispatch({
          type,
          payload: maxPage,
        });
        this.checkButtons();
      }
    }
  }

  private async initPageInfo(): Promise<void> {
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const cars = await ApiModel.getCars(new Map());
      if (cars) {
        this.loadDataAndSetPageInfo(cars, QUERY_VALUES.DEFAULT_CARS_LIMIT);
      }
    } else {
      const winners = await ApiModel.getWinners(new Map());
      if (winners) {
        this.loadDataAndSetPageInfo(
          winners,
          QUERY_VALUES.DEFAULT_WINNERS_LIMIT,
        );
      }
    }
  }

  private redrawPageInfo(currentPage: number): void {
    const pageSpan = this.paginationView.getCurrentPageSpan();
    let maxPage = 0;
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      maxPage = StoreModel.getState().totalGaragePages;
    } else {
      maxPage = StoreModel.getState().totalWinnersPages;
    }
    const textContent = `Page: ${currentPage} / ${maxPage}`;
    pageSpan.textContent = textContent;
  }

  private prevButtonHandler(): void {
    const nextButton = this.paginationView.getNextButton();
    nextButton.setEnabled();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const garagePageCountDec = StoreModel.getState().garagePage - 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageCountDec,
      });
      this.checkButtons();
      this.redrawPageInfo(garagePageCountDec);
    } else {
      const winnersPageCountDec = StoreModel.getState().winnersPage - 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_WINNERS_PAGE,
        payload: winnersPageCountDec,
      });
      this.checkButtons();
      this.redrawPageInfo(winnersPageCountDec);
    }
  }

  private nextButtonHandler(): void {
    const prevButton = this.paginationView.getPrevButton();
    prevButton.setEnabled();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const garagePageCountInc = StoreModel.getState().garagePage + 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageCountInc,
      });
      this.checkButtons();
      this.redrawPageInfo(garagePageCountInc);
    } else {
      const winnersPageCountInc = StoreModel.getState().winnersPage + 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_WINNERS_PAGE,
        payload: winnersPageCountInc,
      });
      this.checkButtons();
      this.redrawPageInfo(winnersPageCountInc);
    }
  }

  private checkButtons(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const { garagePage } = StoreModel.getState();
      const { totalGaragePages } = StoreModel.getState();
      if (garagePage === totalGaragePages || totalGaragePages === 0) {
        nextButton.setDisabled();
      } else {
        nextButton.setEnabled();
      }
      if (StoreModel.getState().garagePage === 1) {
        prevButton.setDisabled();
      } else {
        prevButton.setEnabled();
      }
    } else {
      const { winnersPage } = StoreModel.getState();
      const { totalWinnersPages } = StoreModel.getState();
      if (winnersPage === totalWinnersPages || totalWinnersPages === 0) {
        nextButton.setDisabled();
      } else {
        nextButton.setEnabled();
      }
      if (StoreModel.getState().winnersPage === 1) {
        prevButton.setDisabled();
      } else {
        prevButton.setEnabled();
      }
    }
  }

  private allDisabledButton(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.setDisabled();
    nextButton.setDisabled();
  }

  private setSubscribeToMediatorGarage(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.initPageInfo().catch(() => {});
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.initPageInfo().catch(() => {});
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.initPageInfo().catch(() => {});
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.START_RACE, () => {
      this.allDisabledButton();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.EMPTY_RACE, () => {
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_START, () => {
      prevButton.setDisabled();
      nextButton.setDisabled();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_RESET, () => {
      this.checkButtons();
    });
  }

  private setSubscribeToMediatorWinners(): void {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_WINNER, () => {
      this.initPageInfo().catch(() => {});
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DRAW_NEW_WINNER, () => {
      this.initPageInfo().catch(() => {});
      this.checkButtons();
    });
  }

  private init(): void {
    this.initPageInfo().catch(() => {});
    this.checkButtons();
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();

    prevButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.prevButtonHandler();
      if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, '');
      } else {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE, '');
      }
    });

    nextButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.nextButtonHandler();
      if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, '');
      } else {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE, '');
      }
    });

    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      this.setSubscribeToMediatorGarage();
    } else {
      this.setSubscribeToMediatorWinners();
    }
  }
}

export default PaginationModel;
