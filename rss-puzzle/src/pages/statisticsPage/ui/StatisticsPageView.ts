import { PAGES_STATE } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import { BUTTONS_TEXT_CONTENT } from '../../../widgets/playground/types/constants.ts';
import BUTTON_STATE from '../../../shared/button/types/enums.ts';
import type { lineInfo } from '../../../widgets/playground/types/interfaces.ts';
import setListenersLineBtn from '../../../utils/addListenersAudioBnt.ts';

class StatisticsPageView {
  private id: string;

  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  private nextRoundBtn: ButtonModel;

  private roundInfoWrapper: HTMLDivElement;

  private knowList: HTMLUListElement;

  private dontKnowList: HTMLUListElement;

  private liArr: HTMLLIElement[] = [];

  constructor(id: string, parent: HTMLDivElement) {
    this.id = id;
    this.parent = parent;
    this.nextRoundBtn = this.createNextRoundBtn();
    this.knowList = this.createKnowList();
    this.dontKnowList = this.createDontKnowList();
    this.roundInfoWrapper = this.createRoundInfoWrapper();
    this.page = this.createHTML(this.id);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getID(): string {
    return this.id;
  }

  public getNextRoundBtn(): ButtonModel {
    return this.nextRoundBtn;
  }

  public getKnowList(): HTMLUListElement {
    return this.knowList;
  }

  public getDontKnowList(): HTMLUListElement {
    return this.dontKnowList;
  }

  public createListItem(
    value: lineInfo,
    listItemStyle: string,
    textItemStyle: string,
  ): HTMLLIElement {
    const li = createBaseElement({
      tag: TAG_NAMES.li,
      cssClasses: [listItemStyle],
    });
    const btn = new ButtonModel('', [`${listItemStyle}_btn`]);
    const audio = new Audio(value.audioCurrentLineSrc);
    const text = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [textItemStyle],
      innerContent: `${value.sentenceCurrentLine}`,
    });
    const btnHTML = btn.getHTML();
    setListenersLineBtn(btnHTML, audio);
    btnHTML.append(audio);
    li.append(btnHTML, text);
    this.liArr.push(li);
    return li;
  }

  private createRoundInfoWrapper(): HTMLDivElement {
    this.roundInfoWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.round_info_wrapper],
    });
    return this.roundInfoWrapper;
  }

  private createNextRoundBtn(): ButtonModel {
    this.nextRoundBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.continueBtn,
      [styles.nextRound_btn],
      { disabled: `${BUTTON_STATE.DISABLED}` },
    );

    return this.nextRoundBtn;
  }

  private createKnowList(): HTMLUListElement {
    this.knowList = createBaseElement({
      tag: TAG_NAMES.ul,
      cssClasses: [styles.know_list],
    });
    return this.knowList;
  }

  private createDontKnowList(): HTMLUListElement {
    this.dontKnowList = createBaseElement({
      tag: TAG_NAMES.ul,
      cssClasses: [styles.dont_know_list],
    });
    return this.dontKnowList;
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

    this.roundInfoWrapper.append(
      this.knowList,
      this.dontKnowList,
      this.nextRoundBtn.getHTML(),
    );
    wrapper.append(this.roundInfoWrapper);
    this.page.append(wrapper);

    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}

export default StatisticsPageView;
