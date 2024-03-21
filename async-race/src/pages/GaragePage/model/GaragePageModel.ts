import type PageInterface from '../../types/interfaces.ts';
import GaragePageView from '../view/GaragePageView.ts';
import GARAGE_PAGE_STYLES from '../view/garagePage.module.scss';

class GaragePageModel implements PageInterface {
  private parent: HTMLDivElement;

  private garagePageView: GaragePageView;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.garagePageView = new GaragePageView(this.parent);
    this.page = this.garagePageView.getHTML();
    this.hide();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public hide(): void {
    this.page.classList.add(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }

  public show(): void {
    this.page.classList.remove(GARAGE_PAGE_STYLES['garage-page--hidden']);
  }
}

export default GaragePageModel;
