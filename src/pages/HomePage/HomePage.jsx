import { useState, useEffect } from "react";
import { fetchMovies } from "../../Components/API/Api";
import MoviesList from "../../Components/MoviesList/MoviesList";
import css from "./HomePage.module.css"

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);
  return (
    <div>
      <h2 className={css.h2}>Trending movies today:</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Load failed. Please try again later...</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}
