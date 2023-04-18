import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListAndProfile from './pages/ListAndProfile';
import ErroBoundaryrPage from './pages/ErroBoundaryrPage';
import Home from './pages/Home';
import './App.css';

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
