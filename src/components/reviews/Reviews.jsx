import { fetchMoviesReviews } from 'components/services/APIservices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Notiflix from 'notiflix';

const Reviews = () => {
  const { moviesid } = useParams();
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await fetchMoviesReviews(moviesid);

        if (data.results.length < 1) {
          setLoading(true);

          return;
        }

        setReviews(data.results);
      } catch (error) {
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchReviews();
  }, [moviesid]);

  return (
    <div>
      {loading && <h3>We don't have any reviews for this movie</h3>}
      <ul>
        {reviews.map(review => {
          return (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
