import { useState } from "react";

export const useCounter = (initialState: number = 10) => {
  const [counter, setCounter] = useState<number>(initialState);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(initialState);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
