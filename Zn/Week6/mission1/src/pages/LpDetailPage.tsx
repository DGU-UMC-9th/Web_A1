import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Pencil, Trash, Send } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author?: { name?: string };
}

interface CommentResponse {
  data: {
    data: Comment[];
    hasNext: boolean;
    nextCursor?: number;
  };
}

export default function LpDetailPage() {
  const { lpid } = useParams();
  const queryClient = useQueryClient();

  // ✅ LP 상세
  const { data, isPending, isError, refetch } = useGetLpDetail(lpid!);
  const lp = data?.data;

  // ✅ 댓글 정렬
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  // ✅ 댓글 무한 스크롤
  const {
    data: comments,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<CommentResponse>({
    queryKey: ["lpComments", lpid, order],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<CommentResponse>(
        `${import.meta.env.VITE_SERVER_API_URL}/comments`,
        {
          params: { lpId: lpid, cursor: pageParam, limit: 10, order },
        }
      );
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage?.data.hasNext ? lastPage.data.nextCursor : undefined,
  });

  // ✅ 스크롤 트리거
  const { ref, inView } = useInView({ threshold: 0.1 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // ✅ 댓글 작성
  const [comment, setComment] = useState("");
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/comments`, {
      lpId: lpid,
      content: comment,
    });
    setComment("");
    queryClient.invalidateQueries({ queryKey: ["lpComments", lpid, order] });
  };

  // ✅ LP 로딩 상태
  if (isPending)
    return (
      <div className="mt-10 flex justify-center text-gray-400">
        데이터를 불러오는 중...
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-60 gap-3 text-gray-500">
        <p>데이터를 불러오는 중 오류가 발생했습니다 😢</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-pink-500 text-white rounded-md"
        >
          다시 시도
        </button>
      </div>
    );

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="bg-[#1c1c1c] text-white rounded-xl shadow-lg w-full max-w-2xl p-8 flex flex-col gap-6">
        {/* ✅ 작성자 */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img
              src={lp?.author?.avatar || "/default-avatar.png"}
              alt={lp?.author?.name || "작성자"}
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <span>{lp?.author?.name}</span>
          </div>
          <span>{lp && new Date(lp.createdAt).toLocaleDateString()}</span>
        </div>

        {/* ✅ 제목 */}
        <h1 className="text-2xl font-bold">{lp?.title}</h1>

        {/* ✅ 썸네일 */}
        <div className="flex justify-center">
          <img
            src={lp?.thumbnail}
            alt={lp?.title}
            className="rounded-lg shadow-md w-72 h-72 object-cover"
          />
        </div>

        {/* ✅ 본문 */}
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {lp?.content}
        </p>

        {/* ✅ 태그 */}
        {lp?.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lp.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs bg-gray-700 rounded-full text-gray-100"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* ✅ 버튼들 */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button className="flex items-center gap-1 hover:opacity-80 transition">
            <Heart size={20} color="white" fill="white" />
            <span>{lp?.likes?.length ?? 0}</span>
          </button>

          <button className="hover:opacity-80">
            <Pencil size={18} />
          </button>

          <button className="hover:opacity-80">
            <Trash size={18} />
          </button>
        </div>

        {/* ✅ 댓글 */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">댓글</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setOrder(PAGINATION_ORDER.desc)}
                className={`px-3 py-1 text-sm rounded-md ${
                  order === PAGINATION_ORDER.desc
                    ? "bg-white text-black"
                    : "bg-gray-700"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setOrder(PAGINATION_ORDER.asc)}
                className={`px-3 py-1 text-sm rounded-md ${
                  order === PAGINATION_ORDER.asc
                    ? "bg-white text-black"
                    : "bg-gray-700"
                }`}
              >
                오래된순
              </button>
            </div>
          </div>

          {/* ✅ 댓글 입력 */}
          <div className="flex items-center gap-2 mb-6">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleAddComment}
              className="p-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white"
            >
              <Send size={18} />
            </button>
          </div>

          {/* ✅ 댓글 목록 */}
          <div className="flex flex-col gap-4">
            {comments?.pages
              ?.map((page) => page.data.data)
              ?.flat()
              ?.map((cmt) => (
                <div
                  key={cmt.id}
                  className="bg-gray-800 p-3 rounded-lg flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <span>{cmt.author?.name || "익명"}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(cmt.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm">{cmt.content}</p>
                </div>
              ))}
          </div>

          {/* ✅ 트리거 */}
          <div ref={ref} className="h-4" />
        </div>
      </div>
    </div>
  );
}
