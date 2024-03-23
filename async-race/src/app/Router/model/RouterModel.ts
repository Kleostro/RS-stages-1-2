import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';

export default class RouterModel {
  private pages: Map<string, PageInterface>;

  private currentPage: PageInterface | undefined = undefined;

  private pathSegmentsToKeep = 2;

  constructor(pages: Map<string, PageInterface>) {
    this.pages = pages;
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname
        .split('/')
        .slice(this.pathSegmentsToKeep + 1)
        .join('/');
      this.navigateTo(currentPath);
    });

    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      const currentPath = window.location.pathname
        .split('/')
        .slice(this.pathSegmentsToKeep + 1)
        .join('/');
      this.handleRequest(currentPath);
    });
  }

  public navigateTo(route: string): void {
    this.handleRequest(route);

    const pathnameApp = window.location.pathname
      .split('/')
      .slice(1, this.pathSegmentsToKeep + 1)
      .join('/');
    const url = `/${pathnameApp}/${route}`;
    window.history.pushState({}, '', url);
  }

  private handleRequest(path: string): void {
    const pathParts = path.split('/');
    const hasRoute = this.pages.has(pathParts[0]);
    if (!hasRoute) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
      return;
    }

    this.currentPage?.hide();
    this.currentPage = this.pages.get(path);
    this.currentPage?.show();
  }
}
