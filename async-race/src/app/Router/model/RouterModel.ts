import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';

class RouterModel {
  private pages: Record<string, PageInterface>;

  private currentPage: PageInterface | null = null;

  constructor(pages: Record<string, PageInterface>) {
    this.pages = pages;

    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      this.navigateTo(window.location.pathname);
    });

    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      this.handleRequest(window.location.pathname);
    });
  }

  public handleRequest(path: string): void {
    if (!(path in this.pages)) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
    }

    this.currentPage?.hide();
    this.currentPage = this.pages[path];
    this.currentPage.show();
  }

  public init(): PageInterface | null {
    return this.currentPage;
  }

  public navigateTo(route: string): void {
    this.handleRequest(route);
    window.history.pushState(route, '', route);
  }
}

export default RouterModel;
