import API_URLS from '../../../shared/api/types/constants.ts';
import ApiModel from '../../../shared/api/model/ApiModel.ts';
import type { levelInfo } from '../../../shared/api/types/interfaces.ts';

const MAX_LEVEL = 6;

class ChoiceGameApi {
  private api: ApiModel;

  private levelInfo: levelInfo | null;

  private levelInfoReceived: boolean;

  constructor() {
    this.api = new ApiModel();
    this.levelInfo = null;
    this.levelInfoReceived = false;
  }

  public isLevelInfoReceived(): boolean {
    return this.levelInfoReceived;
  }

  public async getGameData(): Promise<levelInfo[]> {
    const promises = [];
    for (let index = 1; index <= MAX_LEVEL; index += 1) {
      promises.push(this.receiveLevelInfo(index));
    }
    const results: levelInfo[] = await Promise.all(promises);
    return results;
  }

  private async receiveLevelInfo(currentLvl: number): Promise<levelInfo> {
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
    if (!this.levelInfo) {
      throw new Error('No level info');
    }
    return this.levelInfo;
  }
}

export default ChoiceGameApi;
