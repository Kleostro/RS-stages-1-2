import { THEAD_TD_IDS, WINNERS_SVG_DETAILS } from '../../types/enums.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import WINNERS_PAGE_STYLES from './winnersPage.module.scss';
import type { WinnerInfo } from '../../types/interfaces.ts';
import { changeSVGFill, createSVGUse } from '../../../utils/createCarImg.ts';

class WinnersPageView {
  private winnersTitle: HTMLHeadingElement;

  private winnersTableTbody: HTMLTableSectionElement;

  private winnersTableTheadTdArr: HTMLTableCellElement[] = [];

  private winnerSvgArr: SVGSVGElement[] = [];

  private winnersTableTheadTr: HTMLTableRowElement;

  private winnersTableThead: HTMLTableSectionElement;

  private winnersTable: HTMLTableElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.winnersTitle = this.createWinnersTitle();
    this.winnersTableTbody = this.createWinnersTableTbody();
    this.winnersTableTheadTr = this.createWinnersTableTheadTr();
    this.winnersTableThead = this.createWinnersTableThead();
    this.winnersTable = this.createWinnersTable();
    this.page = this.createHTML(parent);
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getWinnersTitle(): HTMLHeadingElement {
    return this.winnersTitle;
  }

  public getWinnersTable(): HTMLTableElement {
    return this.winnersTable;
  }

  public getWinnersTableTbody(): HTMLTableSectionElement {
    return this.winnersTableTbody;
  }

  public clearWinnersTableTbody(): void {
    this.winnersTableTbody.innerHTML = '';
  }

  public createWinnersTableBodyTr(winner: WinnerInfo): HTMLTableRowElement {
    const winnersTableBodyTr = createBaseElement({
      tag: TAG_NAMES.TR,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_body-tr']],
    });

    const idTd = this.createWinnersTableTbodyTd();
    idTd.classList.add(WINNERS_PAGE_STYLES['winners-page_table_body-td']);
    idTd.textContent = winner.id.toString();

    const carTd = this.createWinnersTableTbodyTd();
    carTd.classList.add(WINNERS_PAGE_STYLES['winners-page_table_body-td']);
    carTd.append(this.createWinnerSvg(winner));

    const nameTd = this.createWinnersTableTbodyTd();
    nameTd.classList.add(WINNERS_PAGE_STYLES['winners-page_table_body-td']);
    nameTd.textContent = winner.car.name;

    const winsTd = this.createWinnersTableTbodyTd();
    winsTd.classList.add(WINNERS_PAGE_STYLES['winners-page_table_body-td']);
    winsTd.textContent = winner.wins.toString();

    const timeTd = this.createWinnersTableTbodyTd();
    timeTd.classList.add(WINNERS_PAGE_STYLES['winners-page_table_body-td']);
    timeTd.textContent = winner.time.toString();

    winnersTableBodyTr.append(idTd, carTd, nameTd, winsTd, timeTd);
    this.winnersTableTbody.append(winnersTableBodyTr);
    return winnersTableBodyTr;
  }

  private createWinnerSvg(winner: WinnerInfo): SVGSVGElement {
    const carSVG = document.createElementNS(
      WINNERS_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );
    carSVG.classList.add(
      WINNERS_PAGE_STYLES['winners-page_table_body-td_car-svg'],
    );
    carSVG.appendChild(createSVGUse(WINNERS_SVG_DETAILS.CAR_ID));
    changeSVGFill(carSVG, winner.car.color);
    this.winnerSvgArr.push(carSVG);
    return carSVG;
  }

  private createWinnersTableTbodyTd(): HTMLTableCellElement {
    const winnersTableTbodyTd = createBaseElement({
      tag: TAG_NAMES.TD,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_body-td']],
    });

    this.winnersTableTbody.append(winnersTableTbodyTd);
    return winnersTableTbodyTd;
  }

  private createWinnersTitle(): HTMLHeadingElement {
    this.winnersTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_title']],
      innerContent: 'winners',
    });
    return this.winnersTitle;
  }

  private createWinnersTable(): HTMLTableElement {
    this.winnersTable = createBaseElement({
      tag: TAG_NAMES.TABLE,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table']],
    });
    return this.winnersTable;
  }

  private createWinnersTableThead(): HTMLTableSectionElement {
    this.winnersTableThead = createBaseElement({
      tag: TAG_NAMES.THEAD,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_head']],
    });
    return this.winnersTableThead;
  }

  private createWinnersTableTheadTr(): HTMLTableRowElement {
    this.winnersTableTheadTr = createBaseElement({
      tag: TAG_NAMES.TR,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_head-tr']],
    });
    return this.winnersTableTheadTr;
  }

  private createWinnersTableTheadTd(id: string): void {
    const winnersTableTheadTd = createBaseElement({
      tag: TAG_NAMES.TD,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_head-td']],
      attributes: {
        id,
      },
      innerContent: id,
    });
    this.winnersTableTheadTdArr.push(winnersTableTheadTd);
  }

  private createWinnersTableTbody(): HTMLTableSectionElement {
    this.winnersTableTbody = createBaseElement({
      tag: TAG_NAMES.TBODY,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page_table_body']],
    });
    return this.winnersTableTbody;
  }

  private createHTML(parent: HTMLDivElement): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [WINNERS_PAGE_STYLES['winners-page']],
    });

    THEAD_TD_IDS.forEach((id) => {
      this.createWinnersTableTheadTd(id);
    });
    this.winnersTableTheadTr.append(...this.winnersTableTheadTdArr);
    this.winnersTableThead.append(this.winnersTableTheadTr);
    this.winnersTable.append(this.winnersTableThead, this.winnersTableTbody);
    this.page.append(this.winnersTitle, this.winnersTable);
    parent.append(this.page);

    return this.page;
  }
}
export default WinnersPageView;
