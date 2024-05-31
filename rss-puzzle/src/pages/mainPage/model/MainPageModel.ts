import PlaygroundModel from '../../../widgets/playground/model/PlaygroundModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import MainPageView from '../ui/MainPageView.ts';
import GameSettingsModel from '../../../features/gameSettings/model/GameSettingsModel.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';

class MainPageModel implements PageInterface {
  private id: string;

  private storage: StorageModel;

  private pageView: MainPageView;

  private page: HTMLDivElement;

  private playgroundModel: PlaygroundModel;

  private gameSettingsModel: GameSettingsModel;

  constructor(id: string, parent: HTMLDivElement, storage: StorageModel) {
    this.id = id;
    this.storage = storage;
    this.playgroundModel = new PlaygroundModel(this.storage);
    this.gameSettingsModel = new GameSettingsModel(this.storage);
    this.pageView = new MainPageView(
      id,
      parent,
      this.playgroundModel.getView(),
      this.gameSettingsModel.getView(),
    );
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
