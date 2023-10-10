import React from 'react';
import { Link } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  return (
    <>
      <ul>
        {movies.map(({ id, original_title, original_name }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                <h3>{original_title || original_name}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MoviesList;
