import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import GARAGE_PAGE_STYLES from './garagePage.module.scss';

class GaragePageView {
  private parent: HTMLDivElement;

  private raceTrackTopWrapper: HTMLDivElement;

  private garageTitle: HTMLHeadingElement;

  private pageInfo: HTMLHeadingElement;

  private raceTracksList: HTMLUListElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.raceTrackTopWrapper = this.createRaceTrackTopWrapper();
    this.garageTitle = this.createGarageTitle();
    this.pageInfo = this.createPageInfo();
    this.raceTracksList = this.createRaceTracksList();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getRaceTrackTopWrapper(): HTMLDivElement {
    return this.raceTrackTopWrapper;
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

  private createRaceTrackTopWrapper(): HTMLDivElement {
    this.raceTrackTopWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_top-wrapper']],
    });

    return this.raceTrackTopWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page']],
    });

    const garageBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_bottom-wrapper']],
    });

    garageBottomWrapper.append(
      this.garageTitle,
      this.pageInfo,
      this.raceTracksList,
    );
    this.page.append(this.raceTrackTopWrapper, garageBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
export default GaragePageView;
