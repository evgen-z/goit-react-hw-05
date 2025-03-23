import { useState, useEffect } from "react";
import { fetchSearch } from "../../Components/API/Api";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../../Components/SearchBox/SearchBox";
import MoviesList from "../../Components/MoviesList/MoviesList";
import css from './MoviesPage.module.css'

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    async function getSearchResults() {
      try {
        setIsLoading(true);
        setError(false);
        const results = await fetchSearch(searchQuery);
        setMovies(results);
      } catch (err) {
        setError(true);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    getSearchResults();
  }, [searchQuery]);

  const handleSubmit = (values, { setSubmitting }) => {
    const query = values.searchQuery.trim();
    if (!query) {
      alert("Enter search query!");
      setSubmitting(false);
      return;
    }

    setSearchQuery(query);
    setSearchParams({ query });
    setSubmitting(false);
  };

  return (
    <>
      <SearchBox
        onSearch={handleSubmit}
        movies={movies}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        
      />
      {movies.length > 0 && <MoviesList movies={movies} />}
    </>
  );
}
