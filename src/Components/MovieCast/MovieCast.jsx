import { useEffect, useState } from "react";
import { fetchCast } from "../../Components/API/Api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [moviesCast, setMoviesCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchCast(movieId);

        if (data && Array.isArray(data.cast)) {
          setMoviesCast(data.cast);
        } else {
          setMoviesCast([]);
        }
      } catch (error) {
        setError(true);
        setMoviesCast([]);
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Loading error!</p>;
  if (moviesCast.length === 0) return <p>Cast data missing</p>;

  const defaultImg =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  return (
    <div>
      <ul className={css.ul}>
        {moviesCast.map((actor) => {
          const imageUrl = actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : defaultImg;
          return (
            <li className={css.li} key={actor.id}>
              {imageUrl && (
                <img className={css.img} src={imageUrl} alt={actor.name} />
              )}
              <p className={css.actor}>{actor.name}</p>
              <p className={css.p}>as:</p>
              <p className={css.character}>{actor.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
