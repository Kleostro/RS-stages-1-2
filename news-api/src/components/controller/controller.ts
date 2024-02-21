import type { EventNews } from '@/types';
import AppLoader from './appLoader';

interface AppControllerInterface {
  getSources(callback: () => void): void;
  getNews(e: EventNews, callback: () => void): void;
}

class AppController extends AppLoader implements AppControllerInterface {
  public getSources(callback: () => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(e: EventNews, callback: () => void): void {
    let { target } = e;
    const newsContainer = e.currentTarget;

    while (target !== newsContainer && target instanceof HTMLElement) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
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
