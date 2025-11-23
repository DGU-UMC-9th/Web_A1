import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import type { ResponseMyInfoDto } from "../../types/auth";

function useGetMyInfo(accessToken: string | null) {
  return useQuery<ResponseMyInfoDto>({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken, // accessToken 없으면 쿼리 아예 실행 안 함
    retry: false,           // 실패해도 계속 재시도 X (원하면 빼도 됨)
  });
}

export default useGetMyInfo;
