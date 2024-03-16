import StatisticsPageView from '../ui/StatisticsPageView.ts';

class StatisticsPageModel {
  private id: string;

  private page: HTMLDivElement;

  private pageView: StatisticsPageView;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.pageView = new StatisticsPageView(id, parent);
    this.page = this.pageView.getHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }
}

export default StatisticsPageModel;
