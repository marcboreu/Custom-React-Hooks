
import { useEffect, MutableRefObject } from 'react';
import { useOutsideClick } from './useOutsideClick';

describe('useOutsideClick', () => {
  let callback: jest.Mock;
  let ref: MutableRefObject<HTMLElement | null>;

  beforeEach(() => {
    callback = jest.fn();
    ref = { current: document.createElement('div') };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback when clicking outside of the ref element', () => {
    useOutsideClick(ref, callback);

    // Trigger a mousedown event outside of the ref element
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(callback).toHaveBeenCalled();
  });

  it('should call the callback when pressing the "Escape" key', () => {
    useOutsideClick(ref, callback);

    // Trigger a keydown event with "Escape" key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(callback).toHaveBeenCalled();
  });

  it('should not call the callback when clicking inside the ref element', () => {
    useOutsideClick(ref, callback);

    // Trigger a mousedown event inside the ref element
    ref.current?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback when pressing a key other than "Escape"', () => {
    useOutsideClick(ref, callback);

    // Trigger a keydown event with a key other than "Escape"
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should clean up event listeners when unmounting', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { cleanup } = useOutsideClick(ref, callback);

    // Call cleanup function returned by the hook
    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
