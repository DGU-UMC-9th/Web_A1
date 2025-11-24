// src/hooks/mutations/usePostLp.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLP } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PostLpDto } from "../../types/lp";

function usePostLp() {
  const queryClient = useQueryClient();

  return useMutation({
    // LP 생성
    mutationFn: (body: PostLpDto) => postLP(body),

    // ✅ 성공 시 LP 목록 쿼리 전부 무효화 → useGetInfiniteLpList가 자동 refetch
    onSuccess: async (data) => {
      console.log("LP 등록 성공", data);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps], // 위의 useGetInfiniteLpList 와 첫 요소를 통일
        refetchType: "all",
      });
    },

    onError: (error) => {
      console.error("LP 등록 실패:", error);
      alert("LP 등록에 실패했습니다.");
    },
  });
}

export default usePostLp;
