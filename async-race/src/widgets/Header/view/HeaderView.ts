import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import HEADER_BUTTON_TEXT from '../types/enums.ts';
import HEADER_STYLES from './header.module.scss';

class HeaderView {
  private garageButton: ButtonModel;

  private winnersButton: ButtonModel;

  private header: HTMLElement;

  constructor() {
    this.garageButton = this.createGarageButton();
    this.winnersButton = this.createWinnersButton();
    this.header = this.createHTML();
  }

  public getHTML(): HTMLElement {
    return this.header;
  }

  public getGarageButton(): ButtonModel {
    return this.garageButton;
  }

  public getWinnersButton(): ButtonModel {
    return this.winnersButton;
  }

  private createGarageButton(): ButtonModel {
    this.garageButton = new ButtonModel({
      text: HEADER_BUTTON_TEXT.GARAGE_BTN,
      classes: [HEADER_STYLES['header__garage-button']],
    });

    return this.garageButton;
  }

  private createWinnersButton(): ButtonModel {
    this.winnersButton = new ButtonModel({
      text: HEADER_BUTTON_TEXT.WINNERS_BTN,
      classes: [HEADER_STYLES['header__winners-button']],
    });

    return this.winnersButton;
  }

  private createHTML(): HTMLElement {
    this.header = createBaseElement({
      tag: TAG_NAMES.HEADER,
      cssClasses: [HEADER_STYLES.header],
    });

    this.header.append(
      this.winnersButton.getHTML(),
      this.garageButton.getHTML(),
    );
    return this.header;
  }
}

export default HeaderView;
