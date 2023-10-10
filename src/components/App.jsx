import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Layout = lazy(() => import('./layout/Layout'));
const HomePages = lazy(() => import('./homePages/HomePages'));
const MoviesPage = lazy(() => import('./moviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./movieDetailsPage/MovieDetailsPage')
);
const Reviews = lazy(() => import('./reviews/Reviews'));
const Cast = lazy(() => import('./cast/Cast'));

export const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePages />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:moviesid" element={<MovieDetailsPage />}>
              <Route path="/movies/:moviesid/reviews" element={<Reviews />} />
              <Route path="/movies/:moviesid/cast" element={<Cast />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
