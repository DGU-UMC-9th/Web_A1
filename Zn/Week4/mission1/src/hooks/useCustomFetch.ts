import { useEffect, useState } from "react";
import axios from "axios";

export default function useCustomFetch<T>(urls: string[] | string) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const key = Array.isArray(urls) ? urls.join("|") : urls;
    if (!key) return;

    const fetchData = async () => {
      try {
        setIsPending(true);
        setIsError(false);

        if (Array.isArray(urls)) {
          const responses = await Promise.all(
            urls.map((url) =>
              axios.get(url, {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
              })
            )
          );
          setData(responses.map((r) => r.data) as T);
        } else {
          const res = await axios.get(urls, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          });
          setData(res.data as T);
        }
      } catch (error) {
        console.error("❌ 데이터 요청 중 오류 발생:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [Array.isArray(urls) ? urls.join("|") : urls]); // ✅ 무한 렌더 방지

  return { data, isPending, isError };
}
