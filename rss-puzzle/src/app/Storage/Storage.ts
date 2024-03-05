/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */

import STORE_KEYS from './types/enums.ts';
import type { Data, StorageComponentInterface } from './types/interfaces';

class StorageComponent implements StorageComponentInterface {
  constructor() {
    this.init();
  }

  public loadStorage(): Data {
    const storage = localStorage.getItem(STORE_KEYS.LS_NAME) || '';

    const data: Data = JSON.parse(storage);

    return data;
  }

  public add(key: string, value: string): void {
    const data = this.loadStorage();
    data[key] = JSON.parse(value);
    this.save(data);
  }

  public get(key: string): unknown {
    const data = this.loadStorage();
    return data[key];
  }

  public remove(key: string): void {
    const data = this.loadStorage() || '';
    delete data[key];
    this.save(data);
  }

  public clear(): void {
    localStorage.clear();
  }

  private save(data: Data): void {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
  }

  private init(): void {
    if (!localStorage.getItem(STORE_KEYS.LS_NAME)) {
      localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify({}));
    }
  }
}

export default StorageComponent;
