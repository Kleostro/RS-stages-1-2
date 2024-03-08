import { type UserDataInterface } from '../../app/Storage/types/interfaces.ts';
import type StorageComponent from '../../app/Storage/Storage.ts';

interface PageInterface {
  id: string;
  storage: StorageComponent;
  getHTML(): HTMLDivElement;
  greeting?(): string;
  saveAuthUser?(userData: UserDataInterface): void;
  checkAuthUser?(): boolean;
}

export default PageInterface;
