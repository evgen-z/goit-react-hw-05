import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../Components/API/Api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [noReviewsMessage, setNoReviewsMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchReviews(movieId);

        if (data && Array.isArray(data.results) && data.results.length > 0) {
          setReviews(data.results);
          setNoReviewsMessage("");
        } else {
          setReviews([]);
          setNoReviewsMessage("We don't have reviews for this movie"); // Устанавливаем сообщение
        }
      } catch (error) {
        setError(true);
        setReviews([]);
        setNoReviewsMessage("Error, please try later.");
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading reviews. Please try again later.</p>}

      {reviews.length > 0 ? (
        <ul className={css.ul}>
          {reviews.map((review) => (
            <li className={css.li} key={review.id}>
              <h3 className={css.author}>{review.author}:</h3>
              <p className={css.review}>"{review.content}"</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{noReviewsMessage}</p>
      )}
    </div>
  );
}
