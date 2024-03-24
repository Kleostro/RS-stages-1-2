import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackView from '../view/RaceTrackView.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';

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

  private setHandlerToButtons(): void {
    const removeCarButton = this.raceTrackView.getRemoveCarButton().getHTML();
    removeCarButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.deleteCarHandler.bind(this),
    );
  }
}

export default RaceTrackModel;
