import './news.css';
import type { NewsDataInterface } from '@/types';
import * as Utilities from '@/utilities';

const MAX_NEWS = 10;
const EVEN = 2;

interface NewsClassInterface {
  draw(data: NewsDataInterface[]): void;
}

class News implements NewsClassInterface {
  public draw(data: NewsDataInterface[]): void {
    const news = data.splice(0, MAX_NEWS);
    const newsElementWrapper = document.querySelector('.news');

    if (newsElementWrapper) {
      newsElementWrapper.innerHTML = '';
    }

    news.forEach((item, idx) => {
      const newsElement = Utilities.createElement('div', ['news__item']);
      if (idx % EVEN) {
        newsElement.classList.add('alt');
      }

      const newsItemMeta = this._createNewsItemMeta(item);
      const newsItemDescription = this._createNewsItemDescription(item);

      newsElement.append(newsItemMeta, newsItemDescription);

      if (newsElementWrapper) {
        newsElementWrapper.append(newsElement);
      }
    });
  }

  private _createNewsItemMeta(item: NewsDataInterface): HTMLDivElement {
    const newsMetaItemWrapper = Utilities.createElement('div', ['news__meta']);

    const newsMetaPhoto = Utilities.createElement('div', ['news__meta-photo']);
    newsMetaPhoto.style.backgroundImage = `url(${item?.urlToImage || 'img/news_placeholder.jpg'})`;

    const newsMetaList = Utilities.createElement('ul', ['news__meta-details']);

    const newsMetaAuthor = Utilities.createElement('li', ['news__meta-author']);
    newsMetaAuthor.textContent = item.author || item.source.name;

    const newsMetaDate = Utilities.createElement('li', ['news__meta-date']);
    newsMetaDate.textContent = item.publishedAt.slice(0, MAX_NEWS).split('-').reverse().join('-');

    newsMetaList.append(newsMetaAuthor, newsMetaDate);
    newsMetaItemWrapper.append(newsMetaPhoto, newsMetaList);
    return newsMetaItemWrapper;
  }

  private _createNewsItemDescription(item: NewsDataInterface): HTMLDivElement {
    const newsItemDescriptionWrapper = Utilities.createElement('div', ['news__description']);

    const descriptionTitle = Utilities.createElement('h2', ['news__description-title']);
    descriptionTitle.textContent = item.title;

    const descriptionSource = Utilities.createElement('h3', ['news__description-source']);
    descriptionSource.textContent = item.source.name;

    const descriptionContent = Utilities.createElement('p', ['news__description-content']);
    descriptionContent.textContent = item.description;

    const descriptionMore = Utilities.createElement('p', ['news__read-more']);

    const descriptionMoreLink = Utilities.createElement('a', [], { href: item.url });
    descriptionMoreLink.textContent = 'Read more';

    descriptionMore.append(descriptionMoreLink);
    newsItemDescriptionWrapper.append(descriptionTitle, descriptionSource, descriptionContent, descriptionMore);
    return newsItemDescriptionWrapper;
  }
}

export default News;
