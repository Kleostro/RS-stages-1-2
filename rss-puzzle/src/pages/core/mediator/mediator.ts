type ListenerCallback<T> = (params: T) => T;

class Mediator<T> {
  private static mediator = new Mediator();

  private listeners: Map<string, Array<ListenerCallback<T>>>;

  constructor() {
    this.listeners = new Map();
  }

  public static getInstance(): Mediator<unknown> {
    return Mediator.mediator;
  }

  public subscribe(eventName: string, listener: ListenerCallback<T>): void {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName);
      listeners?.push(listener);
    } else {
      const newListeners = [];
      newListeners.push(listener);
      this.listeners.set(eventName, newListeners);
    }
  }

  public notify(eventName: string, params: T): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(params));
    }
  }

  public unsubscribe(eventName: string, listener: ListenerCallback<T>): void {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName);
      const index = listeners?.indexOf(listener);

      if (index && index !== -1) {
        listeners?.splice(index, 1);
      }
    }
  }
}

export default Mediator;
