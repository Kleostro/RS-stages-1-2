/* eslint-disable class-methods-use-this */
import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import { PAGES_STATE } from '../types/enums.ts';
import type PageInterface from '../types/interfaces.ts';
import PlaygroundComponent from '../../widgets/playground/Playground.ts';
import type {
  levelInfo,
  wordsInfo,
} from '../../shared/api/types/interfaces.ts';
import type Api from '../../shared/api/Api.ts';
import API_URLS from '../../shared/api/types/constants.ts';

class MainPage implements PageInterface {
  public id: string;

  public storage: StorageComponent;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  private api: Api;

  private playground: PlaygroundComponent;

  constructor(
    id: string,
    parent: HTMLDivElement,
    storage: StorageComponent,
    api: Api,
  ) {
    this.id = id;
    this.parent = parent;
    this.storage = storage;
    this.api = api;
    this.playground = this.createPlayground(1, 0);
    this.page = this.createHTML(this.id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  private getWords(data: levelInfo, round: number): string[][] {
    const words: string[][] = [];
    const currentWords = data.rounds[round].words;

    currentWords.forEach((word: wordsInfo) => {
      words.push(word.textExample.split(' '));
    });
    return words;
  }

  private createPlayground(
    currentLvl: number,
    currentRound: number,
  ): PlaygroundComponent {
    const url = `${API_URLS.levelData}${currentLvl}.json`;

    this.api
      .getData(url)
      .then((data) => {
        const words = this.getWords(data, currentRound);
        this.playground = new PlaygroundComponent(words);
        this.page.append(this.playground.getHTML());
        return words;
      })
      .catch(() => {});

    return this.playground;
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: 'div',
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}

export default MainPage;
