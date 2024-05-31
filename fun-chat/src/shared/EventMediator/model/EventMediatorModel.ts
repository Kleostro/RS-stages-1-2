import type ListenerCallback from '../types/types.ts';

class EventMediatorModel<T> {
  private static mediator = new EventMediatorModel();

  private listeners: Map<string, Array<ListenerCallback<T>>> = new Map();

  public static getInstance(): EventMediatorModel<unknown> {
    return EventMediatorModel.mediator;
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
      const index = listeners?.findIndex(
        (l) => l.toString() === listener.toString(),
      );

      if (index !== undefined && index !== -1) {
        listeners?.splice(index, 1);

        if (listeners) {
          this.listeners.set(eventName, listeners);
        }
      }
    }
  }
}

export default EventMediatorModel;
