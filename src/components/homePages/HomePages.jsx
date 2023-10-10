import React from 'react';
import Notiflix from 'notiflix';
import Loader from 'components/loader/Loader';
import { getMovies } from '../services/APIservices';
import { useEffect, useState } from 'react';
import TrendingMoviesList from '../trendingMovies/TrendingMoviesList';
import style from './HomePages.module.css';

const HomePages = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data } = await getMovies();

        if (data.totalHits < 1) {
          Notiflix.Notify.failure(
            'Sorry, nothing was found for your request. Please try again.'
          );

          setLoading(false);
        }

        setLoading(false);
        setMovies(data.results);
      } catch (error) {
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={style.divHomePages}>
      {movies && <h1>Trending today</h1>}
      {loading && <Loader />}
      {movies && <TrendingMoviesList movies={movies} />}
    </div>
  );
};

export default HomePages;
