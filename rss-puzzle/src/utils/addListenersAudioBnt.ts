import { EVENT_NAMES } from '../shared/types/enums.ts';

const setListenersLineBtn = (
  btn: HTMLButtonElement,
  audio: HTMLAudioElement,
): void => {
  btn.addEventListener(EVENT_NAMES.click, () => {
    audio.play().catch(() => {});
  });
};

export default setListenersLineBtn;
