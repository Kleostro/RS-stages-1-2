import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';

class RouterModel {
  private pages: Map<string, PageInterface>;

  private currentPage: PageInterface | undefined = undefined;

  constructor(pages: Map<string, PageInterface>) {
    this.pages = pages;

    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      this.navigateTo(window.location.pathname);
    });

    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      this.handleRequest(window.location.pathname);
    });
  }

  public init(): PageInterface | undefined {
    return this.currentPage;
  }

  private handleRequest(path: string): void {
    if (!this.pages.has(path)) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
    }

    this.currentPage?.hide();
    this.currentPage = this.pages.get(path);
    this.currentPage?.show();
  }

  private navigateTo(route: string): void {
    this.handleRequest(route);
    window.history.pushState(route, '', route);
  }
}

export default RouterModel;
