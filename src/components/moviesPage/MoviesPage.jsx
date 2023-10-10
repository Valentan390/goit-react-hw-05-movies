import Loader from 'components/loader/Loader';
import MoviesSearchBar from 'components/moviesSearchBar/MoviesSearchBar';
import { fetchByQuery } from 'components/services/APIservices';
import TrendingMoviesList from 'components/trendingMovies/TrendingMoviesList';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Notiflix from 'notiflix';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchRequest = searchParams.get('query');

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    const fetchMovie = async () => {
      setLoading(true);

      try {
        const { data } = await fetchByQuery(searchRequest);

        if (data.results.length < 1) {
          Notiflix.Notify.failure(
            'Sorry, nothing was found for your request. Please try again.'
          );

          setLoading(false);
          setMovies([]);
          return;
        }
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchMovie();
  }, [searchRequest]);

  function onSubmit(value) {
    setSearchParams({ query: value });
  }

  return (
    <div>
      <MoviesSearchBar onSearch={onSubmit} />
      {loading && <Loader />}
      {movies && <TrendingMoviesList movies={movies} prevLocation={location} />}
    </div>
  );
};

export default MoviesPage;
