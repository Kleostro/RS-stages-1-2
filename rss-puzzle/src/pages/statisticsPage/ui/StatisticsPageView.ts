import { PAGES_STATE } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';

class StatisticsPageView {
  private id: string;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.parent = parent;
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
      cssClasses: [styles.statistics_wrapper],
    });
    this.page.append(wrapper);

    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}

export default StatisticsPageView;
