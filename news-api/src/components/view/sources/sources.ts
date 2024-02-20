import './sources.css';
import { type News } from '../../../types/index';

class Sources {
  public draw(data: News[]): void {
    const sources = document.querySelector('.sources');
    if (sources) {
      data.forEach((item: News) => {
        this._createSourceItem(sources, item);
      });
    }
  }

  private _createSourceItem(wrapper: Element, item: News): void {
    const sourceItem = document.createElement('div');
    sourceItem.classList.add('source__item');
    sourceItem.setAttribute('data-source-id', item.id);

    const sourceItemName = document.createElement('span');
    sourceItemName.classList.add('source__item-name');
    sourceItemName.textContent = item.name;

    sourceItem.append(sourceItemName);

    if (wrapper) {
      wrapper.append(sourceItem);
    }
  }
}

export default Sources;
