/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import STORE_KEYS from './types/enums.ts';
import type { Data, StorageComponentInterface } from './types/interfaces';

class StorageComponent implements StorageComponentInterface {
  private storage: Data;

  constructor() {
    this.storage = this.init();
  }

  public get(key: string): unknown {
    const data: Data = this.init();
    return data[key];
  }

  public add(key: string, value: string): Data {
    const data: Data = this.init();
    data[key] = JSON.parse(value);
    this.save(data);
    return data;
  }

  public remove(key: string): void {
    const data: Data = this.init();
    delete data[key];
    this.save(data);
  }

  public clear(): void {
    localStorage.clear();
    this.init();
  }

  private save(data: Data): Data {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
    return this.storage;
  }

  private init(): Data {
    const storedData = localStorage.getItem(STORE_KEYS.LS_NAME);

    const safeJsonParse = <T extends Data>(str: string): T => {
      try {
        const jsonValue: T = JSON.parse(str);
        return jsonValue;
      } catch {
        throw new Error('I need help >_<');
      }
    };

    if (storedData) {
      this.storage = safeJsonParse(storedData);
    } else {
      localStorage.setItem(STORE_KEYS.LS_NAME, '{}');
      this.storage = this.init();
    }

    return this.storage;
  }
}

export default StorageComponent;
