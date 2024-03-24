import { QUERY_PARAMS, QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import GaragePageView from '../view/GaragePageView.ts';
import GARAGE_PAGE_STYLES from '../view/garagePage.module.scss';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import ACTIONS from '../../../shared/actions/types/enums.ts';
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
    ApiModel.getCars(
      new Map(
        Object.entries({
          [QUERY_PARAMS.PAGE]: QUERY_VALUES.DEFAULT_PAGE,
          [QUERY_PARAMS.LIMIT]: QUERY_VALUES.DEFAULT_CARS_LIMIT,
        }),
      ),
    )
      .then((data) => {
        if (data) {
          this.drawRaceTracks(data);
        }
        return data;
      })
      .catch(() => {});

    ApiModel.getCars(new Map())
      .then((cars) => {
        if (cars) {
          StoreModel.dispatch({
            type: ACTIONS.GET_CARS,
            payload: cars,
          });
          this.drawGarageTitle(cars.length);
          this.drawPageInfo();
        }
      })
      .catch(() => {});
  }

  private drawGarageTitle(countCars: number): void {
    const title = this.garagePageView.getGarageTitle();
    const textContent = `Garage (${countCars})`;
    title.textContent = textContent;
  }

  private drawPageInfo(): void {
    const pageInfo = this.garagePageView.getPageInfo();
    ApiModel.getCars(new Map())
      .then((cars) => {
        if (cars) {
          const maxPage = Math.ceil(
            cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT,
          );
          StoreModel.dispatch({
            type: ACTIONS.setTotalGaragePages,
            payload: maxPage,
          });
          const currentPage = StoreModel.getState().garagePage;
          const textContent = `Page: ${currentPage} / ${maxPage} `;
          pageInfo.textContent = textContent;
        }
      })
      .catch(() => {});
  }

  private drawRaceTracks(cars: CarInterface[]): void {
    if (
      this.garagePageView.getRaceTracksList().children.length <
      QUERY_VALUES.DEFAULT_CARS_LIMIT
    ) {
      cars.forEach((car) => {
        const raceTrack = new RaceTrackModel(car);
        this.removeButtons.push(raceTrack.getView().getRemoveCarButton());
        this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
      });
    }
  }

  private redrawCarsInfo(): void {
    const allCarsCount = StoreModel.getState().cars.length;
    this.drawGarageTitle(allCarsCount);
    this.drawPageInfo();
  }

  private moreCarsHandler(): void {
    const carsCount = 100;
    const cars = createRandomDataCars(carsCount);
    cars.forEach((car) => {
      ApiModel.createCar(car)
        .then(() => {
          StoreModel.dispatch({
            type: ACTIONS.GET_CARS,
            payload: [car],
          });
          this.drawRaceTracks([car]);
        })
        .then(() => {
          this.redrawCarsInfo();
        })
        .catch(() => {});
    });
  }

  private drawCurrentPage(): void {
    const currentPage = StoreModel.getState().garagePage;
    const textContent = `Page: ${currentPage} / ${StoreModel.getState().totalPages} `;
    const pageInfo = this.garagePageView.getPageInfo();
    pageInfo.textContent = textContent;

    ApiModel.getCars(
      new Map(
        Object.entries({
          [QUERY_PARAMS.PAGE]: currentPage,
          [QUERY_PARAMS.LIMIT]: QUERY_VALUES.DEFAULT_CARS_LIMIT,
        }),
      ),
    )
      .then((data) => {
        if (data) {
          this.garagePageView.getRaceTracksList().innerHTML = '';
          this.drawRaceTracks(data);
        }
        return data;
      })
      .catch(() => {});
  }

  private init(): void {
    this.hide();
    this.getInitialDataCars();
    const moreCarsButton = this.garagePageView.getMoreCarsButton().getHTML();
    moreCarsButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.moreCarsHandler.bind(this),
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.NEW_CAR, () => {
      const allCars = StoreModel.getState().cars;
      const newCar = [allCars[allCars.length - 1]];
      this.redrawCarsInfo();
      this.drawRaceTracks(newCar);
    });

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_CAR,
      this.redrawCarsInfo.bind(this),
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.removeButtons.forEach((button) => {
        button.setEnabled();
      });
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.drawCurrentPage();
    });

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
