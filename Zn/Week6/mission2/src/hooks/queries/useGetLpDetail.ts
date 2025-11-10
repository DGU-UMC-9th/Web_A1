import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

/**
 * ✅ LP 상세 조회 훅
 * @param lpid - LP 고유 id
 */
export const useGetLpDetail = (lpid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.lp, lpid],
    queryFn: () => getLpDetail(lpid),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    gcTime: 1000 * 60 * 10,   // 10분 후 캐시 제거
  });
};
