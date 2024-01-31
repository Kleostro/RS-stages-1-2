import CreateElement from '../../CreateElement';
import './audio.scss';
import winSound from '../../../../assets/sound/win.mp3';
import fieldSound from '../../../../assets/sound/field.mp3';
import crossedSound from '../../../../assets/sound/crossed.mp3';
import emptySound from '../../../../assets/sound/empty.mp3';
import settingsGameClick from '../../../../assets/sound/settingsGameClick.mp3';

class Audio {
  constructor() {
    this.#createHTML();
  }

  getHTML() {
    return this.soundBox;
  }

  playField() {
    this.fieldSound.currentTime = 0;
    this.fieldSound.play();
  }

  playCrossed() {
    this.crossedSound.currentTime = 0;
    this.crossedSound.play();
  }

  playEmpty() {
    this.emptySound.currentTime = 0;
    this.emptySound.play();
  }

  playModal() {
    this.winSound.currentTime = 0;
    this.winSound.play();
  }

  playSettingsGameClick() {
    this.settingsGameSound.currentTime = 0;
    this.settingsGameSound.play();
  }

  #createHTML() {
    this.soundBox = new CreateElement({ classes: ['sound-box'] });
    this.fieldSound = new CreateElement({ tag: 'audio', classes: ['field-sound'], attrs: { src: fieldSound } });
    this.crossedSound = new CreateElement({ tag: 'audio', classes: ['crossed-sound'], attrs: { src: crossedSound } });
    this.emptySound = new CreateElement({ tag: 'audio', classes: ['empty-sound'], attrs: { src: emptySound } });
    this.winSound = new CreateElement({ tag: 'audio', classes: ['win-sound'], attrs: { src: winSound } });
    this.settingsGameSound = new CreateElement({ tag: 'audio', classes: ['empty-sound'], attrs: { src: settingsGameClick } });

    this.soundBox.append(this.winSound, this.fieldSound, this.crossedSound, this.emptySound, this.settingsGameSound);
  }
}

export default Audio;
