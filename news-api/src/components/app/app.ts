import * as Utilities from '@/utilities';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { ResponseSourcesInterface } from '@/types/interfaces';

class App {
  private controller: AppController;
  private view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    try {
      const sourcesElement = Utilities.safeQuerySelector('.sources');
      sourcesElement.addEventListener('click', (e) => {
        this.controller.getNews(e, (data: ResponseSourcesInterface) => this.view.drawNews(data));
      });
    } catch (error) {
      console.error(error);
    }

    this.controller.getSources((data: ResponseSourcesInterface): void => {
      this.view.drawSources(data);
    });
  }
}

export default App;
