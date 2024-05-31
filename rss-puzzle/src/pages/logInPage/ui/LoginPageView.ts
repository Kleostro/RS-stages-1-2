import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import { PAGES_STATE } from '../../types/enums.ts';
import type PageInterface from '../../types/interfaces.ts';

class LoginPageView implements PageInterface {
  private id: string;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.parent = parent;
    this.page = this.createHTML(this.id);
    this.hidden();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  private hidden = (): void => {
    this.page.style.display = PAGES_STATE.HIDDEN;
  };

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.page.style.display = PAGES_STATE.HIDDEN;

    this.parent.append(this.page);
    return this.page;
  }
}

export default LoginPageView;
