import AppEvents from '../../pages/core/mediator/types/enums.ts';
import Mediator from '../../pages/core/mediator/mediator.ts';
import { PAGES_IDS, PAGES_STATE } from '../../pages/types/enums.ts';
import type PageInterface from '../../pages/types/interfaces.ts';
import type RenderNewPageCallback from './types/types.ts';
import EVENT_NAMES from '../../shared/types/enums.ts';

const PAGE_DELAY = 500;
const MAX_OPACITY = 1;

class Router {
  private pages: Record<string, PageInterface>;

  private currentPage: PageInterface;

  private duration: number;

  private singletonMediator: Mediator<unknown>;

  constructor(pages: Record<string, PageInterface>) {
    this.pages = pages;
    this.currentPage = this.setCurrentPage();
    this.duration = PAGE_DELAY;
    this.singletonMediator = Mediator.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.changeHash,
      this.renderNewPageCallback,
    );
    window.addEventListener(
      EVENT_NAMES.hashchange,
      this.hashChangeHandler.bind(this),
    );
  }

  public init(): void {
    const loginPage = this.pages[PAGES_IDS.LOG_IN];

    if (loginPage.checkAuthUser) {
      if (loginPage.checkAuthUser()) {
        this.renderNewPageCallback(PAGES_IDS.START);
      } else {
        this.renderNewPageCallback(PAGES_IDS.LOG_IN);
      }
    }
  }

  private setCurrentPage(): PageInterface {
    const currentHash = window.location.hash.slice(1);

    if (currentHash in this.pages) {
      this.currentPage = this.pages[currentHash];
    } else if (currentHash === PAGES_IDS.BLANK) {
      this.currentPage = this.pages[PAGES_IDS.LOG_IN];
    }

    return this.currentPage;
  }

  private renderNewPageCallback: RenderNewPageCallback = (hash: unknown) => {
    if (typeof hash === 'string') {
      window.location.hash = hash;
      this.renderNewPage(hash);
    }
  };

  private renderNewPage(pageID: string): void {
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
      const progress = Math.min(elapsed / duration, MAX_OPACITY);
      const page = nextPage.getHTML();

      page.style.opacity = `${progress}`;
      page.style.display = PAGES_STATE.VISIBLE;

      if (elapsed < duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };

    const fadeOut = (timestamp: number): void => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, MAX_OPACITY);
      const opacity = MAX_OPACITY - progress;

      const page = currentPage.getHTML();
      page.style.opacity = `${opacity}`;

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
    const hash = window.location.hash.slice(1);

    if (!loginPage.checkAuthUser) {
      return;
    }

    if (hash !== this.pages[hash]?.id) {
      if (loginPage.checkAuthUser()) {
        this.renderNewPageCallback(PAGES_IDS.START);
      } else {
        this.renderNewPageCallback(PAGES_IDS.LOG_IN);
      }
    }
    if (loginPage.checkAuthUser()) {
      if (hash !== PAGES_IDS.BLANK && hash !== PAGES_IDS.LOG_IN) {
        this.renderNewPageCallback(hash);
      } else {
        window.location.hash = this.currentPage.id;
      }
    } else {
      this.renderNewPageCallback(PAGES_IDS.LOG_IN);
    }
  }
}

export default Router;
