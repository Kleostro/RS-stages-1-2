import type StorageComponent from '../../app/Storage/Storage.ts';

interface PageInterface {
  storage: StorageComponent;
  getHTML(): HTMLDivElement;
  greeting?(): string;
  saveAuthUser?(userData: { [key: string]: FormDataEntryValue | null }): void;
  checkAuthUser?(): void;
}

export default PageInterface;
