import { useEffect, useState, useRef } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = (debounceDelay: number = 100): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const debounceTimeout = useRef<number | null>(null);
  const prevWindowSize = useRef<WindowSize>(windowSize);

  const handleResize = () => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const currentWindowSize: WindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      if (
        currentWindowSize.width !== prevWindowSize.current.width ||
        currentWindowSize.height !== prevWindowSize.current.height
      ) {
        prevWindowSize.current = currentWindowSize;
        setWindowSize(currentWindowSize);
      }
    }, debounceDelay);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      handleResize();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      clearTimeout(debounceTimeout.current);
    };
  }, [debounceDelay]);

  return windowSize;
};

export default useWindowSize;
