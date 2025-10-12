import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieDetail } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';

const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            setIsPending(true);

            try {
                const res = await axios.get<MovieDetail>(
                    `${BASE_URL}/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovie(res.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (isPending || !movie) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-64 rounded-xl shadow-md"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-sm text-gray-400 mb-4">
                        {movie.release_date} ・ {movie.runtime}분 ・ 평점 {movie.vote_average}
                    </p>
                    <p className="mb-4">{movie.overview}</p>
                    <div className="flex gap-2 flex-wrap">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-green-800 text-white px-2 py-1 rounded text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;