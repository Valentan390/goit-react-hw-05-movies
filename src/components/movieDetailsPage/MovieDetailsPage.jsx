import { useEffect } from 'react';
import { useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  NavLink,
} from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { fetchMoviesDetails } from '../services/APIservices';
import Notiflix from 'notiflix';
import Loader from 'components/loader/Loader';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const { moviesid } = useParams();

  let activeClassName = {
    color: '#2196f3',
  };

  const location = useLocation();
  const navigate = useNavigate();

  const getYear = () => new Date(movie.release_date).getFullYear();

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);

      try {
        const { data } = await fetchMoviesDetails(moviesid);

        setMovie(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchMovieDetails();
  }, [moviesid]);

  return (
    <div className={styles.divMovieDetailsPage}>
      {loading && <Loader />}
      <button onClick={handleClick} className={styles.backButton}>
        Go back
      </button>
      {movie && (
        <div>
          <div className={styles.divMovie}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div>
              <h3>
                {movie.title}({getYear()})
              </h3>

              <p>User Score: {movie.vote_average.toFixed(1)}</p>

              <h3>Genres:</h3>
              <div className={styles.divGenres}>
                {movie.genres.map(moviegenre => {
                  return <p>{moviegenre.name}</p>;
                })}
              </div>

              <h3>Overview:</h3>

              <p>{movie.overview}</p>
              <hr />

              <>
                <h2>Additional Information</h2>
                <NavLink
                  to={`/movies/${moviesid}/reviews`}
                  style={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                  state={location.state}
                  className={styles.reviews}
                >
                  Reviews
                </NavLink>

                <NavLink
                  to={`/movies/${moviesid}/cast`}
                  style={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                  state={location.state}
                  className={styles.cast}
                >
                  Cast
                </NavLink>
                <hr />
              </>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
