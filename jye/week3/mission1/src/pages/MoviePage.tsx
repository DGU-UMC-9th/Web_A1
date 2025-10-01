import { useEffect } from "react";

export default function MoviePage() {
    useEffect(( ) => {
        const fetchMovies = async () => {    
            const response = fetch(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
            );
            console.log(response);
        };
        fetchMovies();
    }, []);
  return <div>MoviePage</div>;
}