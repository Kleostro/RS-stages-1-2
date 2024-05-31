import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import TEXT_CONTENT_BUTTONS from '../types/enums.ts';
import PAGINATION_STYLES from './pagination.module.scss';

class PaginationView {
  private paginationWrapper: HTMLDivElement;

  private currentPageSpan: HTMLSpanElement;

  private prevButton: ButtonModel;

  private nextButton: ButtonModel;

  constructor() {
    this.currentPageSpan = this.createCurrentPageSpan();
    this.prevButton = this.createPrevButton();
    this.nextButton = this.createNextButton();
    this.paginationWrapper = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.paginationWrapper;
  }

  public getCurrentPageSpan(): HTMLSpanElement {
    return this.currentPageSpan;
  }

  public getPrevButton(): ButtonModel {
    return this.prevButton;
  }

  public getNextButton(): ButtonModel {
    return this.nextButton;
  }

  private createCurrentPageSpan(): HTMLSpanElement {
    this.currentPageSpan = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [PAGINATION_STYLES.pagination_current_page],
    });
    return this.currentPageSpan;
  }

  private createPrevButton(): ButtonModel {
    this.prevButton = new ButtonModel({
      text: TEXT_CONTENT_BUTTONS.PREV,
      classes: [PAGINATION_STYLES.pagination_button],
    });

    this.prevButton.setDisabled();
    return this.prevButton;
  }

  private createNextButton(): ButtonModel {
    this.nextButton = new ButtonModel({
      text: TEXT_CONTENT_BUTTONS.NEXT,
      classes: [PAGINATION_STYLES.pagination_button],
    });

    return this.nextButton;
  }

  private createHTML(): HTMLDivElement {
    this.paginationWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [PAGINATION_STYLES.pagination_wrapper],
    });

    this.paginationWrapper.append(
      this.currentPageSpan,
      this.prevButton.getHTML(),
      this.nextButton.getHTML(),
    );
    return this.paginationWrapper;
  }
}

export default PaginationView;
