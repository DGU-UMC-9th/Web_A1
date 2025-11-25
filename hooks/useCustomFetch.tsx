import { useState, useEffect } from "react";
import axios from "axios";

interface FetchResult<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

export function useCustomFetch<T>(url: string, dependencies: any[] = []): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            Accept: "application/json",
          },
        });
        setData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, dependencies); // URL이나 params가 바뀔 때마다 재요청

  return { data, isPending, isError };
}