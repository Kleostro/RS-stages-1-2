import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import GARAGE_PAGE_STYLES from './garagePage.module.scss';

class GaragePageView {
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
      cssClasses: [GARAGE_PAGE_STYLES['garage-page']],
    });

    const h1 = createBaseElement({
      tag: TAG_NAMES.H1,
      innerContent: 'Garage',
    });
    h1.style.color = 'white';
    this.page.append(h1);
    this.parent.append(this.page);

    return this.page;
  }
}
export default GaragePageView;
