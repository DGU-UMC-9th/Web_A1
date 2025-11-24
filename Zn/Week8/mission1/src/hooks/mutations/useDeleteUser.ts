import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

function useDeleteUser() {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear(); // 전체 캐시 비우기
      console.log("회원 탈퇴 성공");
      nav("/login");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });
}

export default useDeleteUser;
