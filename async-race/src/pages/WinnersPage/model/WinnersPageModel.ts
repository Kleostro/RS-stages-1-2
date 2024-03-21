import type PageInterface from '../../types/interfaces.ts';
import WinnersPageView from '../view/WinnersPageView.ts';
import WINNERS_PAGE_STYLES from '../view/winnersPage.module.scss';

class WinnersPageModel implements PageInterface {
  private parent: HTMLDivElement;

  private winnersPageView: WinnersPageView;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.winnersPageView = new WinnersPageView(this.parent);
    this.page = this.winnersPageView.getHTML();
    this.hide();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public hide(): void {
    this.getHTML().classList.add(WINNERS_PAGE_STYLES['winners-page--hidden']);
  }

  public show(): void {
    this.getHTML().classList.remove(
      WINNERS_PAGE_STYLES['winners-page--hidden'],
    );
  }
}

export default WinnersPageModel;
