import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import WINNERS_PAGE_STYLES from './winnersPage.module.scss';

class WinnersPageView {
  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page']],
    });

    const h1 = createBaseElement({
      tag: TAG_NAMES.H1,
      innerContent: 'Winners',
    });
    h1.style.color = 'white';
    this.page.append(h1);
    this.parent.append(this.page);

    return this.page;
  }
}
export default WinnersPageView;
