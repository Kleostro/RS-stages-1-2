import type { levelInfo } from '../types/interfaces';

class ApiModel {
  private response: Promise<levelInfo> | null;

  constructor() {
    this.response = null;
  }

  public async getData(url: string): Promise<levelInfo> {
    const data: levelInfo = await this.fetchResponse(url);
    return data;
  }

  private fetchResponse(url: string): Promise<levelInfo> {
    this.response = fetch(url)
      .then((response) => response.json())
      .then((json: levelInfo) => json);

    return this.response;
  }
}

export default ApiModel;
