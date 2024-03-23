import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import GaragePageView from '../view/GaragePageView.ts';
import GARAGE_PAGE_STYLES from '../view/garagePage.module.scss';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import ACTIONS from '../../../shared/actions/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackModel from '../../../entities/RaceTrack/model/RaceTrackModel.ts';

class GaragePageModel implements PageInterface {
  private parent: HTMLDivElement;

  private garagePageView: GaragePageView;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.garagePageView = new GaragePageView(this.parent);
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
            type: ACTIONS.GET_CURRENT_CARS,
            payload: data,
          });
          this.drawRaceTracks(data);
          this.drawGarageTitle();
        }
        return data;
      })
      .catch(() => {});
  }

  private drawGarageTitle(): void {
    const title = this.garagePageView.getGarageTitle();
    const textContent = `Garage (${StoreModel.getState().currentCars.length})`;
    title.textContent = textContent;
  }

  private drawRaceTracks(cars: CarInterface[]): void {
    cars.forEach((car) => {
      const raceTrack = new RaceTrackModel(car);
      this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
    });
  }

  private init(): void {
    this.hide();
    this.getInitialDataCars();
  }
}

export default GaragePageModel;
