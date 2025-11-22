import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpListDto } from "../../types/lp";

function useGetInfiniteLpList({
  limit,
  search,
  order,
}: {
  limit: number;
  search: string;
  order: PAGINATION_ORDER;
}) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ResponseLpListDto,
      allPages: ResponseLpListDto[]
    ) => {
      if (!lastPage) {
    return undefined; // 더 이상 페이지가 없음을 나타냅니다.
  }

  // 이제 lastPage가 정의되었으므로 안전하게 'hasNext' 속성에 접근할 수 있습니다.
  if (lastPage.data.hasNext) {
    // 다음 페이지를 가져오는 데 필요한 매개변수를 반환합니다.
    return lastPage.data.nextCursor;
  }

  // hasNext가 false이거나 없으면, 다음 페이지가 없으므로 undefined를 반환합니다.
  return undefined;
    },
  });
}

export default useGetInfiniteLpList;