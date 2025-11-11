import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { RouteName } from '@/shared/constants';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

const routes: RouteObject[] = [
  {
    path: RouteName.HOME,
    element: <HomePage />,
  },
];

export default routes;
