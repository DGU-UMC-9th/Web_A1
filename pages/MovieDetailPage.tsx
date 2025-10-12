import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Credits {
  cast: { id: number; name: string; character: string; profile_path: string | null }[];
  crew: { id: number; name: string; job: string; profile_path: string | null }[];
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useCustomFetch<MovieDetails>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    [movieId]
  );

  const {
    data: credits,
    isPending: isCreditPending,
    isError: isCreditError,
  } = useCustomFetch<Credits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    [movieId]
  );

  if (isMoviePending || isCreditPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isMovieError || isCreditError || !movie || !credits) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* 영화 상세 정보 */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
          <p className="text-gray-400 mb-2">
            개봉일: {movie.release_date} | 평점 ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <p className="mb-4">{movie.overview}</p>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-[#b2dab1] px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 출연진 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.cast.slice(0, 12).map((member) => (
            <div key={member.id} className="text-center">
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={member.name}
                className="w-28 h-28 rounded-full object-contain shadow-md mx-auto mb-2 bg-gray-200"
              />
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
