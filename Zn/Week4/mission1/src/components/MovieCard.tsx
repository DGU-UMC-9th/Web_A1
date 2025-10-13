import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>(); // 현재 URL에서 category 추출

  const handleClick = () => {
    // category가 있으면 /movies/:category/:movieId 로 이동
    // 없으면 기본적으로 /movies/:movieId 로 이동
    if (category) {
      navigate(`/movies/${category}/${movie.id}`);
    } else {
      navigate(`/movies/${movie.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer
                 w-44 transition-transform duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`}
        className="w-full h-auto object-cover"
      />

      {isHovered && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 
                     to-transparent backdrop-blur-sm flex flex-col 
                     justify-end items-start text-white p-3"
        >
          <h2 className="text-sm font-semibold leading-snug line-clamp-2">
            {movie.title}
          </h2>
          <p className="text-xs text-gray-300 leading-snug mt-1 line-clamp-4">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
