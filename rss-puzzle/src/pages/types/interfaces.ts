import type StorageComponent from '../../app/Storage/Storage.ts';

interface PageInterface {
  id: string;
  storage: StorageComponent;
  getHTML(): HTMLDivElement;
  greeting?(): string;
  saveAuthUser?(userData: { [key: string]: FormDataEntryValue | null }): void;
  checkAuthUser?(): boolean;
}

export default PageInterface;
