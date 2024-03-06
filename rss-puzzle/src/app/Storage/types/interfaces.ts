export interface Data {
  [key: string]: string;
}

export interface UserDataInterface {
  name: string;
  surname: string;
}

export interface StorageComponentInterface {
  add(key: string, value: string): void;
  get(key: string): UserDataInterface;
  remove(key: string): void;
  clear(): void;
}
