export interface UserDataInterface {
  [key: string]: string;
}

export interface Data {
  [key: string]: string;
}

export interface StorageModelInterface {
  add(key: string, value: string): void;
  get<T>(key: string): T | undefined;
  remove(key: string): void;
  clear(): void;
}
