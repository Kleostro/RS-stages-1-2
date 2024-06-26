import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import RACE_TRACK_STYLES from './raceTrack.module.scss';
import RACE_TRACK_BUTTON_TEXT, {
  RACE_TRACK_SVG_DETAILS,
} from '../types/enums.ts';
import { changeSVGFill, createSVGUse } from '../../../utils/createCarImg.ts';

class RaceTrackView {
  private carData: CarInterface;

  private selectCarButton: ButtonModel;

  private removeCarButton: ButtonModel;

  private nameCarSpan: HTMLSpanElement;

  private startEngineButton: ButtonModel;

  private stopEngineButton: ButtonModel;

  private carSVG: SVGSVGElement;

  private fireSVG: SVGSVGElement;

  private carSVGWrapper: HTMLDivElement;

  private raceTrack: HTMLLIElement;

  constructor(carData: CarInterface) {
    this.carData = carData;
    this.selectCarButton = this.createSelectCarButton();
    this.removeCarButton = this.createRemoveCarButton();
    this.nameCarSpan = this.createNameCarSpan();
    this.startEngineButton = this.createStartEngineButton();
    this.stopEngineButton = this.createStopEngineButton();
    this.carSVG = this.createCarSVG();
    this.fireSVG = this.createFireSVG();
    this.carSVGWrapper = this.createCarSVGWrapper();
    this.raceTrack = this.createHTML();
  }

  public getHTML(): HTMLLIElement {
    return this.raceTrack;
  }

  public getSelectCarButton(): ButtonModel {
    return this.selectCarButton;
  }

  public getRemoveCarButton(): ButtonModel {
    return this.removeCarButton;
  }

  public getStartEngineButton(): ButtonModel {
    return this.startEngineButton;
  }

  public getStopEngineButton(): ButtonModel {
    return this.stopEngineButton;
  }

  public getNameCarSpan(): HTMLSpanElement {
    return this.nameCarSpan;
  }

  public getCarSvgWrapper(): HTMLDivElement {
    return this.carSVGWrapper;
  }

  public getCarSvg(): SVGSVGElement {
    return this.carSVG;
  }

  public getFireSvg(): SVGSVGElement {
    return this.fireSVG;
  }

  private createSelectCarButton(): ButtonModel {
    this.selectCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.SELECT_CAR,
      classes: [RACE_TRACK_STYLES['race-track_car-button']],
    });

    return this.selectCarButton;
  }

  private createRemoveCarButton(): ButtonModel {
    this.removeCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.REMOVE_CAR,
      classes: [RACE_TRACK_STYLES['race-track_car-button']],
    });

    return this.removeCarButton;
  }

  private createNameCarSpan(): HTMLSpanElement {
    this.nameCarSpan = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [RACE_TRACK_STYLES['race-track__name-car']],
      innerContent: this.carData.name,
    });

    return this.nameCarSpan;
  }

  private createStartEngineButton(): ButtonModel {
    this.startEngineButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.START_ENGINE,
      classes: [RACE_TRACK_STYLES['race-track_engine-button']],
    });

    return this.startEngineButton;
  }

  private createStopEngineButton(): ButtonModel {
    this.stopEngineButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.STOP_ENGINE,
      classes: [RACE_TRACK_STYLES['race-track_engine-button']],
    });
    this.stopEngineButton.setDisabled();

    return this.stopEngineButton;
  }

  private createFireSVG(): SVGSVGElement {
    this.fireSVG = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );
    this.fireSVG.classList.add(RACE_TRACK_STYLES['race-track__fire-img']);
    this.fireSVG.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.FIRE_ID));
    return this.fireSVG;
  }

  private createCarSVG(): SVGSVGElement {
    this.carSVG = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );
    this.carSVG.classList.add(RACE_TRACK_STYLES['race-track__car-img']);
    this.carSVG.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.CAR_ID));
    changeSVGFill(this.carSVG, this.carData.color);
    return this.carSVG;
  }

  private createCarSVGWrapper(): HTMLDivElement {
    this.carSVGWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES['race-track__car-svg-wrapper']],
    });

    this.carSVGWrapper.append(this.carSVG, this.fireSVG);
    return this.carSVGWrapper;
  }

  private createHTML(): HTMLLIElement {
    this.raceTrack = createBaseElement({
      tag: TAG_NAMES.LI,
      cssClasses: [RACE_TRACK_STYLES['race-track']],
    });

    const topRaceTrackWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES['race-track__top-wrapper']],
    });

    topRaceTrackWrapper.append(
      this.selectCarButton.getHTML(),
      this.removeCarButton.getHTML(),
      this.nameCarSpan,
    );

    const bottomRaceTrackWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES['race-track__bottom-wrapper']],
    });

    const raceFlag = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );
    raceFlag.classList.add(RACE_TRACK_STYLES['race-track__flag-img']);
    raceFlag.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.FLAG_ID));

    bottomRaceTrackWrapper.append(
      this.startEngineButton.getHTML(),
      this.stopEngineButton.getHTML(),
      this.carSVGWrapper,
      raceFlag,
    );

    this.raceTrack.append(topRaceTrackWrapper, bottomRaceTrackWrapper);

    return this.raceTrack;
  }
}

export default RaceTrackView;
