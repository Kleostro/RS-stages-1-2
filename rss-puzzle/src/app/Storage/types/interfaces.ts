export interface Data {
  [key: string]: string;
}

export interface StorageComponentInterface {
  add(key: string, value: string): Data;
  get(key: string): unknown;
  remove(key: string): void;
  clear(): void;
}
