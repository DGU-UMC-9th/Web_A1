import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import type { MovieResponse } from "../types/movie";

export default function MoviePage() {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  // ✅ useMemo로 URL 고정 (렌더마다 새로 안 만들어지게)
  const url = useMemo(
    () =>
      `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
    [category, page]
  );

  // ✅ 커스텀 훅 사용
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);
  const movies = data?.results || [];

  if (isError)
    return (
      <div className="flex items-center justify-center h-dvh text-red-500 text-2xl">
        오류가 발생했습니다.
      </div>
    );

  return (
    <>
      {/* 페이지 이동 버튼 */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                     hover:bg-[#bd2ab1] transition-all duration-200 
                     disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>

        <span>page #{page}</span>

        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                     hover:bg-[#bd2ab1] transition-all duration-200 
                     cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      {/* 로딩 중 */}
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {/* 영화 목록 */}
      {!isPending && (
        <div
          className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 
                     md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
