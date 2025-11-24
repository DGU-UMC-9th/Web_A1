// src/hooks/queries/useGetInfiniteLpList.ts
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  const isRealSearch = search.trim() !== "";
  const isInitialLoad = search === "";

  return useInfiniteQuery({
    // ✅ LP 목록을 가져오는 쿼리
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    // ✅ 반드시 LP 관련 쿼리는 QUERY_KEY.lps 로 시작
    queryKey: [QUERY_KEY.lps, limit, search, order],

    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    enabled: isInitialLoad || isRealSearch,
  });
}

export default useGetInfiniteLpList;
