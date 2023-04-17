import { useEffect, useRef, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string): FetchState<T> => {
  const isMounted = useRef(true);

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: T = await response.json();

        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data
          });
        }
      } catch (error) {
        if (isMounted.current) {
          setState(prevState => ({
            ...prevState,
            loading: false,
            error: error.message
          }));
        }
      }
    };

    fetchData();
  }, [url]);

  return state;
};