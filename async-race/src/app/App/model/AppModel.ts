import AppView from '../view/AppView.ts';

class AppModel {
  private appView: AppView;

  private app: HTMLDivElement;

  constructor() {
    this.appView = new AppView();
    this.app = this.appView.getHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.app;
  }
}

export default AppModel;
