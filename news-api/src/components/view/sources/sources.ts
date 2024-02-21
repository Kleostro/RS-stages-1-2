import './sources.css';
import type { SourcesDataInterface } from '@/types';

interface SourcesClassInterface {
  draw(data: SourcesDataInterface[]): void;
}

class Sources implements SourcesClassInterface {
  public draw(data: SourcesDataInterface[]): void {
    data.forEach((item: SourcesDataInterface) => this._createSourceItem(item));
  }

  private _createSourceItem(item: SourcesDataInterface): void {
    const sourcesWrapper = document.querySelector('.sources');
    const sourceItem = document.createElement('div');
    sourceItem.classList.add('source__item');
    sourceItem.setAttribute('data-source-id', item.id);

    const sourceItemName = document.createElement('span');
    sourceItemName.classList.add('source__item-name');
    sourceItemName.textContent = item.name;

    sourceItem.append(sourceItemName);

    if (sourcesWrapper) {
      sourcesWrapper.append(sourceItem);
    }
  }
}

export default Sources;
