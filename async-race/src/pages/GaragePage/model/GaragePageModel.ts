import { QUERY_PARAMS, QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import GaragePageView from '../view/GaragePageView.ts';
import GARAGE_PAGE_STYLES from '../view/garagePage.module.scss';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
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

class GaragePageModel implements PageInterface {
  private parent: HTMLDivElement;

  private singletonMediator: MediatorModel<unknown>;

  private garagePageView: GaragePageView;

  private createCarForm: CreateCarFormModel;

  private removeButtons: ButtonModel[] = [];

  private changeCarForm: ChangeCarFormModel;

  private previewCar: PreviewCarModel;

  private pagination: PaginationModel;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.singletonMediator = MediatorModel.getInstance();
    this.garagePageView = new GaragePageView(this.parent);
    this.createCarForm = new CreateCarFormModel();
    this.changeCarForm = new ChangeCarFormModel();
    this.previewCar = new PreviewCarModel();
    this.pagination = new PaginationModel();
    this.page = this.garagePageView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public hide(): void {
    this.page.classList.add(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  public show(): void {
    this.page.classList.remove(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  private getInitialDataCars(): void {
    const queryParams: Map<string, number> = new Map();
    queryParams.set(QUERY_PARAMS.PAGE, QUERY_VALUES.DEFAULT_PAGE);
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    ApiModel.getCars(queryParams)
      .then((cars) => {
        if (cars) {
          this.drawRaceTracks(cars);
        }
      })
      .catch(() => {});

    this.getAllCars();
  }

  private getAllCars(): void {
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
    const countCarsToList =
      this.garagePageView.getRaceTracksList().children.length;

    if (countCarsToList < QUERY_VALUES.DEFAULT_CARS_LIMIT) {
      cars.forEach((car) => {
        const raceTrack = new RaceTrackModel(car);
        this.removeButtons.push(raceTrack.getView().getRemoveCarButton());
        this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
      });
    }
  }

  private moreCarsHandler(): void {
    const carsCount = 100;
    const cars = createRandomDataCars(carsCount);
    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: cars,
    });
    cars.forEach((car) => {
      ApiModel.createCar(car)
        .then(() => {
          this.drawRaceTracks([car]);
          this.singletonMediator.notify(MEDIATOR_EVENTS.CREATE_MORE_CARS, '');
        })
        .catch(() => {});
    });
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

    ApiModel.getCars(new Map(queryParams))
      .then((data) => {
        if (data) {
          this.garagePageView.clearRaceTracksList();
          this.drawRaceTracks(data);
        }
        return data;
      })
      .catch(() => {});
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
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.redrawCurrentPage();
    });
  }

  private init(): void {
    this.hide();
    this.getInitialDataCars();
    this.setSubscribeToMediator();

    const moreCarsButton = this.garagePageView.getMoreCarsButton().getHTML();
    moreCarsButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.moreCarsHandler.bind(this),
    );

    const raceTrackTopWrapper = this.garagePageView.getRaceTrackTopWrapper();
    const raceTrackBottomWrapper =
      this.garagePageView.getRaceTrackBottomWrapper();

    raceTrackBottomWrapper.append(this.pagination.getHTML());
    raceTrackTopWrapper.append(
      this.createCarForm.getHTML(),
      this.previewCar.getHTML(),
      this.changeCarForm.getHTML(),
    );
  }
}

export default GaragePageModel;
