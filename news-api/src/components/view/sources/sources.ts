import './sources.css';
import type { SourcesDataInterface } from '@/types/interfaces';
import * as Utilities from '@/utilities';

interface SourcesClassInterface {
  draw(data: SourcesDataInterface[]): void;
}

class Sources implements SourcesClassInterface {
  public draw(data: SourcesDataInterface[]): void {
    data.forEach((item: SourcesDataInterface) => this._createSourceItem(item));
  }

  private _createSourceItem(item: SourcesDataInterface): void {
    try {
      const sourcesWrapper = Utilities.safeQuerySelector('.sources');
      const sourceItem = Utilities.createBaseElement('div', ['source__item'], { 'data-source-id': item.id });

      const sourceItemName = Utilities.createBaseElement('span', ['source__item-name']);
      sourceItemName.textContent = item.name;

      sourceItem.append(sourceItemName);
      sourcesWrapper.append(sourceItem);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Sources;
