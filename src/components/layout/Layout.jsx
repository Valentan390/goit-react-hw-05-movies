import Header from 'components/header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const layout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default layout;
