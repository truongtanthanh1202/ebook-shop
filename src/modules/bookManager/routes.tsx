import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { RouteName } from '@/shared/constants';

const BookReading = lazy(() => import('./pages/BookReading/BookReading'));

const routes: RouteObject[] = [
  {
    path: `/${RouteName.BOOK_DETAILS}/:bookId`,
    element: <BookReading />,
  },
];

export default routes;
