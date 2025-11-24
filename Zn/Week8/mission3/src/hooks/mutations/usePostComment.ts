import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postComment } from "../../apis/comment";

function usePostComment(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      // ✅ 댓글 작성 성공 시 해당 LP의 댓글 목록 쿼리 무효화 → 자동 refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, lpId],
      });
      console.log("댓글 등록 성공", data);
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    },
  });
}

export default usePostComment;
