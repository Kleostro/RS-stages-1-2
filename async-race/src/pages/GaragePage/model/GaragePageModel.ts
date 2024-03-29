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

  private switchVisible(): void {
    this.garagePageView
      .getHTML()
      .classList.toggle(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  private getInitialDataCars(): void {
    const queryParams: Map<string, number> = new Map();
    queryParams.set(QUERY_PARAMS.PAGE, QUERY_VALUES.DEFAULT_PAGE);
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    const loader = new LoaderModel();

    this.garagePageView.getRaceTracksList().append(loader.getHTML());
    ApiModel.getCars(queryParams)
      .then((cars) => {
        if (cars) {
          this.drawRaceTracks(cars);
          loader.getHTML().remove();
        }
      })
      .catch(() => {});

    this.getAllCars();
  }

  private getAllCars(): void {
    const loader = new LoaderModel();
    this.garagePageView.getGarageTitle().append(loader.getHTML());
    ApiModel.getCars(new Map())
      .then((cars) => {
        if (cars) {
          StoreModel.dispatch({
            type: ACTIONS.GET_CARS,
            payload: cars,
          });
          StoreModel.dispatch({
            type: ACTIONS.SET_TOTAL_GARAGE_PAGES,
            payload: Math.ceil(cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT),
          });
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
            '',
          );
          this.drawGarageTitle();
        }
      })
      .catch(() => {});
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
    const loader = new LoaderModel();
    this.garagePageView.getRaceTracksList().append(loader.getHTML());
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
    loader.getHTML().remove();
  }

  private redrawCurrentPage(): void {
    const currentPage = StoreModel.getState().garagePage;
    const queryParams: Map<string, number> = new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    if (this.garagePageView.getRaceTracksList().children.length === 0) {
      const prevPage = currentPage - 1;
      queryParams.set(QUERY_PARAMS.PAGE, prevPage);
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: prevPage,
      });
    } else {
      queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    }

    const loader = new LoaderModel();
    this.garagePageView.getRaceTracksList().append(loader.getHTML());
    ApiModel.getCars(queryParams)
      .then((data) => {
        if (data) {
          this.garagePageView.clearRaceTracksList();
          this.drawRaceTracks(data);
        }
      })
      .catch(() => {});
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
      raceTrack.stopEngineHandler();
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

  private hasWinner(winner: WinnerInterface): void {
    if (winner.wins) {
      const currentWinner = {
        id: winner.id,
        wins: winner.wins + 1,
        time: this.winner.time < winner.time ? this.winner.time : winner.time,
      };

      if (!currentWinner.id) {
        return;
      }

      ApiModel.updateWinnerById(currentWinner.id, currentWinner)
        .then(() => {
          this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, '');
        })
        .catch(() => {});
    } else {
      if (!this.winner.id) {
        return;
      }
      const newWinnerData: WinnerInterface = {
        id: this.winner.id,
        wins: this.winner.wins,
        time: this.winner.time,
      };
      ApiModel.createWinner(newWinnerData)
        .then(() => {
          this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, '');
        })
        .catch(() => {});
    }
  }

  private addNewWinner(): void {
    if (!this.winner.id) {
      return;
    }

    ApiModel.getWinnerById(this.winner.id)
      .then((winner) => {
        if (winner) {
          this.hasWinner(winner);
        }
      })
      .catch(() => {});
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
      this.redrawCurrentPage();
      this.getAllCars();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage();
      this.getAllCars();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.removeButtons.forEach((button) => {
        button.setEnabled();
      });
      this.redrawCurrentPage();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.redrawCurrentPage();
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
        this.addNewWinner();
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
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, () => {
      this.switchVisible();
    });

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
    this.getInitialDataCars();
    this.setSubscribeToMediator();
    this.setSubscribeToMediator2();
    this.switchVisible();

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
