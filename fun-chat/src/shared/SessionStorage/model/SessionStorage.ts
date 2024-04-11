import STORE_KEYS from '../types/enums.ts';

class SessionStorageModel {
  private storage: Record<string, string>;

  constructor() {
    this.storage = this.init();
  }

  public get(key: string): unknown {
    if (key in this.storage) {
      const result: unknown = JSON.parse(this.storage[key]);
      return result;
    }
    return null;
  }

  public add(key: string, value: string): boolean {
    this.storage[key] = value;
    this.save(this.storage);
    return true;
  }

  public remove(key: string): boolean {
    if (key in this.storage) {
      delete this.storage[key];
      this.save(this.storage);
      return true;
    }

    return false;
  }

  public clear(): boolean {
    sessionStorage.clear();
    this.init();
    return true;
  }

  private save(data: Record<string, string>): boolean {
    sessionStorage.setItem(STORE_KEYS.SS_NAME, JSON.stringify(data));
    this.storage = this.init();
    return true;
  }

  private init(): Record<string, string> {
    const storedData = sessionStorage.getItem(STORE_KEYS.SS_NAME);

    if (storedData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.storage = JSON.parse(storedData);
    } else {
      sessionStorage.setItem(STORE_KEYS.SS_NAME, '{}');
      this.storage = this.init();
    }

    return this.storage;
  }
}

export default SessionStorageModel;
