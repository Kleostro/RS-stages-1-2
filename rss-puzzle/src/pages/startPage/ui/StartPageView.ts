import createBaseElement from '../../../utils/createBaseElement.ts';
import ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import styles from './style.module.scss';
import { PAGES_STATE } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import BUTTONS_TEXT_CONTENT from '../types/enums.ts';

class StartPageView {
  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  private title: HTMLHeadingElement;

  private subtitle: HTMLHeadingElement;

  private descr: HTMLDivElement;

  private startBtn: ButtonModel;

  private choiceGameBtn: ButtonModel;

  private logOutBtn: ButtonModel;

  constructor(id: string, parent: HTMLDivElement) {
    this.title = this.createTitle();
    this.subtitle = this.createSubtitle();
    this.descr = this.createDescr();
    this.startBtn = this.createStartBtn();
    this.choiceGameBtn = this.createChoiceGameBtn();
    this.logOutBtn = this.createLogOutBtn();
    this.parent = parent;
    this.page = this.createHTML(id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getSubTitle(): HTMLHeadingElement {
    return this.subtitle;
  }

  public getLogOutBtn(): ButtonModel {
    return this.logOutBtn;
  }

  public getStartBtn(): ButtonModel {
    return this.startBtn;
  }

  public getChoiceGameBtn(): ButtonModel {
    return this.choiceGameBtn;
  }

  private createTitle(): HTMLHeadingElement {
    const titleTextContent = 'RSS Puzzle';
    this.title = createBaseElement({
      tag: TAG_NAMES.h1,
      cssClasses: [styles.page__title],
      innerContent: titleTextContent,
    });
    return this.title;
  }

  private createSubtitle(): HTMLHeadingElement {
    this.subtitle = createBaseElement({
      tag: TAG_NAMES.h2,
      cssClasses: [styles.page__subtitle],
    });
    return this.subtitle;
  }

  private createDescr(): HTMLParagraphElement {
    const descrTextContent =
      'Embark on a wonderful journey of learning English by assembling jigsaw puzzles of paintings by great artists';
    this.descr = createBaseElement({
      tag: TAG_NAMES.p,
      cssClasses: [styles.page__descr],
      innerContent: descrTextContent,
    });
    return this.descr;
  }

  private createStartBtn(): ButtonModel {
    this.startBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.startBtn, [
      styles.page__btn,
      'btn-reset',
    ]);
    return this.startBtn;
  }

  private createChoiceGameBtn(): ButtonModel {
    this.choiceGameBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.choiceGameBtn, [
      styles.page__btn,
      'btn-reset',
    ]);
    return this.choiceGameBtn;
  }

  private createLogOutBtn(): ButtonModel {
    this.logOutBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.logOutBtn, [
      styles.page__btn,
      'btn-reset',
    ]);

    return this.logOutBtn;
  }

  private createHTML(id: string): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.page.style.display = PAGES_STATE.HIDDEN;

    const btnsWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page__btns],
    });
    btnsWrapper.append(
      this.startBtn.getHTML(),
      this.choiceGameBtn.getHTML(),
      this.logOutBtn.getHTML(),
    );

    this.page.append(this.title, this.subtitle, this.descr, btnsWrapper);

    this.parent.append(this.page);
    return this.page;
  }
}

export default StartPageView;
