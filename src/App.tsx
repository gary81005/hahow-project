import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListAndProfile from './pages/ListAndProfile';
import ErroBoundaryrPage from './pages/ErroBoundaryrPage';
import Home from './pages/Home';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />,
    errorElement: <ErroBoundaryrPage />,
  },
  {
    path: '/heroes',
    element: <ListAndProfile />,
    errorElement: <ErroBoundaryrPage />,
  },
  {
    path: '/heroes/:id',
    element: <ListAndProfile />,
    errorElement: <ErroBoundaryrPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
