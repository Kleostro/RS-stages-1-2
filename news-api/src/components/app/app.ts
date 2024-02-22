import * as Utilities from '@/utilities';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { ResponseNewsInterface, ResponseSourcesInterface } from '@/types';

class App {
  private controller: AppController;
  private view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesElement = Utilities.safeQuerySelector('.sources');
    sourcesElement.addEventListener('click', (e) => {
      this.controller.getNews(e, (data: ResponseNewsInterface) => this.view.drawNews(data));
    });

    this.controller.getSources((data: ResponseSourcesInterface): void => {
      this.view.drawSources(data);
    });
  }
}

export default App;
