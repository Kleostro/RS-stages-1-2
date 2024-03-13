import createBaseElement from '../../../utils/createBaseElement.ts';
import PlaygroundModel from '../../../widgets/playground/model/PlaygroundModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import styles from './style.module.scss';
import { PAGES_STATE } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import GameSettingsModel from '../../../features/gameSettings/model/GameSettingsModel.ts';

class MainPageView implements PageInterface {
  private id: string;

  private parent: HTMLDivElement;

  private playground: PlaygroundModel;

  private gameSettingsModel: GameSettingsModel;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.parent = parent;
    this.playground = new PlaygroundModel();
    this.gameSettingsModel = new GameSettingsModel();
    this.page = this.createHTML(this.id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page],
      attributes: { id },
    });

    const wrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_wrapper],
    });
    this.page.append(wrapper);
    wrapper.append(this.playground.getHTML(), this.gameSettingsModel.getHTML());

    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}

export default MainPageView;
