import CreateElement from '../../../CreateElement';
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

  /**
  * get HTML timer
  * @returns {Element} HTML-Element timer
  */
  getHTML() {
    return this.timer;
  }

  /**
  * start timer
  * @returns {number} - ID timer
  */
  startTimer() {
    this.isStart = true;
    this.intervalID = setInterval(() => {
      this.currentTime += 1;
      const { formattedMin, formattedSec } = this.formattedTime();
      this.timer.textContent = `${formattedMin}:${formattedSec}`;
    }, TIMER_INTERVAL);

    return this.intervalID;
  }

  /**
  * stop timer
  */
  stopTimer() {
    clearInterval(this.intervalID);
    this.isStart = false;
  }

  /**
  * get current time
  * @returns {number} - current time
  */
  getTime() {
    return this.currentTime;
  }

  /**
  * formatted time
  * @returns {object} - formatted time
  */
  formattedTime() {
    const formattedMin = Math.floor(this.currentTime / MAX_SEC_IN_MIN).toString().padStart(2, '0');
    const formattedSec = (this.currentTime % MAX_MS_IN_SEC).toString().padStart(2, '0');

    return { formattedMin, formattedSec };
  }

  /**
  * create HTML timer
  */
  #createHTML() {
    this.timer = new CreateElement({ tag: 'span', classes: ['timer'], textContent: '00:00' });
  }
}

export default TimerView;
