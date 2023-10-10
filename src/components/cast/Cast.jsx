import { fetchMoviesCredits } from 'components/services/APIservices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Cast.module.css';
import Loader from 'components/loader/Loader';
import Notiflix from 'notiflix';

const Cast = () => {
  const { moviesid } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      // setStatus(fetchStatus.LOADING);

      try {
        const { data } = await fetchMoviesCredits(moviesid);
        setLoading(true);

        if (data.cast.length < 1) {
          Notiflix.Notify.failure(
            'Sorry, nothing was found for your request. Please try again.'
          );

          setLoading(false);
          return;
        }

        setCast(data.cast);
        setLoading(false);
      } catch (error) {
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchCast();
  }, [moviesid]);

  return (
    <div>
      {loading && <Loader />}
      <ul className={styles.castList}>
        {cast.map(cas => {
          return (
            <li key={cas.id} className={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w300${cas.profile_path}`}
                alt={`${cas.name} portrait`}
              />
              <div>
                <p>Name: {cas.name}</p>
                <p>Character: {cas.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
