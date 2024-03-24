import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import GARAGE_PAGE_STYLES from './garagePage.module.scss';

class GaragePageView {
  private parent: HTMLDivElement;

  private raceTrackTopWrapper: HTMLDivElement;

  private raceTrackBottomWrapper: HTMLDivElement;

  private garageTitle: HTMLHeadingElement;

  private pageInfo: HTMLHeadingElement;

  private moreCarsButton: ButtonModel;

  private raceTracksList: HTMLUListElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.moreCarsButton = this.createMoreCarsButton();
    this.raceTrackTopWrapper = this.createRaceTrackTopWrapper();
    this.garageTitle = this.createGarageTitle();
    this.pageInfo = this.createPageInfo();
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

  public getGarageTitle(): HTMLHeadingElement {
    return this.garageTitle;
  }

  public getPageInfo(): HTMLHeadingElement {
    return this.pageInfo;
  }

  public getRaceTracksList(): HTMLUListElement {
    return this.raceTracksList;
  }

  public getMoreCarsButton(): ButtonModel {
    return this.moreCarsButton;
  }

  private createGarageTitle(): HTMLHeadingElement {
    this.garageTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_title']],
    });
    return this.garageTitle;
  }

  private createPageInfo(): HTMLHeadingElement {
    this.pageInfo = createBaseElement({
      tag: TAG_NAMES.H3,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_info']],
    });

    return this.pageInfo;
  }

  private createRaceTracksList(): HTMLUListElement {
    this.raceTracksList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_list']],
    });

    return this.raceTracksList;
  }

  private createMoreCarsButton(): ButtonModel {
    const buttonText = 'Create 100 cars';
    this.moreCarsButton = new ButtonModel({
      text: buttonText,
      classes: [GARAGE_PAGE_STYLES['garage-page_more-button']],
    });

    return this.moreCarsButton;
  }

  private createRaceTrackTopWrapper(): HTMLDivElement {
    this.raceTrackTopWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_top-wrapper']],
    });

    this.raceTrackTopWrapper.append(this.moreCarsButton.getHTML());
    return this.raceTrackTopWrapper;
  }

  private createRaceTrackBottomWrapper(): HTMLDivElement {
    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_bottom-wrapper']],
    });
    return this.raceTrackBottomWrapper;
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
      this.pageInfo,
      this.raceTracksList,
    );
    this.page.append(this.raceTrackTopWrapper, this.raceTrackBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
export default GaragePageView;
