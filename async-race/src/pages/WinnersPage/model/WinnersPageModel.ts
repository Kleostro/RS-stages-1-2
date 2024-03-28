import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import WinnersPageView from '../view/WinnersPageView.ts';
import WINNERS_PAGE_STYLES from '../view/winnersPage.module.scss';

class WinnersPageModel implements PageInterface {
  private winnersPageView: WinnersPageView;

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  constructor(parent: HTMLDivElement) {
    this.winnersPageView = new WinnersPageView(parent);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.winnersPageView.getHTML();
  }

  private switchVisible(): void {
    this.winnersPageView
      .getHTML()
      .classList.toggle(WINNERS_PAGE_STYLES['winners-page--hidden']);
  }

  private init(): void {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, () => {
      this.switchVisible();
    });
  }
}

export default WinnersPageModel;
