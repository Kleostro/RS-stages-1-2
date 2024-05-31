import { GARAGE_BUTTONS_TEXT } from '../../types/enums.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import GARAGE_PAGE_STYLES from './garagePage.module.scss';

class GaragePageView {
  private parent: HTMLDivElement;

  private raceTrackTopWrapper: HTMLDivElement;

  private raceTrackBottomWrapper: HTMLDivElement;

  private garageTitle: HTMLHeadingElement;

  private moreCarsButton: ButtonModel;

  private raceTracksList: HTMLUListElement;

  private startRaceButton: ButtonModel;

  private resetRaceButton: ButtonModel;

  private raceResult: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.moreCarsButton = this.createMoreCarsButton();
    this.startRaceButton = this.createStartRaceButton();
    this.resetRaceButton = this.createResetRaceButton();
    this.raceTrackTopWrapper = this.createRaceTrackTopWrapper();
    this.garageTitle = this.createGarageTitle();
    this.raceResult = this.createRaceResult();
    this.raceTracksList = this.createRaceTracksList();
    this.raceTrackBottomWrapper = this.createRaceTrackBottomWrapper();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getRaceTrackTopWrapper(): HTMLDivElement {
    return this.raceTrackTopWrapper;
  }

  public getRaceTrackBottomWrapper(): HTMLDivElement {
    return this.raceTrackBottomWrapper;
  }

  public clearRaceTracksList(): void {
    this.raceTracksList.innerHTML = '';
  }

  public getGarageTitle(): HTMLHeadingElement {
    return this.garageTitle;
  }

  public getRaceTracksList(): HTMLUListElement {
    return this.raceTracksList;
  }

  public getMoreCarsButton(): ButtonModel {
    return this.moreCarsButton;
  }

  public getStartRaceButton(): ButtonModel {
    return this.startRaceButton;
  }

  public getResetRaceButton(): ButtonModel {
    return this.resetRaceButton;
  }

  public getRaceResult(): HTMLDivElement {
    return this.raceResult;
  }

  private createGarageTitle(): HTMLHeadingElement {
    this.garageTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_title']],
    });
    return this.garageTitle;
  }

  private createRaceTracksList(): HTMLUListElement {
    this.raceTracksList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_list']],
    });

    return this.raceTracksList;
  }

  private createMoreCarsButton(): ButtonModel {
    this.moreCarsButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.CREATE_MORE_CARS,
      classes: [GARAGE_PAGE_STYLES['garage-page_more-button']],
    });

    return this.moreCarsButton;
  }

  private createRaceTrackTopWrapper(): HTMLDivElement {
    this.raceTrackTopWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_top-wrapper']],
    });

    this.raceTrackTopWrapper.append(
      this.moreCarsButton.getHTML(),
      this.startRaceButton.getHTML(),
      this.resetRaceButton.getHTML(),
    );
    return this.raceTrackTopWrapper;
  }

  private createRaceTrackBottomWrapper(): HTMLDivElement {
    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_bottom-wrapper']],
    });
    return this.raceTrackBottomWrapper;
  }

  private createStartRaceButton(): ButtonModel {
    this.startRaceButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.START_RACE,
      classes: [
        GARAGE_PAGE_STYLES['garage-page_race-button'],
        GARAGE_PAGE_STYLES['garage-page_race-button_start'],
      ],
    });

    return this.startRaceButton;
  }

  private createResetRaceButton(): ButtonModel {
    this.resetRaceButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.RESET_RACE,
      classes: [
        GARAGE_PAGE_STYLES['garage-page_race-button'],
        GARAGE_PAGE_STYLES['garage-page_race-button_reset'],
      ],
    });

    return this.resetRaceButton;
  }

  private createRaceResult(): HTMLDivElement {
    this.raceResult = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_race-result']],
    });

    return this.raceResult;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page']],
    });

    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_bottom-wrapper']],
    });

    this.raceTrackBottomWrapper.append(
      this.garageTitle,
      this.raceTracksList,
      this.raceResult,
    );
    this.page.append(this.raceTrackTopWrapper, this.raceTrackBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
export default GaragePageView;
