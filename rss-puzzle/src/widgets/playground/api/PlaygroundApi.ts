import API_URLS from '../../../shared/api/types/constants.ts';
import ApiModel from '../../../shared/api/model/ApiModel.ts';
import type { levelInfo } from '../../../shared/api/types/interfaces.ts';

class PlaygroundApi {
  private api: ApiModel;

  private levelInfo: levelInfo | null;

  constructor() {
    this.api = new ApiModel();
    this.levelInfo = null;
  }

  public async getLevelData(lvl: number): Promise<levelInfo> {
    await this.receiveLevelInfo(lvl);

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
      })
      .catch(() => {});
  }
}

export default PlaygroundApi;
