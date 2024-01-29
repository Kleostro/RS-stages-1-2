import CreateElement from '../../CreateElement';
import './timerView.scss';

const TIMER_INTERVAL = 1000;
const MAX_MS_IN_SEC = 60;
const MAX_SEC_IN_MIN = 60;

class TimerView {
  constructor() {
    this.intervalID = null;
    this.currentTime = 0;
    this.isStart = false;

    this.#createHTML();
  }

  getHTML() {
    return this.timer;
  }

  startTimer() {
    this.timer.textContent = '00:00';
    this.isStart = true;
    return this.intervalID = setInterval(() => {
      this.currentTime += 1;

      const { formattedMin, formattedSec } = this.formattedTime();

      this.timer.textContent = `${formattedMin}:${formattedSec}`;
    }, TIMER_INTERVAL);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    this.isStart = false;
  }

  getTime() {
    return this.currentTime;
  }

  formattedTime() {
    const formattedMin = Math.floor(this.currentTime / MAX_SEC_IN_MIN).toString().padStart(2, '0');
    const formattedSec = (this.currentTime % MAX_MS_IN_SEC).toString().padStart(2, '0');

    return { formattedMin, formattedSec };
  }

  #createHTML() {
    this.timer = new CreateElement({ tag: 'span', classes: ['timer'], textContent: '00:00' });
  }
}

export default TimerView;
