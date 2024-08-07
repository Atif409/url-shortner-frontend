import SignUp from './pages/SignUp'
import { ThemeProvider } from './context/themeContext';

import './fontAwesome';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Header from './components/Header';
import Home from './pages/Home';
import Card from './components/Card';
const App = () => {

  return (
    <ThemeProvider>
      <div className="">
        {/* <Card/> */}
        {/* <Home /> */}

        <SignUp />
        {/* <Login/> */}
        {/* <Forgot/> */}
      </div>



    </ThemeProvider>




  )
}

export default App
