import './news.css';
import type { NewsDataInterface } from '@/types/interfaces';
import * as Utilities from '@/utilities';

const IMG_PLACEHOLDER_PATH = '../../../assets/image-placeholder.jpeg';

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
      const newsElement = Utilities.createBaseElement('div', ['news__item']);
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
    const newsMetaItemWrapper = Utilities.createBaseElement('div', ['news__meta']);

    const newsMetaPhoto = Utilities.createBaseElement('div', ['news__meta-photo']);
    newsMetaPhoto.style.backgroundImage = `url(${item?.urlToImage || IMG_PLACEHOLDER_PATH})`;

    const newsMetaList = Utilities.createBaseElement('ul', ['news__meta-details']);

    const newsMetaAuthor = Utilities.createBaseElement('li', ['news__meta-author']);
    newsMetaAuthor.textContent = item.author || item.source.name;

    const newsMetaDate = Utilities.createBaseElement('li', ['news__meta-date']);
    newsMetaDate.textContent = item.publishedAt.slice(0, MAX_NEWS).split('-').reverse().join('-');

    newsMetaList.append(newsMetaAuthor, newsMetaDate);
    newsMetaItemWrapper.append(newsMetaPhoto, newsMetaList);
    return newsMetaItemWrapper;
  }

  private _createNewsItemDescription(item: NewsDataInterface): HTMLDivElement {
    const newsItemDescriptionWrapper = Utilities.createBaseElement('div', ['news__description']);

    const descriptionTitle = Utilities.createBaseElement('h2', ['news__description-title']);
    descriptionTitle.textContent = item.title;

    const descriptionSource = Utilities.createBaseElement('h3', ['news__description-source']);
    descriptionSource.textContent = item.source.name;

    const descriptionContent = Utilities.createBaseElement('p', ['news__description-content']);
    descriptionContent.textContent = item.description;

    const descriptionMore = Utilities.createBaseElement('p', ['news__read-more']);

    const descriptionMoreLink = Utilities.createBaseElement('a', [], { href: item.url });
    descriptionMoreLink.textContent = 'Read more';

    descriptionMore.append(descriptionMoreLink);
    newsItemDescriptionWrapper.append(descriptionTitle, descriptionSource, descriptionContent, descriptionMore);
    return newsItemDescriptionWrapper;
  }
}

export default News;
