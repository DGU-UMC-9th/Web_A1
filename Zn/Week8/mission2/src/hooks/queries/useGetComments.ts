import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getCommentList } from "../../apis/comment";

function useGetCommentList(
  lpIdParam: string | undefined,
  limit: number,
  order: PAGINATION_ORDER
) {
  const lpId = lpIdParam ? Number(lpIdParam) : undefined;

  return useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) =>
      getCommentList({ lpId, cursor: pageParam, limit, order }),
    queryKey: [QUERY_KEY.comments, lpId, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}


export default useGetCommentList;