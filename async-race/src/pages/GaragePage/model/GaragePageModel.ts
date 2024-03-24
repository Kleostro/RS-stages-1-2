import { QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
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
import PreviewCarModel from '../../../entities/PreviewCar/model/PreviewCarModel.ts';

class GaragePageModel implements PageInterface {
  private parent: HTMLDivElement;

  private singletonMediator: MediatorModel<unknown>;

  private garagePageView: GaragePageView;

  private createCarForm: CreateCarFormModel;

  private previewCar: PreviewCarModel;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.singletonMediator = MediatorModel.getInstance();
    this.garagePageView = new GaragePageView(this.parent);
    this.createCarForm = new CreateCarFormModel();
    this.previewCar = new PreviewCarModel();
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
    ApiModel.getCars(new Map())
      .then((data) => {
        if (data) {
          StoreModel.dispatch({
            type: ACTIONS.GET_CARS,
            payload: data,
          });
          this.drawRaceTracks(data);
          this.drawGarageTitle(data.length);
          this.drawPageInfo();
        }
        return data;
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
    const maxPage = Math.ceil(
      StoreModel.getState().cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT,
    );
    const currentPage = StoreModel.getState().garagePage;
    const textContent = `Page: ${currentPage} / ${maxPage} `;
    pageInfo.textContent = textContent;
  }

  private drawRaceTracks(cars: CarInterface[]): void {
    const currentPage = StoreModel.getState().garagePage - 1;
    const start = currentPage * QUERY_VALUES.DEFAULT_CARS_LIMIT;
    const end = start + QUERY_VALUES.DEFAULT_CARS_LIMIT;
    const currentCars = cars.slice(start, end);
    currentCars.forEach((car) => {
      const raceTrack = new RaceTrackModel(car);
      this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
    });
  }

  private redrawCarsInfo(): void {
    const allCarsCount = StoreModel.getState().cars.length;

    ApiModel.getCarById(allCarsCount)
      .then((newCar) => {
        if (newCar) {
          this.drawRaceTracks([newCar]);
        }
      })
      .catch(() => {});

    this.drawGarageTitle(allCarsCount);
    this.drawPageInfo();
  }

  private init(): void {
    this.hide();
    this.getInitialDataCars();
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.NEW_CAR,
      this.redrawCarsInfo.bind(this),
    );

    this.garagePageView
      .getRaceTrackTopWrapper()
      .append(this.createCarForm.getHTML(), this.previewCar.getHTML());
  }
}

export default GaragePageModel;
