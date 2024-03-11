import type PageInterface from '../../types/interfaces.ts';
import MainPageView from '../ui/MainPageView.ts';

class MainPageModel implements PageInterface {
  private id: string;

  private pageView: MainPageView;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.pageView = new MainPageView(id, parent);
    this.page = this.pageView.getHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }
}

export default MainPageModel;
