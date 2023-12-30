import { MutableRefObject, useEffect, useRef } from "react";

/**
 * React state hook that returns the latest state as described
 * in the {@link https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function| React hooks FAQ}.
 *
 * This is mostly useful to get access to the latest value of some props
 * or state inside an asynchronous callback,
 * instead of that value at the time the callback was created from.

 * @category Function
 * @param state state or function that we want to read from.
 * @returns Mutable ref state or function
 * @example
 *
 * const [count, setCount] = React.useState(0);
 * const latestCount = useLatest(count);
 *
 * function handleAlertClick() {
 *  setTimeout(() => {
 *    alert(`Latest count value: ${latestCount.current}`);
 *  }, 3000);
 * }
 */
export const useLatest = <T>(state: T): MutableRefObject<T> => {
  const storedValue = useRef(state);
  useEffect(() => {
    storedValue.current = state;
  });
  return storedValue;
};
