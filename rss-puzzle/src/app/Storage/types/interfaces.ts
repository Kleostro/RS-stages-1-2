export interface Data {
  [key: string]: unknown;
}

export interface StorageComponentInterface {
  loadStorage(): Data;
  add(key: string, value: string): void;
  get(key: string): unknown;
  remove(key: string): void;
  clear(): void;
}
