import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const Home = lazy(() => import('./pages/Home'))
const ListAndProfile = lazy(() => import('./pages/ListAndProfile'))
const ErroBoundaryrPage = lazy(() => import('./pages/ErroBoundaryrPage'))

const theme = createTheme();
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
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
