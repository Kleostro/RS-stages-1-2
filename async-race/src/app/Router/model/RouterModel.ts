import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';

export default class RouterModel {
  private static pages: Map<string, PageInterface>;

  private static currentPage: PageInterface | undefined = undefined;

  private static pathSegmentsToKeep = 2;

  constructor() {
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname
        .split('/')
        .slice(RouterModel.pathSegmentsToKeep + 1)
        .join('/');
      RouterModel.navigateTo(currentPath);
    });

    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      RouterModel.handleRequest(window.location.pathname);
    });
  }

  public static setPages(pages: Map<string, PageInterface>): void {
    RouterModel.pages = pages;
  }

  public static navigateTo(route: string): void {
    this.handleRequest(route);

    const pathnameApp = window.location.pathname
      .split('/')
      .slice(1, this.pathSegmentsToKeep + 1)
      .join('/');
    window.history.pushState({}, '', `/${pathnameApp}/${route}`);

    // window.history.pushState(route, '', route);
  }

  private static handleRequest(path: string): void {
    // if (!RouterModel.pages.has(path)) {
    //   window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
    // }

    const pathParts = path.split('/');
    const hasRoute = RouterModel.pages.has(pathParts[0]);
    if (!hasRoute) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
      return;
    }

    RouterModel.currentPage?.hide();
    RouterModel.currentPage = RouterModel.pages.get(path);
    RouterModel.currentPage?.show();
  }
}
