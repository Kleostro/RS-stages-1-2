import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackView from '../view/RaceTrackView.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import { changeSVGFill } from '../../../utils/createCarImg.ts';

class RaceTrackModel {
  private carData: CarInterface;

  private singletonMediator: MediatorModel<unknown>;

  private raceTrackView: RaceTrackView;

  private raceTrack: HTMLLIElement;

  constructor(carData: CarInterface) {
    this.carData = carData;
    this.singletonMediator = MediatorModel.getInstance();
    this.raceTrackView = new RaceTrackView(this.carData);
    this.raceTrack = this.raceTrackView.getHTML();
    this.setHandlerToButtons();
  }

  public getHTML(): HTMLLIElement {
    return this.raceTrack;
  }

  public getView(): RaceTrackView {
    return this.raceTrackView;
  }

  private deleteCarHandler(): void {
    if (this.carData.id) {
      ApiModel.deleteCarById(this.carData.id)
        .then(() => {
          const { cars } = StoreModel.getState();
          const carsWithoutDeleted = cars.filter(
            (car) => car.id !== this.carData.id,
          );
          StoreModel.dispatch({
            type: ACTIONS.DELETE_CAR,
            payload: carsWithoutDeleted,
          });
          this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_CAR, '');
          this.raceTrack.remove();
        })
        .catch(() => {});
    }
  }

  private updateCarView(): void {
    if (!this.carData.id) {
      return;
    }
    const carNameSpan = this.raceTrackView.getNameCarSpan();
    const carSVG = this.raceTrackView.getCarSvg();
    const carState = StoreModel.getState().cars.find(
      (car) => car.id === this.carData.id,
    );
    carNameSpan.textContent = carState?.name || this.carData.name;
    changeSVGFill(carSVG, carState?.color || this.carData.color);
  }

  private setHandlerToButtons(): void {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton().getHTML();
    removeCarButton
      .getHTML()
      .addEventListener(EVENT_NAMES.CLICK, this.deleteCarHandler.bind(this));

    selectCarButton.addEventListener(EVENT_NAMES.CLICK, () => {
      removeCarButton.setDisabled();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.SELECT_CAR,
        this.carData.id,
      );
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        removeCarButton.setEnabled();
      }
    });
  }
}

export default RaceTrackModel;
