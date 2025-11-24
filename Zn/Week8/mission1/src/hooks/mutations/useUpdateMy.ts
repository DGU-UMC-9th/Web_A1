import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { updateMy } from "../../apis/auth";
import { queryClient } from "../../App";
import type { myPageDto, ResponseMyInfoDto } from "../../types/auth";

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: updateMy,
    onMutate: async (newInfoPayload: myPageDto) => {
      // 1) 기존 myInfo 쿼리 멈추기
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      // 2) 이전 데이터 가져오기
      const previousMyPost =
        queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      if (previousMyPost) {
        // name, bio, avatar 같은 필드만 덮어쓰기
        queryClient.setQueryData<ResponseMyInfoDto>(
          [QUERY_KEY.myInfo],
          {
            ...previousMyPost,
            data: {
              ...previousMyPost.data, // { id, email, ... } 유지
              ...newInfoPayload,      // { name, bio, avatar }만 변경
            },
          }
        );
      }

      // 롤백용으로 이전 값 반환
      return { previousMyPost };
    },
    onError: (error, _variables, context) => {
      console.error("사용자 정보 수정 실패:", error);
      if (context?.previousMyPost) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      console.log("사용자 정보 수정 완료");
    },
  });
}

export default useUpdateMyInfo;
