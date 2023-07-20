import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Blog from '../pages/Blog';
import Blogs from '../pages/Blogs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Write from '../pages/Write';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'blogs',
        children: [
          {
            index: true,
            element: <Blogs />,
          },
          {
            path: ':id',
            element: <Blog />,
          },
        ],
      },
      {
        path: 'write',
        element: <Write />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
export default AppRoutes;
