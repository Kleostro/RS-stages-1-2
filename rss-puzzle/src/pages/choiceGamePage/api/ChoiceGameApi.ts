import API_URLS from '../types/constants.ts';
import type { levelInfo } from '../types/interfaces.ts';
import getData from '../../../utils/getData.ts';

const MAX_LEVEL = 6;

class ChoiceGameApi {
  private levelInfo: levelInfo | null;

  private levelInfoReceived: boolean;

  constructor() {
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

    await getData(url)
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
