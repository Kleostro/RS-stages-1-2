import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackView from '../view/RaceTrackView.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import { changeSVGFill } from '../../../utils/createCarImg.ts';
import RACE_TRACK_STYLES from '../view/raceTrack.module.scss';
import {
  QUERY_PARAMS,
  QUERY_VALUES,
  STATUS_CODES,
} from '../../../shared/Api/types/enums.ts';
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';
import { FILL, SINGLE_RACE, TRANSITION_STATE } from '../types/enums.ts';
import type NewWinner from '../types/interfaces.ts';
import Winner from '../../../utils/isWinner.ts';
import type ButtonModel from '../../../shared/Button/model/ButtonModel.ts';

const CONVERSION_FACTOR = 100;
const ROUNDING_FACTOR = 10;

class RaceTrackModel {
  private carData: CarInterface;

  private carAnimation: Animation | null = null;

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private raceTrackView: RaceTrackView;

  private raceTrack: HTMLLIElement;

  private startEngineButton: ButtonModel;

  private stopEngineButton: ButtonModel;

  private removeCarButton: ButtonModel;

  private selectCarButton: ButtonModel;

  constructor(carData: CarInterface) {
    this.carData = carData;
    this.raceTrackView = new RaceTrackView(this.carData);
    this.raceTrack = this.raceTrackView.getHTML();
    this.startEngineButton = this.raceTrackView.getStartEngineButton();
    this.stopEngineButton = this.raceTrackView.getStopEngineButton();
    this.removeCarButton = this.raceTrackView.getRemoveCarButton();
    this.selectCarButton = this.raceTrackView.getSelectCarButton();
    this.setHandlerToButtons();
  }

  public getHTML(): HTMLLIElement {
    return this.raceTrack;
  }

  public getView(): RaceTrackView {
    return this.raceTrackView;
  }

  public async startEngineHandler(mode?: string): Promise<void> {
    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STARTED);
    const loader = new LoaderModel();
    this.startEngineButton.getHTML().append(loader.getHTML());

    await ApiModel.stopCarEngine(queryParams);

    const engineData = await ApiModel.startCarEngine(queryParams);

    if (engineData) {
      loader.getHTML().remove();
      const duration = engineData.distance / engineData.velocity;
      this.carAnimation = this.createCarAnimation(duration);
      await this.driveCarEngine(duration, mode);
    }
  }

  private createCarAnimation(duration: number): Animation {
    const raceTrackWidth = this.raceTrack.clientWidth;
    const carWidth = this.raceTrackView.getCarSvg().clientWidth;

    const carXPosition =
      raceTrackWidth -
      carWidth -
      this.startEngineButton.getHTML().clientWidth -
      this.stopEngineButton.getHTML().clientWidth;

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

  private switchEngineButtons(mode?: string): void {
    this.startEngineButton.setDisabled();
    if (mode) {
      this.stopEngineButton.setEnabled();
    } else {
      this.stopEngineButton.setDisabled();
    }
  }

  private getWinnerData(duration: number): NewWinner {
    const time = Math.ceil(duration / CONVERSION_FACTOR) / ROUNDING_FACTOR;
    return new Winner(this.carData.name, 1, time, this.carData.id);
  }

  private visuallyBrokenCar(): void {
    this.raceTrackView
      .getFireSvg()
      .classList.add(RACE_TRACK_STYLES['race-track__fire-img--active']);
    this.carAnimation?.pause();
  }

  private async driveCarEngine(duration: number, mode?: string): Promise<void> {
    this.switchEngineButtons(mode);
    if (mode) {
      return;
    }

    const engineQueryParams: Map<string, string | number> = new Map();
    engineQueryParams.set(QUERY_PARAMS.ID, this.carData.id);
    engineQueryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.DRIVE);

    try {
      await ApiModel.driveCarEngine(engineQueryParams);
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.NEW_WINNER,
        this.getWinnerData(duration),
      );
    } catch (error) {
      if (
        error instanceof Error &&
        Number(error.message) === STATUS_CODES.INTERNAL_SERVER_ERROR
      ) {
        this.visuallyBrokenCar();
        engineQueryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STOPPED);
        await ApiModel.stopCarEngine(engineQueryParams);
        this.singletonMediator.notify(MEDIATOR_EVENTS.CAR_BROKEN, this.carData);
      }
    }
  }

  public async stopEngineHandler(mode?: string): Promise<void> {
    this.carAnimation?.pause();
    const loader = new LoaderModel();
    this.stopEngineButton.getHTML().append(loader.getHTML());
    const fireSvg = this.raceTrackView.getFireSvg();
    fireSvg.classList.remove(RACE_TRACK_STYLES['race-track__fire-img--active']);
    const queryParams: Map<string, string | number> = new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STOPPED);

    await ApiModel.stopCarEngine(queryParams);

    loader.getHTML().remove();
    this.carAnimation?.cancel();
    if (!mode) {
      this.singletonMediator.notify(MEDIATOR_EVENTS.RESET_CURRENT_CAR, '');
    } else {
      this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_RESET, '');
      this.startEngineButton.setEnabled();
      this.stopEngineButton.setDisabled();
    }
  }

  private async deleteCarHandler(): Promise<void> {
    const loader = new LoaderModel();
    this.removeCarButton.getHTML().append(loader.getHTML());

    await ApiModel.deleteCarById(this.carData.id);

    loader.getHTML().remove();
    const { cars } = StoreModel.getState();
    const carsWithoutDeleted = cars.filter((car) => car.id !== this.carData.id);

    StoreModel.dispatch({
      type: ACTIONS.DELETE_CAR,
      payload: carsWithoutDeleted,
    });

    this.raceTrack.remove();
    this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_CAR, '');

    const winner = await ApiModel.getWinnerById(this.carData.id);

    if (winner && winner.id) {
      await ApiModel.deleteWinnerById(winner.id);
      this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_WINNER, '');
    }
  }

  private updateCarView(): void {
    const carState = StoreModel.getState().cars.find(
      (car) => car.id === this.carData.id,
    );

    const carNameSpan = this.raceTrackView.getNameCarSpan();
    const carSVG = this.raceTrackView.getCarSvg();

    carNameSpan.textContent = carState?.name || this.carData.name;
    changeSVGFill(carSVG, carState?.color || this.carData.color);
  }

  private resetRace(): void {
    this.removeCarButton.setEnabled();
    this.selectCarButton.setEnabled();
    this.stopEngineButton.setDisabled();
    this.startEngineButton.setEnabled();
  }

  private subscribeToMediator(): void {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        this.removeCarButton.setEnabled();
      }
    });

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.EMPTY_RACE,
      this.resetRace.bind(this),
    );
  }

  private setHandlerToButtons(): void {
    this.removeCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.deleteCarHandler().catch(() => {});
    });

    this.selectCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.removeCarButton.setDisabled();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.SELECT_CAR,
        this.carData.id,
      );
    });

    this.startEngineButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.startEngineHandler(SINGLE_RACE).catch(() => {});
      this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_START, '');
    });

    this.stopEngineButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.stopEngineHandler(SINGLE_RACE).catch(() => {});
    });

    this.subscribeToMediator();
  }
}

export default RaceTrackModel;
