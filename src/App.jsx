import SignUp from './pages/SignUp';
import { ThemeProvider } from './context/themeContext';

import './fontAwesome';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Header from './components/Header';
import Home from './pages/Home';
import Card from './components/Card';
import SideBar from './components/SideBar.jsx';
import ToggleButton from './components/ToggleButton.jsx';
import CreateLinks from './pages/CreateLinks.jsx';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

// toastConfig({ theme: 'dark' });

const App = () => {
  return (
    <ThemeProvider>
      <div className="">
        {/* <Card/> */}
        {/* <Home /> */}
        {/* <SignUp /> */}
        {/* <Login/> */}
        {/* <Forgot/> */}
        <SideBar />

        {/* <CreateLinks /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
