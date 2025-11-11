import { lazy } from 'react';
import { type RouteObject } from 'react-router';
// import { redirect } from 'react-router';
import { RouteName } from '@/shared/constants';

import HomePageRoutes from '@/modules/homepage/routes';
import BookManagerRoutes from '@/modules/bookManager/routes';

const NotFound = lazy(() => import('@/modules/notFound/NotFound'));

const routes: RouteObject[] = [
  {
    path: RouteName.NOT_FOUND,
    element: <NotFound />,
  },
  ...HomePageRoutes,
  ...BookManagerRoutes,
];

// async function authMiddleware({ context }, next) {
//   // Implement auth guard logic
//   const user = await getUser();
//   if (!user) {
//     throw redirect('/login');
//   }
//   context.set(userContext, user);
// }

export default routes;
