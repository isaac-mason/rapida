import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { EventSystem } from './index';

describe('EventSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('processes events that it has handlers defined for', () => {
    const eventSystem = new EventSystem();
    eventSystem.start();

    const eventName = 'exampleTestName';
    const handler = jest.fn();

    const event = {
      topic: eventName,
      data: 'data',
    };

    eventSystem.on(eventName, handler);

    eventSystem.emit(event);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(event);
  });

  it('will not process events until start is called', () => {
    const eventSystem = new EventSystem();

    const eventName = 'exampleTestName';
    const handler = jest.fn();

    const event = {
      topic: eventName,
      data: 'data',
    };

    eventSystem.on(eventName, handler);

    eventSystem.emit(event);

    expect(handler).toBeCalledTimes(0);

    eventSystem.start();

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(event);
  });

  it('can pause then resume processing of events', () => {
    const eventSystem = new EventSystem();
    eventSystem.start();

    const eventName = 'exampleTestName';
    const handler = jest.fn();

    const event = {
      topic: eventName,
      data: 'data',
    };

    eventSystem.on(eventName, handler);

    eventSystem.emit(event);
    
    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(event);

    eventSystem.stop();

    eventSystem.emit(event);
    
    expect(handler).toBeCalledTimes(1);

    eventSystem.start();
    
    expect(handler).toBeCalledTimes(2);
  });

  it('does not call event handlers for topics they are not configured for', () => {
    const eventSystem = new EventSystem();
    eventSystem.start();

    const eventName = 'exampleTestName';
    const otherEventName = 'otherExampleTestName';
    const handler = jest.fn();

    const event = {
      topic: otherEventName,
      data: 'data',
    };

    eventSystem.on(eventName, handler);

    eventSystem.emit(event);

    expect(handler).toBeCalledTimes(0);
  });

  it('will not call removed handlers', () => {
    const eventSystem = new EventSystem();
    eventSystem.start();

    const eventName = 'exampleTestName';
    const handler = jest.fn();

    const event = {
      topic: eventName,
      data: 'data',
    };

    const handlerId = eventSystem.on(eventName, handler);

    eventSystem.emit(event);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(event);

    eventSystem.removeHandler(eventName, handlerId);

    eventSystem.emit(event);

    expect(handler).toBeCalledTimes(1);
  });
});
