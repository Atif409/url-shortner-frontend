import { ThemeProvider } from './context/themeContext';
import router from './routes/root';
import './fontAwesome';
import { RouterProvider } from 'react-router-dom';
import 'react-simple-toasts/dist/theme/dark.css';

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
