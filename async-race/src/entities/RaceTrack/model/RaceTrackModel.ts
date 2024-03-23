import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import RaceTrackView from '../view/RaceTrackView.ts';

class RaceTrackModel {
  private carData: CarInterface;

  private raceTrackView: RaceTrackView;

  private raceTrack: HTMLLIElement;

  constructor(carData: CarInterface) {
    this.carData = carData;
    this.raceTrackView = new RaceTrackView(this.carData);
    this.raceTrack = this.raceTrackView.getHTML();
  }

  public getHTML(): HTMLLIElement {
    return this.raceTrack;
  }
}

export default RaceTrackModel;
