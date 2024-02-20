import './news.css';
import { type Data } from '../../../types/index';

const EVEN = 2;

class News {
  public draw(data: Data[]): void {
    const newsElementWrapper = document.querySelector('.news');
    const news = data.splice(0, 10);

    if (newsElementWrapper) {
      newsElementWrapper.innerHTML = '';
    }

    news.forEach((item, idx) => {
      const newsElement = document.createElement('div');
      newsElement.classList.add('news__item');
      if (idx % EVEN) {
        newsElement.classList.add('alt');
      }

      const newsTop = this._createNewsItemMeta(item);
      const newsBottom = this._createNewsItemDescription(item);

      newsElement.append(newsTop, newsBottom);

      if (newsElementWrapper) {
        newsElementWrapper.append(newsElement);
      }
    });
  }

  private _createNewsItemMeta(item: Data): HTMLDivElement {
    const newsMetaItemWrapper = document.createElement('div');
    newsMetaItemWrapper.classList.add('news__meta');

    const newsMetaPhoto = document.createElement('div');
    newsMetaPhoto.classList.add('news__meta-photo');
    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

    const newsMetaList = document.createElement('ul');
    newsMetaList.classList.add('news__meta-details');

    const newsMetaAuthor = document.createElement('li');
    newsMetaAuthor.classList.add('news__meta-author');
    newsMetaAuthor.textContent = item.author || item.source.name;

    const newsMetaDate = document.createElement('li');
    newsMetaDate.classList.add('news__meta-date');
    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

    newsMetaList.append(newsMetaAuthor, newsMetaDate);
    newsMetaItemWrapper.append(newsMetaPhoto, newsMetaList);
    return newsMetaItemWrapper;
  }

  private _createNewsItemDescription(item: Data): HTMLDivElement {
    const newsItemDescriptionWrapper = document.createElement('div');
    newsItemDescriptionWrapper.classList.add('news__description');

    const descrTitle = document.createElement('h2');
    descrTitle.classList.add('news__description-title');
    descrTitle.textContent = item.title;

    const descrSource = document.createElement('h3');
    descrSource.classList.add('news__description-source');
    descrSource.textContent = item.source.name;

    const descrContent = document.createElement('p');
    descrContent.classList.add('news__description-content');
    descrContent.textContent = item.description;

    const descrMore = document.createElement('p');
    descrMore.classList.add('news__read-more');

    const descrMoreLink = document.createElement('a');
    descrMoreLink.textContent = 'Read more';
    descrMoreLink.setAttribute('href', item.url);

    descrMore.append(descrMoreLink);
    newsItemDescriptionWrapper.append(descrTitle, descrSource, descrContent, descrMore);
    return newsItemDescriptionWrapper;
  }
}

export default News;
