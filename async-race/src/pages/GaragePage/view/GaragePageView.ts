import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import GARAGE_PAGE_STYLES from './garagePage.module.scss';

class GaragePageView {
  private parent: HTMLDivElement;

  private garageTitle: HTMLHeadingElement;

  private raceTracksList: HTMLUListElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.garageTitle = this.createGarageTitle();
    this.raceTracksList = this.createRaceTracksList();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getGarageTitle(): HTMLHeadingElement {
    return this.garageTitle;
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

  private createRaceTracksList(): HTMLUListElement {
    this.raceTracksList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_list']],
    });

    return this.raceTracksList;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES.page],
    });

    const garageBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES['garage-page_bottom-wrapper']],
    });

    garageBottomWrapper.append(this.garageTitle, this.raceTracksList);
    this.page.append(garageBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
export default GaragePageView;
