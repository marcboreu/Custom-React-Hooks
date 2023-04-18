import { useEffect, useState, RefObject, useMemo, useCallback, useRef } from 'react';

interface IntersectionObserverOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverOptions = {},
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const optionsRef = useRef<IntersectionObserverOptions | null>(null);

  const updateIntersecting = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsIntersecting(entry.isIntersecting);
  }, []);

  const observer = useMemo(() => {
    return new IntersectionObserver(updateIntersecting, options);
  }, [options, updateIntersecting]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (optionsRef.current !== options) {
      observer.disconnect();
    }

    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref, observer, options]);

  return isIntersecting;
};

export default useIntersectionObserver;
