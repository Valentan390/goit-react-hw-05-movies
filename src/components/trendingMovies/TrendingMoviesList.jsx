import React from 'react';
import { Link } from 'react-router-dom';

const TrendingMoviesList = ({ movies, prevLocation }) => {
  return (
    <div style={{ paddingLeft: '15%' }}>
      <ul>
        {movies.map(({ id, original_title, original_name }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: prevLocation }}>
                <h3>{original_title || original_name}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrendingMoviesList;
