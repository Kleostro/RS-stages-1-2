import LogInPageModel from '../../../pages/logInPage/model/LoginPageModel.ts';
import StorageModel from '../../Storage/model/StorageModel.ts';
import StartPageModel from '../../../pages/startPage/model/StartPageModel.ts';
import RouterModel from '../../Router/model/RouterModel.ts';
import { PAGES_IDS } from '../../../pages/types/enums.ts';
import MainPageModel from '../../../pages/mainPage/model/MainPageModel.ts';
import AppView from '../ui/AppView.ts';
import ChoiceGamePageModel from '../../../pages/choiceGamePage/model/ChoiceGamePageModel.ts';
import StatisticsPageModel from '../../../pages/statisticsPage/model/StatisticsPageModel.ts';

class AppModel {
  private appView: AppView;

  private app: HTMLDivElement;

  private storage: StorageModel;

  private pages: {
    logIn: LogInPageModel;
    start: StartPageModel;
    choiceGame: ChoiceGamePageModel;
    main: MainPageModel;
    statistics: StatisticsPageModel;
  };

  private router: RouterModel;

  constructor() {
    this.appView = new AppView();
    this.app = this.appView.getHTML();
    this.storage = new StorageModel();

    this.pages = {
      logIn: new LogInPageModel(
        PAGES_IDS.LOG_IN,
        this.appView.getHTML(),
        this.storage,
      ),
      start: new StartPageModel(
        PAGES_IDS.START,
        this.appView.getHTML(),
        this.storage,
      ),
      choiceGame: new ChoiceGamePageModel(
        PAGES_IDS.CHOICE_GAME,
        this.appView.getHTML(),
        this.storage,
      ),
      main: new MainPageModel(
        PAGES_IDS.MAIN,
        this.appView.getHTML(),
        this.storage,
      ),
      statistics: new StatisticsPageModel(
        PAGES_IDS.STATISTICS,
        this.appView.getHTML(),
      ),
    };

    this.router = new RouterModel(this.pages);
    this.router.init();
  }

  public getHTML(): HTMLDivElement {
    return this.app;
  }
}

export default AppModel;
