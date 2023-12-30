/**
 * Reference from https://github.com/jaredLunde/react-hook
 */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-void */
import { useEffect, useRef, useCallback } from "react";
import { useLatest } from "./useLatest";

type DebounceOptions = {
  leading?: boolean;
};

export const useDebounceCallback = <CallbackArgs extends unknown[]>(
  callback: (...args: CallbackArgs) => void,
  wait = 700,
  { leading = false }: DebounceOptions = {}
): ((...args: CallbackArgs) => void) => {
  const storedCallback = useLatest(callback);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const deps = [wait, leading, storedCallback];
  // Cleans up pending timeouts when the deps change
  useEffect(
    () => () => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = void 0;
    },
    deps
  );

  return useCallback(function (...args: CallbackArgs) {
    const { current } = timeout;
    // Calls on leading edge
    if (current === void 0 && leading) {
      timeout.current = setTimeout(() => {
        timeout.current = void 0;
      }, wait);
      return storedCallback.current.apply(null, args);
    }
    // Clear the timeout every call and start waiting again
    current && clearTimeout(current);
    // Waits for `wait` before invoking the callback
    timeout.current = setTimeout(() => {
      timeout.current = void 0;
      storedCallback.current.apply(null, args);
    }, wait);
  }, deps);
};
