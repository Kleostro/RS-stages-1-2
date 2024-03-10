import type { levelInfo } from './types/interfaces';

class Api {
  private response: Promise<levelInfo> | null;

  constructor() {
    this.response = null;
  }

  private fetchResponse(url: string): Promise<levelInfo> {
    this.response = fetch(url)
      .then((response) => response.json())
      .then((json: levelInfo) => json);

    return this.response;
  }

  public async getData(url: string): Promise<levelInfo> {
    const data: levelInfo = await this.fetchResponse(url);
    return data;
  }
}

export default Api;
