import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import ROUTER_DETAILS from '../types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';

export default class RouterModel {
  private pages: Map<string, PageInterface>;

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  constructor(pages: Map<string, PageInterface>) {
    this.pages = pages;
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname
        .split(ROUTER_DETAILS.DEFAULT_SEGMENT)
        .slice(
          ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT,
        )
        .join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.navigateTo(currentPath);
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_PAGE,
        currentPath.split(ROUTER_DETAILS.DEFAULT_SEGMENT).join(),
      );
    });

    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      const currentPath = window.location.pathname
        .split(ROUTER_DETAILS.DEFAULT_SEGMENT)
        .slice(
          ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT,
        )
        .join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.handleRequest(currentPath);
    });
  }

  public navigateTo(route: string): void {
    this.handleRequest(route);

    const pathnameApp = window.location.pathname
      .split(ROUTER_DETAILS.DEFAULT_SEGMENT)
      .slice(
        ROUTER_DETAILS.NEXT_SEGMENT,
        ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT,
      )
      .join(ROUTER_DETAILS.DEFAULT_SEGMENT);
    const url = `/${pathnameApp}/${route}`;
    window.history.pushState({}, '', url);
  }

  private handleRequest(path: string): void {
    const pathParts = path.split(ROUTER_DETAILS.DEFAULT_SEGMENT);
    const hasRoute = this.pages.has(pathParts.join(''));
    if (!hasRoute) {
      window.location.pathname = `${PAGES_IDS.FOR_DEPLOY}`;
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_PAGE,
        PAGES_IDS.DEFAULT_PAGE,
      );
      return;
    }

    this.singletonMediator.notify(
      MEDIATOR_EVENTS.CHANGE_PAGE,
      pathParts.join(),
    );
  }
}
