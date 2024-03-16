import IMG_SRC from '../widgets/playground/ui/imgSrc/imgSrc.ts';
import { EVENT_NAMES } from '../shared/types/enums.ts';

const setListenersLineBtn = (
  btn: HTMLButtonElement,
  audio: HTMLAudioElement,
): void => {
  const currentBtn = btn;
  let btnSvg = currentBtn.firstChild;

  if (btnSvg && !(btnSvg instanceof SVGElement)) {
    btnSvg = btnSvg.nextSibling;
  }
  currentBtn.addEventListener(EVENT_NAMES.click, () => {
    if (btnSvg && btnSvg instanceof SVGElement) {
      btnSvg.innerHTML = IMG_SRC.volumeOn;
    }
    audio.play().catch(() => {});
  });
  audio.addEventListener(EVENT_NAMES.ended, () => {
    if (btnSvg && btnSvg instanceof SVGElement) {
      btnSvg.innerHTML = IMG_SRC.volumeOff;
    }
  });
};

export default setListenersLineBtn;
