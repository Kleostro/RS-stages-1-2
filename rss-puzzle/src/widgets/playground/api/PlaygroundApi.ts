import API_URLS from '../../../shared/api/types/constants.ts';
import ApiModel from '../../../shared/api/model/ApiModel.ts';
import type { levelInfo } from '../../../shared/api/types/interfaces.ts';

class PlaygroundApi {
  private api: ApiModel;

  private levelInfo: levelInfo | null;

  private levelInfoReceived: boolean;

  constructor() {
    this.api = new ApiModel();
    this.levelInfo = null;
    this.levelInfoReceived = false;
    this.receiveLevelInfo(1).catch(() => {});
  }

  public async getLevelData(): Promise<levelInfo> {
    if (!this.levelInfoReceived) {
      await this.receiveLevelInfo(1);
    }
    if (!this.levelInfo) {
      throw new Error('No level info');
    }
    return this.levelInfo;
  }

  private async receiveLevelInfo(currentLvl: number): Promise<void> {
    const url = `${API_URLS.levelData}${currentLvl}.json`;

    await this.api
      .getData(url)
      .then((data) => {
        this.levelInfo = data;
        this.levelInfoReceived = true;
      })
      .catch(() => {
        this.levelInfoReceived = false;
      });
  }
}

export default PlaygroundApi;
