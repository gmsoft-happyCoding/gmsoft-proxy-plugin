import React from 'react';
import { TopRoute } from '../../enums/Route';

const route: RouteInterface[] = [
  {
    path: TopRoute.MAIN,
    name: '主页',
    element: React.lazy(() => import('../Main')),
  },
];

export default route;
