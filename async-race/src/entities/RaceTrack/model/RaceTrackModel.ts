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
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';
import { FILL, SINGLE_RACE, TRANSITION_STATE } from '../types/enums.ts';
import type NewWinner from '../types/interfaces.ts';
import Winner from '../../../utils/isWinner.ts';

class RaceTrackModel {
  private carData: CarInterface;

  private carAnimation: Animation | null = null;

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private raceTrackView: RaceTrackView;

  private raceTrack: HTMLLIElement;

  constructor(carData: CarInterface) {
    this.carData = carData;
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

  public async startEngineHandler(mod?: string): Promise<void> {
    if (!this.carData.id) {
      return;
    }

    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STARTED);
    const loader = new LoaderModel();
    this.raceTrackView
      .getStartEngineButton()
      .getHTML()
      .append(loader.getHTML());

    await ApiModel.stopCarEngine(queryParams).catch(() => {});

    await ApiModel.startCarEngine(queryParams)
      .then((data) => {
        if (data) {
          loader.getHTML().remove();
          const duration = data.distance / data.velocity;
          this.carAnimation = this.createCarAnimation(duration);
          this.driveCarEngine(duration, mod);
        }
      })
      .catch(() => {});
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
    const endTransition = `translateX(${carXPosition}px)`;
    return this.raceTrackView
      .getCarSvgWrapper()
      .animate(
        [{ transform: TRANSITION_STATE.START }, { transform: endTransition }],
        {
          duration,
          fill: FILL,
        },
      );
  }

  private switchEngineButtons(mod?: string): void {
    this.raceTrackView.getStartEngineButton().setDisabled();
    this.raceTrackView.getStopEngineButton().setEnabled();
    if (!mod) {
      this.raceTrackView.getStopEngineButton().setDisabled();
    }
  }

  private getWinnerData(duration: number): NewWinner {
    const hundred = 100;
    const ten = 10;
    const time = Math.ceil(duration / hundred) / ten;
    return new Winner(this.carData.name, 1, time, this.carData.id);
  }

  private driveCarEngine(duration: number, mod?: string): void {
    if (!this.carData.id) {
      return;
    }

    const driveQueryParams: Map<string, string | number> = new Map();
    driveQueryParams.set(QUERY_PARAMS.ID, this.carData.id);
    driveQueryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.DRIVE);
    this.switchEngineButtons(mod);
    if (!mod) {
      ApiModel.driveCarEngine(driveQueryParams)
        .then(() => {
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.NEW_WINNER,
            this.getWinnerData(duration),
          );
        })
        .catch((error: Error) => {
          if (
            Number(error.message) === STATUS_CODES.INTERNAL_SERVER_ERROR &&
            this.carData.id
          ) {
            this.carAnimation?.pause();
            ApiModel.stopCarEngine(
              new Map(
                Object.entries({
                  [QUERY_PARAMS.ID]: this.carData.id,
                  [QUERY_PARAMS.STATUS]: QUERY_VALUES.STOPPED,
                }),
              ),
            ).catch(() => {});
            this.singletonMediator.notify(
              MEDIATOR_EVENTS.CAR_BROKEN,
              this.carData,
            );
          }
        });
    }
  }

  public stopEngineHandler(mod?: string): void {
    this.carAnimation?.pause();
    if (!this.carData.id) {
      return;
    }
    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STOPPED);
    const loader = new LoaderModel();
    this.raceTrackView.getStopEngineButton().getHTML().append(loader.getHTML());

    ApiModel.stopCarEngine(queryParams)
      .then(() => {
        loader.getHTML().remove();
        this.carAnimation?.cancel();
        if (!mod) {
          this.singletonMediator.notify(MEDIATOR_EVENTS.RESET_CURRENT_CAR, '');
        } else {
          this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_RESET, '');
          this.raceTrackView.getStartEngineButton().setEnabled();
          this.raceTrackView.getStopEngineButton().setDisabled();
        }
      })
      .catch(() => {});
  }

  private deleteCarHandler(): void {
    if (this.carData.id) {
      const loader = new LoaderModel();
      this.raceTrackView
        .getRemoveCarButton()
        .getHTML()
        .append(loader.getHTML());
      ApiModel.deleteCarById(this.carData.id)
        .then(() => {
          loader.getHTML().remove();
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

  private resetRace(): void {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton();
    const stopEngineButton = this.raceTrackView.getStopEngineButton();
    const startEngineButton = this.raceTrackView.getStartEngineButton();

    removeCarButton.setEnabled();
    selectCarButton.setEnabled();
    stopEngineButton.setDisabled();
    startEngineButton.setEnabled();
  }

  private subscribeToMediator(): void {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        removeCarButton.setEnabled();
      }
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.EMPTY_RACE, () => {
      this.resetRace();
    });
  }

  private setHandlerToButtons(): void {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton();
    const startEngineButton = this.raceTrackView
      .getStartEngineButton()
      .getHTML();
    const stopEngineButton = this.raceTrackView.getStopEngineButton();

    removeCarButton
      .getHTML()
      .addEventListener(EVENT_NAMES.CLICK, this.deleteCarHandler.bind(this));

    selectCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      removeCarButton.setDisabled();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.SELECT_CAR,
        this.carData.id,
      );
    });

    startEngineButton.addEventListener(EVENT_NAMES.CLICK, () => {
      this.startEngineHandler(SINGLE_RACE).catch(() => {});
      this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_START, '');
    });

    stopEngineButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.stopEngineHandler(SINGLE_RACE);
    });

    this.subscribeToMediator();
  }
}

export default RaceTrackModel;
