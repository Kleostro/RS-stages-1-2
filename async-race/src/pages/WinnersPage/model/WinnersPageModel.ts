import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import WinnersPageView from '../view/WinnersPageView.ts';
import WINNERS_PAGE_STYLES from '../view/winnersPage.module.scss';
import { QUERY_PARAMS, QUERY_VALUES } from '../../../shared/Api/types/enums.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import type { WinnerInterface } from '../../../shared/Api/types/interfaces.ts';
import type { WinnerInfo } from '../../types/interfaces.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import PaginationModel from '../../../features/Pagination/model/PaginationModel.ts';
import PAGES_IDS from '../../types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';

class WinnersPageModel implements PageInterface {
  private winnersPageView: WinnersPageView;

  private pagination: PaginationModel = new PaginationModel(
    PAGES_IDS.WINNERS_PAGE,
  );

  private winnerInfo: WinnerInfo = {
    id: 0,
    time: 0,
    wins: 0,
    car: {
      id: 0,
      name: '',
      color: '',
    },
  };

  private bySort = QUERY_VALUES.ID;

  private byOrder = QUERY_VALUES.ASC;

  private allWinnersData: WinnerInfo[] = [];

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  constructor(parent: HTMLDivElement) {
    this.winnersPageView = new WinnersPageView(parent);
    this.init().catch(() => {});
  }

  public getHTML(): HTMLDivElement {
    return this.winnersPageView.getHTML();
  }

  private switchVisible(): void {
    this.winnersPageView
      .getHTML()
      .classList.toggle(WINNERS_PAGE_STYLES['winners-page--hidden']);
  }

  private async getWinnerInfo(
    winner: WinnerInterface,
  ): Promise<WinnerInfo | undefined> {
    if (winner.id) {
      const car = await ApiModel.getCarById(winner.id);
      if (car && winner.id) {
        this.winnerInfo = {
          id: winner.id,
          time: winner.time,
          wins: winner.wins,
          car,
        };
      }
    }

    return this.winnerInfo;
  }

  private async getWinnersData(
    winners: WinnerInterface[],
  ): Promise<WinnerInfo[]> {
    const winnerPromises: Promise<WinnerInfo | undefined>[] = winners.map(
      (winner) => this.getWinnerInfo(winner),
    );
    const winnersData: (WinnerInfo | undefined)[] =
      await Promise.all(winnerPromises);
    return winnersData.filter(
      (winnerInfo): winnerInfo is WinnerInfo => winnerInfo !== undefined,
    );
  }

  private async fetchAndDrawWinnersData(
    queryParams: Map<string, number | string>,
  ): Promise<void> {
    const winners = await ApiModel.getWinners(queryParams);
    if (!winners) {
      return;
    }

    this.winnersPageView.clearWinnersTableTbody();
    this.allWinnersData = [];

    const winnersData = await this.getWinnersData(winners);
    this.allWinnersData.push(...winnersData);
    this.drawWinnerLines(winnersData);
  }

  private drawWinnerLines(winners: WinnerInfo[]): void {
    const countWinnerLines =
      this.winnersPageView.getWinnersTableTbody().children.length;

    if (countWinnerLines < QUERY_VALUES.DEFAULT_WINNERS_LIMIT) {
      winners.forEach((winner) => {
        const winnerTr = this.winnersPageView.createWinnersTableBodyTr(winner);
        this.winnersPageView.getWinnersTableTbody().append(winnerTr);
      });
    }
  }

  private async redrawCurrentPage(): Promise<void> {
    const currentPage = StoreModel.getState().winnersPage;
    const queryParams: Map<string, number | string> = new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT);
    queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    queryParams.set(QUERY_PARAMS.SORT, this.bySort);
    queryParams.set(QUERY_PARAMS.ORDER, this.byOrder);
    await ApiModel.getWinners(queryParams)
      .then((winners) => {
        if (!winners?.length) {
          const prevPage = currentPage - 1;
          queryParams.delete(QUERY_PARAMS.PAGE);
          queryParams.set(QUERY_PARAMS.PAGE, prevPage);
          StoreModel.dispatch({
            type: ACTIONS.CHANGE_WINNERS_PAGE,
            payload: prevPage,
          });
        } else {
          queryParams.set(QUERY_PARAMS.PAGE, currentPage);
        }
      })
      .catch(() => {});

    await this.fetchAndDrawWinnersData(queryParams);
  }

  private drawWinnersTitle(): void {
    const winnersTitle = this.winnersPageView.getWinnersTitle();
    ApiModel.getWinners(new Map())
      .then((winners) => {
        const textContent = `Winners (${winners?.length})`;
        winnersTitle.textContent = textContent;
      })
      .catch(() => {});
  }

  private subscribeToMediator(): void {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, () => {
      this.switchVisible();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DRAW_NEW_WINNER, () => {
      this.redrawCurrentPage().catch(() => {});
      this.drawWinnersTitle();
    });

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE,
      () => {
        this.redrawCurrentPage().catch(() => {});
      },
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_WINNER, () => {
      this.redrawCurrentPage().catch(() => {});
      this.drawWinnersTitle();
    });
  }

  private setTableHeadHandler(): void {
    const winnersTableTheadTr = this.winnersPageView.getWinnersTableTheadTr();
    winnersTableTheadTr.addEventListener(
      EVENT_NAMES.CLICK,
      (event: MouseEvent) => {
        const { target } = event;
        if (target instanceof HTMLElement) {
          if (target.id === QUERY_VALUES.WINS) {
            this.sortByWinsOrTime(target, target.id).catch(() => {});
          } else if (target.id === QUERY_VALUES.TIME) {
            this.sortByWinsOrTime(target, target.id).catch(() => {});
          }
        }
      },
    );
  }

  private async sortByWinsOrTime(
    target: HTMLElement,
    sortBy: string,
  ): Promise<void> {
    const currentPage = StoreModel.getState().winnersPage;
    this.bySort = sortBy;
    const queryParams: Map<string, number | string> = new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT);
    queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    queryParams.set(QUERY_PARAMS.SORT, this.bySort);

    if (target.classList.contains(WINNERS_PAGE_STYLES.bottom)) {
      this.byOrder = QUERY_VALUES.DESC;
      target.classList.replace(
        WINNERS_PAGE_STYLES.bottom,
        WINNERS_PAGE_STYLES.top,
      );
    } else {
      this.byOrder = QUERY_VALUES.ASC;
      target.classList.replace(
        WINNERS_PAGE_STYLES.top,
        WINNERS_PAGE_STYLES.bottom,
      );
    }

    queryParams.set(QUERY_PARAMS.ORDER, this.byOrder);

    const fetch = await this.fetchAndDrawWinnersData(queryParams);
    return fetch;
  }

  private async init(): Promise<void> {
    this.subscribeToMediator();
    this.drawWinnersTitle();
    this.winnersPageView.getPageWrapper().append(this.pagination.getHTML());
    await this.fetchAndDrawWinnersData(
      new Map([
        [QUERY_PARAMS.PAGE, StoreModel.getState().winnersPage],
        [QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT],
      ]),
    );
    this.setTableHeadHandler();
  }
}

export default WinnersPageModel;
