import { useEffect, useState } from "react";
import useGetCommentList from "../../hooks/queries/useGetComments";
import { PAGINATION_ORDER } from "../../enums/common";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import CommentSkeletonList from "./CommentSkeletonList";
import ToggleButton from "../Buttons/ToggleButton";
import usePostComment from "../../hooks/mutations/usePostComment";
import useUpdateComment from "../../hooks/mutations/useUpdateComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import { LuEllipsisVertical, LuPencil, LuTrash2 } from "react-icons/lu";

interface CommentProps {
  myId: number | undefined;
}

const Comment = ({ myId }: CommentProps) => {
  const { lpid } = useParams();
  const lpIdNum = Number(lpid);

  const [asc, setAsc] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const currentOrder = !asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  // 댓글 목록 가져오기
  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetCommentList(lpid, 10, currentOrder);

  // 댓글 등록/수정/삭제 훅
  const { mutate, isPending: isSubmitting } = usePostComment(lpIdNum);
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateComment(lpIdNum);
  const { mutate: deleteMutate } = useDeleteComment(lpIdNum);

  // 댓글 작성
  const handlePostComment = () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    mutate(
      { lpId: lpIdNum, content: newComment },
      {
        onSuccess: () => {
          setNewComment(""); // 입력창 비우기
        },
      }
    );
  };

  // 댓글 삭제
  const handleDeleteClick = (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteMutate({ lpId: lpIdNum, commentId });
      setOpenMenuId(null);
    }
  };

  // 수정 모드 진입
  const handleEditClick = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setOpenMenuId(null);
  };

  // 수정 저장
  const handleSaveEdit = () => {
    if (!editedContent.trim() || editingCommentId === null) return;
    updateMutate(
      { lpId: lpIdNum, commentId: editingCommentId, content: editedContent },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditedContent("");
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const closeAllMenus = () => {
    setOpenMenuId(null);
  };

  // 무한 스크롤
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="mt-8 border-t border-gray-700 pt-4" onClick={closeAllMenus}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-4">댓글</h3>
        <ToggleButton asc={asc} setAsc={setAsc} />
      </div>

      <div className="space-y-4">
        {/* 댓글 입력창 */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="댓글 작성..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="button"
            onClick={handlePostComment}
            disabled={!newComment.trim() || isSubmitting}
            className="px-4 py-2 font-bold bg-pink-400 rounded-md transition-colors hover:bg-pink-600 disabled:opacity-50"
          >
            {isSubmitting ? "등록중..." : "작성"}
          </button>
        </div>

        {/* 댓글 리스트 */}
        {data?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((comment) => {
            const isMyComment = comment.author.id === myId;
            const isEditing = editingCommentId === comment.id;

            return (
              <div key={comment.id} className="relative bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={comment.author.avatar || "https://via.placeholder.com/24"}
                      alt={comment.author.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-semibold text-white">{comment.author.name}</span>
                    <span className="ml-2 text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* 내 댓글일 경우 메뉴 버튼 */}
                  {isMyComment && !isEditing && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(comment.id === openMenuId ? null : comment.id);
                      }}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <LuEllipsisVertical size={18} />
                    </button>
                  )}
                </div>

                {/* 수정 모드 */}
                {isEditing ? (
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md text-sm"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3 py-1 text-xs bg-gray-600 rounded-md hover:bg-gray-500 cursor-pointer"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        disabled={isUpdating}
                        className="px-3 py-1 text-xs bg-pink-400 rounded-md hover:bg-pink-600 disabled:opacity-50 cursor-pointer"
                      >
                        {isUpdating ? "저장중..." : "저장"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-300">{comment.content}</p>
                )}

                {/* 메뉴 팝업 */}
                {openMenuId === comment.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-10 right-2 z-10 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={() => handleEditClick(comment)}
                      className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg cursor-pointer"
                    >
                      <LuPencil size={14} className="mr-2" /> 수정
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(comment.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-700 rounded-b-lg cursor-pointer"
                    >
                      <LuTrash2 size={14} className="mr-2" /> 삭제
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        {/* 댓글 없음 */}
        {data?.pages[0]?.data?.data?.length === 0 && (
          <p className="text-gray-500">작성된 댓글이 없습니다.</p>
        )}
      </div>

      {isFetching && <CommentSkeletonList count={10} />}
      <div ref={ref} className="h-10" />
    </div>
  );
};

export default Comment;
