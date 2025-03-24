import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { fetchDetails } from "../../сomponents/API/Api";
import { Link, NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css"
import clsx from "clsx";

const linkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [movieId]);

  if (isLoading) return <b>Loading...</b>;
  if (error) return <b>Error loading movie details...</b>;
  if (!movieDetails) return <p>No movie details available.</p>;

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const imageUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : defaultImg;

  return (
    <>
      <Link className={css.backLink} to={backLink.current}>Return</Link>

      {isLoading && <b>Loading...</b>}
      {error && <b>Error...</b>}

      <div className={css.container}>
        <div>
          {movieDetails.poster_path && (
            <img
                className={css.img}
              src={imageUrl}
              alt={movieDetails.title || "No image available..."}
            />
          )}
        </div>
        <div>
          <h2 className={css.h2}>{movieDetails.title}</h2>
          <p>User score: {(movieDetails.vote_average * 10).toFixed(0)}%</p>
          <h3 className={css.h3}>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3 className={css.h3}>Genres</h3>
          <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <h4 className={css.h4}>Additional information:</h4>
      <ul className={css.ul}>
        <li className={css.li}>
          <NavLink className={linkClass} to={`/movies/${movieId}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink className={linkClass} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
