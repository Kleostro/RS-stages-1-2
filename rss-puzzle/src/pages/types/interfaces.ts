import type StorageComponent from '../../app/Storage/Storage.ts';

interface PageInterface {
  storage: StorageComponent;
  getHTML(): HTMLDivElement;
  hidden(): void;
  visible(): void;
}

export default PageInterface;
