export const AppEvent = {
  toggleSettingsSound: 'toggleSettingsSound',
  toggleSoundBg: 'toggleSoundBg',
  settingsClick: 'settingsClick',
  soundBg: 'soundBg',
};

class Mediator {
  constructor() {
    this.listeners = new Map();
  }

  static #mediator = new Mediator();

  /**
   * @returns {Object} - Mediator class instance
   */
  static getInstance() {
    return Mediator.#mediator;
  }

  /**
   * @param {string} nameEvent
   * @param {function} listener
   */
  subscribe(nameEvent, listener) {
    if (this.listeners.has(nameEvent)) {
      const listeners = this.listeners.get(nameEvent);
      listeners.push(listener);
    } else {
      const newListeners = [];
      newListeners.push(listener);
      this.listeners.set(nameEvent, newListeners);
    }
  }

  // unsubscribe(nameEvent, listener) {

  // }

  /**
   * @param {string} nameEvent
   * @param {string} params
   */
  notify(nameEvent, params) {
    const eventListeners = this.listeners.get(nameEvent);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(params));
    }
  }
}

export default Mediator;
