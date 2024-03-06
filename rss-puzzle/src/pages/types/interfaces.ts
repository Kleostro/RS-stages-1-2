import type StorageComponent from '../../app/Storage/Storage.ts';

interface PageInterface {
  storage: StorageComponent;
  getHTML(): HTMLDivElement;
  greeting?(): void;
}

export default PageInterface;
