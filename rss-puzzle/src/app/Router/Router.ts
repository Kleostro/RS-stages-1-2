import PAGES_IDS from '../types/enums.ts';
import type PageInterface from '../../pages/types/interfaces.ts';

const PAGE_DELAY = 500;

class Router {
  private pages: Record<string, PageInterface>;

  private currentPage: PageInterface;

  private duration: number;

  constructor(pages: Record<string, PageInterface>) {
    this.pages = pages;
    this.currentPage = pages[PAGES_IDS.LOG_IN];
    this.duration = PAGE_DELAY;
    window.location.hash = '';
    window.addEventListener('hashchange', this.hashChangeHandler.bind(this));
  }

  public renderNewPage(pageID: string): void {
    const formattedTitle = pageID[0].toUpperCase() + pageID.slice(1);
    document.title = formattedTitle;

    this.fadeOutAndIn(this.currentPage, this.pages[pageID]);

    this.currentPage = this.pages[pageID];
  }

  private fadeOutAndIn(
    currentPage: PageInterface,
    nextPage: PageInterface,
    duration = this.duration,
  ): void {
    const maxOpacity = 1;
    const visible = 'flex';
    const hidden = 'none';

    let start = performance.now();

    const fadeIn = (timestamp: number): void => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, maxOpacity);

      const nextPageHTML = nextPage.getHTML();
      nextPageHTML.style.display = visible;
      nextPageHTML.style.opacity = `${progress}`;

      if (elapsed < duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };

    const fadeOut = (timestamp: number): void => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, maxOpacity);

      const currentPageHTML = currentPage.getHTML();
      currentPageHTML.style.opacity = `${maxOpacity - progress}`;

      if (elapsed < duration) {
        window.requestAnimationFrame(fadeOut);
      } else {
        currentPageHTML.style.display = hidden;
        start = performance.now();
        window.requestAnimationFrame(fadeIn);
      }
    };

    window.requestAnimationFrame(fadeOut);
  }

  private hashChangeHandler(): void {
    const hash = window.location.hash.substring(1);

    if (hash === '') {
      this.renderNewPage(PAGES_IDS.LOG_IN);
      return;
    }

    this.renderNewPage(hash);
  }
}

export default Router;
