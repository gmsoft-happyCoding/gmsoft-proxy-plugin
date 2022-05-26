import React from 'react';
import { Routes } from 'react-router-dom';
import { useRoute, useGetRoutePath } from '../../hooks';
import Loading from '../../components/Loading';
import route from './route';

const MainEntry = () => {
  const path = useGetRoutePath('/');

  const routeRender = useRoute(path, route);

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>{routeRender}</Routes>
    </React.Suspense>
  );
};

export default MainEntry;
