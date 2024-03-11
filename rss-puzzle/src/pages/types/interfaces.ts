import { type UserDataInterface } from '../../app/Storage/types/interfaces.ts';

interface PageInterface {
  getID(): string;
  getHTML(): HTMLDivElement;
  greeting?(): string;
  saveAuthUser?(userData: UserDataInterface): void;
  checkAuthUser?(): boolean;
}

export default PageInterface;
