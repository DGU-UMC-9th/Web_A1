import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { Movie } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

export default function MoviePage() {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useCustomFetch<{ results: Movie[] }>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
    [category, page]
  );

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {`<`}
        </button>
        <span>{page}페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>

      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
