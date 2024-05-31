import { QUERY_PARAMS, QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import GaragePageView from '../view/GaragePageView.ts';
import GARAGE_PAGE_STYLES from '../view/garagePage.module.scss';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import type {
  CarInterface,
  WinnerInterface,
} from '../../../shared/Api/types/interfaces.ts';
import RaceTrackModel from '../../../entities/RaceTrack/model/RaceTrackModel.ts';
import CreateCarFormModel from '../../../widgets/CreateCarForm/model/CreateCarFormModel.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import PreviewCarModel from '../../../features/PreviewCar/model/PreviewCarModel.ts';
import ChangeCarFormModel from '../../../widgets/ChangeCarForm/model/ChangeCarFormModel.ts';
import type ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import createRandomDataCars from '../../../utils/createRandomDataCars.ts';
import PaginationModel from '../../../features/Pagination/model/PaginationModel.ts';
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';
import PAGES_IDS, { MORE_COUNT_CARS } from '../../types/enums.ts';
import type NewWinner from '../../../entities/RaceTrack/types/interfaces.ts';
import Winner from '../../../utils/isWinner.ts';

class GaragePageModel implements PageInterface {
  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private garagePageView: GaragePageView;

  private raceTracks: RaceTrackModel[] = [];

  private createCarForm: CreateCarFormModel = new CreateCarFormModel();

  private removeButtons: ButtonModel[] = [];

  private countCarsInRace = 0;

  private changeCarForm: ChangeCarFormModel = new ChangeCarFormModel();

  private isWinner = false;

  private winner: NewWinner = {
    id: 0,
    wins: 0,
    time: 0,
    name: '',
  };

  private previewCar: PreviewCarModel = new PreviewCarModel();

  private pagination: PaginationModel = new PaginationModel(
    PAGES_IDS.GARAGE_PAGE,
  );

  constructor(parent: HTMLDivElement) {
    this.garagePageView = new GaragePageView(parent);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.garagePageView.getHTML();
  }

  private visible(): void {
    this.garagePageView
      .getHTML()
      .classList.remove(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  private hidden(): void {
    this.garagePageView
      .getHTML()
      .classList.add(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  private async getInitialDataCars(): Promise<void> {
    const queryParams: Map<string, number> = new Map();
    queryParams.set(QUERY_PARAMS.PAGE, QUERY_VALUES.DEFAULT_PAGE);
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);

    const cars = await ApiModel.getCars(queryParams);

    if (cars) {
      this.drawRaceTracks(cars);
    }

    this.getAllCars().catch(() => {});
  }

  private async getAllCars(): Promise<void> {
    const loader = new LoaderModel();
    this.garagePageView.getGarageTitle().append(loader.getHTML());
    const cars = await ApiModel.getCars(new Map());
    if (cars) {
      StoreModel.dispatch({
        type: ACTIONS.GET_CARS,
        payload: cars,
      });
      const maxPageCount = Math.ceil(
        cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT,
      );
      StoreModel.dispatch({
        type: ACTIONS.SET_TOTAL_GARAGE_PAGES,
        payload: maxPageCount === 0 ? 1 : maxPageCount,
      });
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
        '',
      );
      this.drawGarageTitle();
    }
  }

  private drawGarageTitle(): void {
    const title = this.garagePageView.getGarageTitle();
    const countCars = StoreModel.getState().cars.length;
    const textContent = `Garage (${countCars})`;
    title.textContent = textContent;
  }

  private drawRaceTracks(cars: CarInterface[]): void {
    this.raceTracks = [];
    const countCarsToList =
      this.garagePageView.getRaceTracksList().children.length;

    if (countCarsToList < QUERY_VALUES.DEFAULT_CARS_LIMIT) {
      cars.forEach((car) => {
        const raceTrack = new RaceTrackModel(car);
        this.raceTracks.push(raceTrack);
        this.removeButtons.push(raceTrack.getView().getRemoveCarButton());
        this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
      });
    }
  }

  private moreCarsHandler(): void {
    const cars = createRandomDataCars(MORE_COUNT_CARS);
    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: cars,
    });
    cars.forEach((car) => {
      this.garagePageView.getStartRaceButton().setDisabled();
      ApiModel.createCar(car)
        .then(() => {
          this.drawRaceTracks([car]);
          this.singletonMediator.notify(MEDIATOR_EVENTS.CREATE_MORE_CARS, '');
          this.garagePageView.getStartRaceButton().setEnabled();
        })
        .catch(() => {});
    });
  }

  private async redrawCurrentPage(): Promise<void> {
    const currentPage = StoreModel.getState().garagePage;
    const queryParams: Map<string, number> = new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    if (
      this.garagePageView.getRaceTracksList().children.length === 0 &&
      currentPage !== 1
    ) {
      const prevPage = currentPage - 1;
      queryParams.set(QUERY_PARAMS.PAGE, prevPage);
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: prevPage,
      });
    } else {
      queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    }

    const cars = await ApiModel.getCars(queryParams);

    if (cars) {
      this.garagePageView.clearRaceTracksList();
      this.drawRaceTracks(cars);
    }
  }

  private startRaceHandler(): void {
    this.countCarsInRace = this.raceTracks.length;
    this.allDisabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.startEngineHandler().catch(() => {});
    });
    this.singletonMediator.notify(MEDIATOR_EVENTS.START_RACE, '');
  }

  private resetRaceHandler(): void {
    this.garagePageView
      .getRaceResult()
      .classList.remove(GARAGE_PAGE_STYLES['garage-page_race-result_show']);
    this.garagePageView.getRaceResult().innerHTML = '';
    this.isWinner = false;
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.stopEngineHandler().catch(() => {});
    });
    this.singletonMediator.notify(MEDIATOR_EVENTS.RESET_RACE, '');
  }

  private drawWinner(): void {
    this.garagePageView
      .getRaceResult()
      .classList.add(GARAGE_PAGE_STYLES['garage-page_race-result_show']);
    this.garagePageView.getRaceResult().innerHTML = '';
    const text = `Winner: ${this.winner.name} - ${this.winner.time}s`;
    this.garagePageView.getRaceResult().textContent = text;
  }

  private async hasWinner(winner: WinnerInterface): Promise<void> {
    if (winner.wins) {
      const currentWinner = {
        id: winner.id,
        wins: winner.wins + 1,
        time: this.winner.time < winner.time ? this.winner.time : winner.time,
      };

      await ApiModel.updateWinnerById(currentWinner.id, currentWinner);
      this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, '');
    } else {
      const newWinnerData: WinnerInterface = {
        id: this.winner.id,
        wins: this.winner.wins,
        time: this.winner.time,
      };
      await ApiModel.createWinner(newWinnerData);
      this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, '');
    }
  }

  private async addNewWinner(): Promise<void> {
    const newWinner = await ApiModel.getWinnerById(this.winner.id);

    if (newWinner) {
      this.hasWinner(newWinner).catch(() => {});
    }
  }

  private allDisabled(): void {
    this.garagePageView.getMoreCarsButton().setDisabled();
    this.garagePageView.getStartRaceButton().setDisabled();
    this.garagePageView.getResetRaceButton().setDisabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.getView().getSelectCarButton().setDisabled();
      raceTrack.getView().getRemoveCarButton().setDisabled();
    });
  }

  private allEnabled(): void {
    this.garagePageView.getMoreCarsButton().setEnabled();
    this.garagePageView.getStartRaceButton().setEnabled();
    this.garagePageView.getResetRaceButton().setEnabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.getView().getSelectCarButton().setEnabled();
      raceTrack.getView().getRemoveCarButton().setEnabled();
    });
  }

  private setSubscribeToMediator(): void {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage().catch(() => {});
      this.getAllCars().catch(() => {});
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage().catch(() => {});
      this.getAllCars().catch(() => {});
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage().catch(() => {});
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.removeButtons.forEach((button) => {
        button.setEnabled();
      });
      this.redrawCurrentPage().catch(() => {});
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.redrawCurrentPage().catch(() => {});
    });

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_START,
      this.allDisabled.bind(this),
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.NEW_WINNER, (params) => {
      this.decCarInRace();
      if (!this.isWinner && Winner.isWinner(params)) {
        this.winner = params;
        this.isWinner = true;
        this.drawWinner();
        this.addNewWinner().catch(() => {});
      }
    });
  }

  private decCarInRace(): void {
    this.countCarsInRace -= 1;
    if (this.countCarsInRace === 0) {
      this.garagePageView.getResetRaceButton().setEnabled();
    }
  }

  private incCarInRace(): void {
    this.countCarsInRace += 1;
    if (this.countCarsInRace === this.raceTracks.length) {
      this.garagePageView.getResetRaceButton().setDisabled();
      this.garagePageView.getStartRaceButton().setEnabled();
      this.garagePageView.getMoreCarsButton().setEnabled();
      this.singletonMediator.notify(MEDIATOR_EVENTS.EMPTY_RACE, '');
    }
  }

  private setSubscribeToMediator2(): void {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_PAGE,
      (params: unknown) => {
        if (
          (typeof params === 'string' && params === PAGES_IDS.GARAGE_PAGE) ||
          params === PAGES_IDS.DEFAULT_PAGE
        ) {
          this.visible();
        } else {
          this.hidden();
        }
      },
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CAR_BROKEN, () => {
      this.decCarInRace();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.RESET_CURRENT_CAR, () => {
      this.incCarInRace();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_RESET, () => {
      this.allEnabled();
    });
  }

  private init(): void {
    this.getInitialDataCars().catch(() => {});
    this.setSubscribeToMediator();
    this.setSubscribeToMediator2();

    const moreCarsButton = this.garagePageView.getMoreCarsButton().getHTML();
    moreCarsButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.moreCarsHandler.bind(this),
    );

    const raceTrackTopWrapper = this.garagePageView.getRaceTrackTopWrapper();
    const raceTrackBottomWrapper =
      this.garagePageView.getRaceTrackBottomWrapper();

    const startRaceButton = this.garagePageView.getStartRaceButton().getHTML();
    startRaceButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.startRaceHandler.bind(this),
    );

    const resetRaceButton = this.garagePageView.getResetRaceButton().getHTML();
    resetRaceButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.resetRaceHandler.bind(this),
    );

    raceTrackBottomWrapper.append(this.pagination.getHTML());
    raceTrackTopWrapper.append(
      this.createCarForm.getHTML(),
      this.previewCar.getHTML(),
      this.changeCarForm.getHTML(),
    );
  }
}

export default GaragePageModel;
