import type { EventNews, ResponseSourcesInterface } from '@/types/interfaces';
import AppLoader from './appLoader';

interface AppControllerInterface {
  getSources(callback: (data: ResponseSourcesInterface) => void): void;
  getNews(e: EventNews, callback: (data: ResponseSourcesInterface) => void): void;
}

class AppController extends AppLoader implements AppControllerInterface {
  public getSources(callback: (data: ResponseSourcesInterface) => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(e: EventNews, callback: (data: ResponseSourcesInterface) => void): void {
    let { target } = e;
    const newsContainer = e.currentTarget;

    if (!target || !newsContainer) {
      return;
    }

    while (target !== newsContainer && target instanceof HTMLElement) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (
          newsContainer instanceof HTMLElement &&
          newsContainer.getAttribute('data-source') !== sourceId &&
          sourceId
        ) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode ? target.parentNode : target;
    }
  }
}

export default AppController;
