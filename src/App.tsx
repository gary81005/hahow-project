import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { setUpAxios } from './utils';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const ListAndProfile = lazy(() => import('./pages/ListAndProfile'));
const ErroBoundaryrPage = lazy(() => import('./pages/ErroBoundaryrPage'));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
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
  setUpAxios();

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
