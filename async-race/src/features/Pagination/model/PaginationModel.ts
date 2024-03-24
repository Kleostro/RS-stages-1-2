import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PaginationView from '../view/PaginationView.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';

class PaginationModel {
  private singletonMediator: MediatorModel<unknown>;

  private paginationView: PaginationView;

  private pagination: HTMLDivElement;

  constructor() {
    this.singletonMediator = MediatorModel.getInstance();
    this.paginationView = new PaginationView();
    this.pagination = this.paginationView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.pagination;
  }

  private prevButtonHandler(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    nextButton.setEnabled();
    const garagePageCountDec = StoreModel.getState().garagePage - 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountDec,
    });
    if (StoreModel.getState().garagePage === 0) {
      const garagePageDefault = 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageDefault,
      });
      prevButton.setDisabled();
    }
  }

  private nextButtonHandler(): void {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.setEnabled();
    const garagePageCountInc = StoreModel.getState().garagePage + 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountInc,
    });
    if (StoreModel.getState().garagePage > StoreModel.getState().totalPages) {
      const garagePageDefault = StoreModel.getState().totalPages;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageDefault,
      });
      nextButton.setDisabled();
    }
  }

  private init(): void {
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
  }
}

export default PaginationModel;
