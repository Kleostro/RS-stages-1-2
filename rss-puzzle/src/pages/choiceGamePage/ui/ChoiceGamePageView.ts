import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import { PAGES_STATE } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import type { levelInfo } from '../../../shared/api/types/interfaces.ts';
import ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import { BTN_OPTIONS, DESCRIPTIONS } from '../types/enums.ts';

class ChoiceGamePageView {
  private id: string;

  private parent: HTMLDivElement;

  private gameData: levelInfo[];

  private pageWrapper: HTMLDivElement | null;

  private roundBtns: ButtonModel[];

  private descriptionsHTML: HTMLDivElement[] = [];

  private BTNS_OPTIONS: typeof BTN_OPTIONS;

  constructor(id: string, parent: HTMLDivElement, gameData: levelInfo[]) {
    this.id = id;
    this.parent = parent;
    this.gameData = gameData;
    this.roundBtns = [];
    this.pageWrapper = null;
    this.BTNS_OPTIONS = BTN_OPTIONS;
  }

  public getRoundBtns(): ButtonModel[] {
    return this.roundBtns;
  }

  public getID(): string {
    return this.id;
  }

  private updateDisplacement(): void {
    this.BTNS_OPTIONS.displacement +=
      this.BTNS_OPTIONS.offset * this.BTNS_OPTIONS.direction;
  }

  private addStylesForBtn(
    currentID: number,
    btn: ButtonModel,
    LVLRoundsLength: number,
  ): void {
    if (currentID !== LVLRoundsLength) {
      this.updateDisplacement();
    }

    if (currentID % this.BTNS_OPTIONS.maxDisplacementElements === 0) {
      this.BTNS_OPTIONS.direction *= -1;
    }

    const btnHTML = btn.getHTML();
    const transform = `translateX(${this.BTNS_OPTIONS.displacement}px)`;
    btnHTML.style.transform = transform;
  }

  private createLVLsHTML(): HTMLDivElement {
    const LVLsWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page__lvl_wrapper],
    });

    this.gameData.forEach((LVL, index) => {
      const currentLVL = (index + 1).toString();
      const currentLvlWrapper = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles.page__lvl],
        attributes: {
          id: `${index}`,
        },
      });

      const descriptionWrapper = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles.page__lvl_description],
      });

      this.descriptionsHTML.push(descriptionWrapper);
      currentLvlWrapper.append(descriptionWrapper);
      const LVLRounds = LVL.rounds;

      LVLRounds.forEach((_, id) => {
        const currentID = id + 1;
        const btnTextContent = `${id + 1}`;
        const btn = this.createRoundBtn(btnTextContent);
        btn.getHTML().setAttribute('currentLVL', currentLVL);
        btn.getHTML().setAttribute('currentRound', id.toString());
        this.addStylesForBtn(currentID, btn, LVLRounds.length);
        currentLvlWrapper.append(btn.getHTML());
      });

      LVLsWrapper.append(currentLvlWrapper);
    });

    return LVLsWrapper;
  }

  private createRoundBtn(id: string): ButtonModel {
    const btn = new ButtonModel(id, [styles.page__btn, 'btn-reset']);
    this.roundBtns.push(btn);
    return btn;
  }

  private fillDescriptions(): void {
    this.descriptionsHTML.forEach((description, index) => {
      const currentDescr = description;
      currentDescr.innerHTML = DESCRIPTIONS[index];
    });
  }

  public initHTML(gameData: levelInfo[]): void {
    this.gameData = gameData;

    const LVLsWrapper = this.createLVLsHTML();
    this.fillDescriptions();
    this.pageWrapper?.append(LVLsWrapper);
  }

  public createHTML(id: string): HTMLDivElement {
    const page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page],
      attributes: { id },
    });

    this.pageWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.choice_game_wrapper],
    });

    page.style.display = PAGES_STATE.HIDDEN;
    page.append(this.pageWrapper);
    this.parent.append(page);
    return page;
  }
}

export default ChoiceGamePageView;
