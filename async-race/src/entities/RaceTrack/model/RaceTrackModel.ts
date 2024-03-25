import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackView from '../view/RaceTrackView.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import { changeSVGFill } from '../../../utils/createCarImg.ts';
import {
  QUERY_PARAMS,
  QUERY_VALUES,
  STATUS_CODES,
} from '../../../shared/Api/types/enums.ts';

class RaceTrackModel {
  private carData: CarInterface;

  private carAnimation: Animation | null;

  private singletonMediator: MediatorModel<unknown>;

  private raceTrackView: RaceTrackView;

  private raceTrack: HTMLLIElement;

  constructor(carData: CarInterface) {
    this.carData = carData;
    this.carAnimation = null;
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

  private createCarAnimation(duration: number): Animation {
    const raceTrackWidth = this.raceTrack.clientWidth;
    const carWidth = this.raceTrackView.getCarSvg().clientWidth;
    const startEngineButtonWidth = this.raceTrackView
      .getStartEngineButton()
      .getHTML().clientWidth;
    const stopEngineButtonWidth = this.raceTrackView
      .getStopEngineButton()
      .getHTML().clientWidth;
    const carXPosition =
      raceTrackWidth -
      carWidth -
      startEngineButtonWidth -
      stopEngineButtonWidth;
    const startTransition = 'translateX(0)';
    const endTransition = `translateX(${carXPosition}px)`;
    const fill = 'forwards';
    return this.raceTrackView
      .getCarSvgWrapper()
      .animate([{ transform: startTransition }, { transform: endTransition }], {
        duration,
        fill,
      });
  }

  private driveCarEngine(): void {
    if (!this.carData.id) {
      return;
    }

    const driveQueryParams: Map<string, string | number> = new Map();
    driveQueryParams.set(QUERY_PARAMS.ID, this.carData.id);
    driveQueryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.DRIVE);
    ApiModel.driveCarEngine(driveQueryParams)
      .then(() => {})
      .catch((error: Error) => {
        if (Number(error.message) === STATUS_CODES.INTERNAL_SERVER_ERROR) {
          this.carAnimation?.pause();
        }
      });
  }

  private startEngineHandler(): void {
    if (!this.carData.id) {
      return;
    }
    this.raceTrackView.getStartEngineButton().setDisabled();
    this.raceTrackView.getStopEngineButton().setEnabled();
    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STARTED);
    ApiModel.startCarEngine(queryParams)
      .then((data) => {
        if (data) {
          const duration = data.distance / data.velocity;
          this.carAnimation = this.createCarAnimation(duration);
          this.driveCarEngine();
        }
      })
      .catch(() => {});
  }

  private stopEngineHandler(): void {
    this.raceTrackView.getStartEngineButton().setEnabled();
    this.raceTrackView.getStopEngineButton().setDisabled();
    this.carAnimation?.pause();
    if (!this.carData.id) {
      return;
    }
    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STOPPED);
    ApiModel.stopCarEngine(queryParams)
      .then(() => {
        this.carAnimation?.cancel();
      })
      .catch(() => {});
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
          this.raceTrack.remove();

          this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_CAR, '');
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
    const startEngineButton = this.raceTrackView
      .getStartEngineButton()
      .getHTML();
    const stopEngineButton = this.raceTrackView.getStopEngineButton().getHTML();
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

    startEngineButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.startEngineHandler.bind(this),
    );

    stopEngineButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.stopEngineHandler.bind(this),
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        removeCarButton.setEnabled();
      }
    });
  }
}

export default RaceTrackModel;
