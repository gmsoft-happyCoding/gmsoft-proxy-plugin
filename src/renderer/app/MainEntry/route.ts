import React from 'react';
import { TopRoute } from '../../enums/Route';

const route: RouteInterface[] = [
  {
    path: TopRoute.PROJECT_MANAGE,
    name: '项目管理',
    element: React.lazy(() => import('../Main')),
  },
  {
    path: TopRoute.PROJECT_ADD,
    name: '项目新增',
    element: React.lazy(() => import('../Project')),
  },
];

export default route;
