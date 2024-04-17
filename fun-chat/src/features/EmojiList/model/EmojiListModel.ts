import type { Emoji } from '../../../utils/isEmoji.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import EmojiListView from '../view/EmojiListView.ts';
import SCROLL_DETAILS from '../types/enums.ts';

class EmojiListModel {
  private view: EmojiListView;

  constructor(emoji: Emoji[]) {
    this.view = new EmojiListView(emoji);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  public getView(): EmojiListView {
    return this.view;
  }

  private hideEmojiList(): void {
    this.getHTML()?.addEventListener(EVENT_NAMES.MOUSELEAVE, () => {
      this.view?.switchVisibility();
    });
  }

  private init(): void {
    this.hideEmojiList();
    this.view.getCategoryButtons().forEach((button) => {
      button.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
        const contentChildren = this.view.getContentWrapper().children;
        Array.from(contentChildren).forEach((child) => {
          if (child.id === button.getHTML().id) {
            const currentChild = child;
            currentChild.scrollIntoView({
              behavior: SCROLL_DETAILS.behavior,
              block: SCROLL_DETAILS.block,
            });
          }
        });
      });
    });
  }
}

export default EmojiListModel;
