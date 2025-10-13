import './App.css';
import HomePage from './mission3/pages/HomePage';
import MoviePage from './mission3/pages/MoviePage';
import NotFoundPage from './mission3/pages/NotFoundPage';
import MovieDetailPage from './mission3/pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />
      },
      {
        path: '/movie/:movieID',
        element: <MovieDetailPage />
      }
    ],
  },
])

function App(): Element {
  return <RouterProvider router={router} />;
}

export default App;