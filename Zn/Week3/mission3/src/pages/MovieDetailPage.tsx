import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
  tagline: string;
}

interface Credit {
  id: number;
  name: string;
  profile_path: string | null;
  job?: string; // 감독 등
  character?: string; // 배우 등
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Credit[]>([]);
  const [crew, setCrew] = useState<Credit[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const [detailRes, creditRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovie(detailRes.data);
        setCast(creditRes.data.cast.slice(0, 10)); // 주요 배우 10명만
        setCrew(creditRes.data.crew.filter((p: Credit) => p.job === "Director"));
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isPending)
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center text-xl mt-10">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );

  if (!movie) return null;

  return (
    <div className="text-white bg-[#121212] min-h-screen">
      {/* 상단 메인 섹션 */}
      <div className="flex flex-col md:flex-row gap-10 p-10">
        {/* 포스터 */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl shadow-lg w-full md:w-[300px]"
        />

        {/* 영화 정보 */}
        <div className="flex flex-col justify-center gap-3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="italic text-gray-400">{movie.tagline}</p>
          <p>
            <span className="font-semibold">평점:</span> ⭐ {movie.vote_average}
          </p>
          <p>
            <span className="font-semibold">개봉:</span> {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">러닝타임:</span> {movie.runtime}분
          </p>
          <p className="mt-3 leading-relaxed text-gray-300">{movie.overview}</p>
        </div>
      </div>

      {/* 감독/출연진 */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-5 border-b border-gray-700 pb-2">
          감독 / 출연
        </h2>

        {/* 감독 */}
        {crew.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-[#dda5e3]">🎬 감독</h3>
            <div className="flex flex-wrap gap-6">
              {crew.map((person) => (
                <div key={person.id} className="text-center">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={person.name}
                    className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                  />
                  <p>{person.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 배우 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#dda5e3]">🎭 출연진</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                  className="rounded-xl w-full h-[250px] object-cover mb-2"
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
