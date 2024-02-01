import CreateElement from '../../../CreateElement';
import './audio.scss';
import winSound from '../../../../sounds/win.mp3';
import fieldSound from '../../../../sounds/field.mp3';
import crossedSound from '../../../../sounds/crossed.mp3';
import emptySound from '../../../../sounds/empty.mp3';
import settingsGameClick from '../../../../sounds/settingsGameClick.mp3';
import bgSound from '../../../../sounds/bg-sound.mp3';
import Mediator, { AppEvent } from '../../core/Mediator';

const SOUND_ON = 'on';

class AudioModel {
  constructor() {
    this.soundOnOff = SOUND_ON;
    this.BgOnOff = SOUND_ON;
    this.#createHTML();

    const singletonMediator = Mediator.getInstance();
    singletonMediator.subscribe(AppEvent.toggleSettingsSound, this.setSettingsSoundOnOff.bind(this));
    singletonMediator.subscribe(AppEvent.toggleSoundBg, this.setBgSoundOnOff.bind(this));
    singletonMediator.subscribe(AppEvent.settingsClick, this.playSettingsGameClick.bind(this));
    singletonMediator.subscribe(AppEvent.soundBg, this.playBgSound.bind(this));

    const LS = JSON.parse(localStorage.getItem('kleostro'));

    if (LS.sound) {
      this.soundOnOff = LS.sound;
    }
  }

  getHTML() {
    return this.soundBox;
  }

  /**
   * @param {string} value
   */
  setSettingsSoundOnOff(value) {
    this.soundOnOff = value;
  }

  /**
  * @param {string} value
  */
  setBgSoundOnOff(value) {
    this.BgOnOff = value;
  }

  playField() {
    if (this.soundOnOff === SOUND_ON) {
      this.fieldSound.currentTime = 0;
      this.fieldSound.play();
    }
  }

  playCrossed() {
    if (this.soundOnOff === SOUND_ON) {
      this.crossedSound.currentTime = 0;
      this.crossedSound.play();
    }
  }

  playEmpty() {
    if (this.soundOnOff === SOUND_ON) {
      this.emptySound.currentTime = 0;
      this.emptySound.play();
    }
  }

  playModal() {
    if (this.soundOnOff === SOUND_ON) {
      this.winSound.currentTime = 0;
      this.winSound.play();
    }
  }

  playSettingsGameClick() {
    if (this.soundOnOff === SOUND_ON) {
      this.settingsGameSound.currentTime = 0;
      this.settingsGameSound.play();
    }
  }

  playBgSound() {
    if (this.BgOnOff === SOUND_ON) {
      this.bgSound.play();
    } else {
      this.bgSound.pause();
    }
  }

  #createHTML() {
    this.soundBox = new CreateElement({ classes: ['sound-box', 'visually-hidden'] });
    this.fieldSound = new CreateElement({ tag: 'audio', attrs: { src: fieldSound } });
    this.crossedSound = new CreateElement({ tag: 'audio', attrs: { src: crossedSound } });
    this.emptySound = new CreateElement({ tag: 'audio', attrs: { src: emptySound } });
    this.winSound = new CreateElement({ tag: 'audio', attrs: { src: winSound } });
    this.settingsGameSound = new CreateElement({ tag: 'audio', attrs: { src: settingsGameClick } });
    this.bgSound = new CreateElement({ tag: 'audio', attrs: { src: bgSound, loop: '' } });

    this.soundBox.append(
      this.winSound,
      this.fieldSound,
      this.crossedSound,
      this.emptySound,
      this.settingsGameSound,
      this.bgSound,
    );
  }
}

export default AudioModel;
