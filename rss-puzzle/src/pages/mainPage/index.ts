/* eslint-disable class-methods-use-this */
import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';
import { PAGES_STATE } from '../types/enums.ts';
import type PageInterface from '../types/interfaces.ts';
import PlaygroundComponent from '../../widgets/playground/Playground.ts';
import type Api from '../../shared/api/Api.ts';

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
    this.playground = new PlaygroundComponent(this.api);
    this.page = this.createHTML(this.id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: 'div',
      cssClasses: [styles.page],
      attributes: { id },
    });

    const wrapper = createBaseElement({
      tag: 'div',
      cssClasses: [styles.game_wrapper],
    });
    this.page.append(wrapper);
    wrapper.append(this.playground.getHTML());

    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}

export default MainPage;
