import createBaseElement from '../../../utils/createBaseElement.ts';
import EMOJI_STYLES from './emojiList.module.scss';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import type { Emoji } from '../../../utils/isEmoji.ts';

class EmojiListView {
  private emojiData: Emoji[] = [];

  private categoryNamesList: Map<string, string> = new Map();

  private emojiItems: HTMLLIElement[] = [];

  private categoryButtons: ButtonModel[] = [];

  private categoryList: HTMLUListElement;

  private contentWrapper: HTMLDivElement;

  private emojiWrapper: HTMLDivElement;

  constructor(emoji: Emoji[]) {
    this.emojiData = emoji;
    this.categoryList = this.createCategoryList();
    this.contentWrapper = this.createContentWrapper();
    this.emojiWrapper = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.emojiWrapper;
  }

  public switchVisibility(): void {
    this.emojiWrapper.classList.toggle(EMOJI_STYLES.hidden);
  }

  public getEmojiItems(): HTMLLIElement[] {
    return this.emojiItems;
  }

  public getCategoryButtons(): ButtonModel[] {
    return this.categoryButtons;
  }

  public getContentWrapper(): HTMLDivElement {
    return this.contentWrapper;
  }

  private createCategoryButton(
    categoryName: string,
    emoji: string,
  ): ButtonModel {
    const button = new ButtonModel({
      text: emoji,
      classes: [EMOJI_STYLES.category],
      attrs: {
        id: categoryName,
      },
    });

    this.categoryButtons.push(button);
    return button;
  }

  private createCategoryList(): HTMLUListElement {
    this.categoryList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [EMOJI_STYLES.categoryList],
    });

    this.emojiData.forEach((category) => {
      if (!this.categoryNamesList.has(category.category)) {
        this.categoryNamesList.set(category.category, category.emoji);
      }
    });

    this.categoryNamesList.forEach((emoji, categoryName) => {
      this.createCategoryButton(categoryName, emoji);
      this.categoryList.append(
        this.categoryButtons[this.categoryButtons.length - 1].getHTML(),
      );
    });

    return this.categoryList;
  }

  private createEmojiSection(categoryName: string): void {
    const sectionTitle = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [EMOJI_STYLES.sectionTitle],
      attributes: {
        id: categoryName,
      },
      innerContent: categoryName,
    });

    const emojiList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [EMOJI_STYLES.emojiList],
    });

    this.emojiData.forEach((emoji) => {
      if (emoji.category === categoryName) {
        const emojiItem = createBaseElement({
          tag: TAG_NAMES.LI,
          cssClasses: [EMOJI_STYLES.emojiItem],
          innerContent: emoji.emoji,
        });

        this.emojiItems.push(emojiItem);
        emojiList.append(emojiItem);
      }
    });

    this.contentWrapper.append(sectionTitle, emojiList);
  }

  private createContentWrapper(): HTMLDivElement {
    this.contentWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [EMOJI_STYLES.contentWrapper],
    });

    return this.contentWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.emojiWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [EMOJI_STYLES.emojiWrapper, EMOJI_STYLES.hidden],
    });

    this.contentWrapper.append(this.categoryList);

    this.categoryNamesList.forEach((_, categoryName) => {
      this.createEmojiSection(categoryName);
    });

    this.emojiWrapper.append(this.contentWrapper);
    return this.emojiWrapper;
  }
}

export default EmojiListView;
