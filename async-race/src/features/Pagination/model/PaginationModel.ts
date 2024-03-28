import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PaginationView from '../view/PaginationView.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import { QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import STORE_FIELDS from '../../../shared/Store/types/enums.ts';
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';

class PaginationModel {
  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private paginationView: PaginationView = new PaginationView();

  private pagination: HTMLDivElement;

  constructor() {
    this.pagination = this.paginationView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.pagination;
  }

  private initPageInfo(): void {
    const pageSpan = this.paginationView.getCurrentPageSpan();
    const loader = new LoaderModel();
    this.pagination.append(loader.getHTML());
    ApiModel.getCars(new Map())
      .then((cars) => {
        if (cars) {
          loader.getHTML().remove();
          const maxPage = Math.ceil(
            cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT,
          );
          StoreModel.dispatch({
            type: ACTIONS.SET_TOTAL_GARAGE_PAGES,
            payload: maxPage,
          });
          const currentPage = StoreModel.getState().garagePage;
          const textContent = `Page: ${currentPage} / ${maxPage} `;
          pageSpan.textContent = textContent;
        }
      })
      .catch(() => {});
  }

  private redrawPageInfo(currentPage: number): void {
    const pageSpan = this.paginationView.getCurrentPageSpan();
    const maxPage = StoreModel.getState().totalPages;
    const textContent = `Page: ${currentPage} / ${maxPage} `;
    pageSpan.textContent = textContent;
  }

  private prevButtonHandler(): void {
    const nextButton = this.paginationView.getNextButton();
    nextButton.setEnabled();
    const garagePageCountDec = StoreModel.getState().garagePage - 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountDec,
    });
    this.checkButtons();
    this.redrawPageInfo(garagePageCountDec);
  }

  private nextButtonHandler(): void {
    const prevButton = this.paginationView.getPrevButton();
    prevButton.setEnabled();
    const garagePageCountInc = StoreModel.getState().garagePage + 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountInc,
    });
    this.checkButtons();
    this.redrawPageInfo(garagePageCountInc);
  }

  private checkButtons(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    const { garagePage } = StoreModel.getState();
    const { totalPages } = StoreModel.getState();
    if (garagePage === totalPages || totalPages === 0) {
      nextButton.setDisabled();
    } else {
      nextButton.setEnabled();
    }
    if (StoreModel.getState().garagePage === 1) {
      prevButton.setDisabled();
    } else {
      prevButton.setEnabled();
    }
  }

  private setSubscribeToMediator(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
      this.initPageInfo.bind(this),
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.initPageInfo();
      this.checkButtons();
    });

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
      this.checkButtons.bind(this),
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.initPageInfo();
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.checkButtons();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.START_RACE, () => {
      prevButton.setDisabled();
      nextButton.setDisabled();
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

  private init(): void {
    this.initPageInfo();
    this.checkButtons();
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.prevButtonHandler();
      this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, '');
    });
    nextButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.nextButtonHandler();
      this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, '');
    });

    this.setSubscribeToMediator();

    StoreModel.subscribe(STORE_FIELDS.TOTAL_GARAGE_PAGES, () => {
      this.checkButtons();
    });
  }
}

export default PaginationModel;
