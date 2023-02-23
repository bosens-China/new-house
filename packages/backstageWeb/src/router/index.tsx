import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/index.js';
import NonExistent from '@/layout/nonExistent.js';
const Subscribe = lazy(() => import('@/pages/subscribe/index.js'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NonExistent></NonExistent>,
    children: [
      {
        path: '',
        element: <Subscribe></Subscribe>,
      },
    ],
  },
]);
