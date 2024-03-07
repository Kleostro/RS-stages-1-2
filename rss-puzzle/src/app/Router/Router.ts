import { PAGES_IDS, PAGES_STATE } from '../../pages/types/enums.ts';
import type PageInterface from '../../pages/types/interfaces.ts';
import type { StorageComponentInterface } from '../Storage/types/interfaces.ts';
import STORE_KEYS from '../Storage/types/enums.ts';

const PAGE_DELAY = 500;
const maxOpacity = 1;

class Router {
  private pages: Record<string, PageInterface>;

  private currentPage: PageInterface;

  private duration: number;

  private storage: StorageComponentInterface;

  constructor(
    storage: StorageComponentInterface,
    pages: Record<string, PageInterface>,
  ) {
    this.storage = storage;
    this.pages = pages;

    this.currentPage = this.setCurrentPage();
    this.duration = PAGE_DELAY;
    window.addEventListener('hashchange', this.hashChangeHandler.bind(this));
  }

  private setCurrentPage(): PageInterface {
    const currentHash = window.location.hash.slice(1);

    if (currentHash in this.pages) {
      this.currentPage = this.pages[currentHash];
    } else if (currentHash === '') {
      this.currentPage = this.pages[PAGES_IDS.LOG_IN];
    }

    return this.currentPage;
  }

  public checkLoginUser(): void {
    const user = this.storage.get(STORE_KEYS.USER);

    if (!user.name) {
      window.location.hash = PAGES_IDS.LOG_IN;
      this.renderNewPage(PAGES_IDS.LOG_IN);
    } else {
      window.location.hash = PAGES_IDS.START;
      this.renderNewPage(PAGES_IDS.START);
    }
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
    let start = performance.now();

    const fadeIn = (timestamp: number): void => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, maxOpacity);
      const page = nextPage.getHTML();

      page.style.opacity = `${progress}`;
      page.style.display = PAGES_STATE.VISIBLE;

      if (elapsed < duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };

    const fadeOut = (timestamp: number): void => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, maxOpacity);

      const page = currentPage.getHTML();
      page.style.opacity = `${maxOpacity - progress}`;

      if (elapsed < duration) {
        window.requestAnimationFrame(fadeOut);
      } else {
        Object.entries(this.pages)
          .filter(([key]) => key !== this.currentPage.getHTML().id)
          .forEach(([key]) => {
            this.pages[key].getHTML().style.display = PAGES_STATE.HIDDEN;
          });

        page.style.display = PAGES_STATE.HIDDEN;
        start = performance.now();
        window.requestAnimationFrame(fadeIn);
      }
    };

    window.requestAnimationFrame(fadeOut);
  }

  private hashChangeHandler(): void {
    const loginPage = this.pages[PAGES_IDS.LOG_IN];

    if (loginPage.checkAuthUser) {
      loginPage.checkAuthUser();
    }

    const hash = window.location.hash.slice(1);

    if (hash === '') {
      this.renderNewPage(PAGES_IDS.START);
    } else {
      this.renderNewPage(hash);
    }
  }
}

export default Router;
