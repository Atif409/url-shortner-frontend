import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { localStorageService } from '../utils/localStorageService';
import LogInIllus from '../assets/grapichs/login_illus.webp';
import { loginUser } from '../services/user.api';
import { useNavigate } from 'react-router-dom';
import { createToast } from 'react-simple-toasts';
const customToast = createToast({
  duration: 3000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'top-right',
  maxVisibleToasts: 1,

  render: (message) => <b className="my-toast bg-primary-b text-secondary-b p-2 rounded-2xl ">{message}</b>,
});
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogInLoading, setIsLoginLoading] = useState(false);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogIn = async () => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-:])[A-Za-z\d@$!%*?&#\-:]{8,}$/;
    if (!password || !email) {
      customToast('All fields are required');
    } else if (!validateEmail(email)) {
      customToast('Email is not valid');
    } else if (passwordCriteria.test(password) == false) {
      customToast('Password is not valid.');
    } else {
      const userData = { email: email, password: password };
      try {
        setIsLoginLoading(true);
        const response = await loginUser(userData);
        console.log(response, response.success);
        if (response.data.success) {
          const storedData = localStorageService.setItem('token', response.data.data.token);
          const storedUserData = localStorageService.setItem('user_id', response.data.data.user_id);
          if (storedData && storedUserData) {
            setData(storedData);
          }
          navigate('/app/dashboard');
        }
        customToast(response.data.message);
      } catch (error) {
        customToast('Sorry! Something went wrong. Please try again later.');
      }
    }
    setIsLoginLoading(false);
  };

  return (
    <div className="overflow-hidden relative ">
      <div
        className="absolute bg-primary-c rounded-full  z-10 translate-x-75% 1025:grid hidden "
        style={{ width: `${width}px`, height: `${width}px` }}
      ></div>
      <div className="bg-primary-a flex flex-col lg:z-20 z-0 min-h-screen ">
        <Header />

        <main
          className="grid sm:grid-cols-12 gap-4 w-full 1025:h-full h-[90vh] mt-4 align-items-center place-content-center justify-items-center
 lg:z-30 z-0 

        "
        >
          <div className="align-items-center place-content-center lg:col-span-4  1025:grid hidden h-[82.5vh] ">
            <div className="bg-secondary-b w-1/2 h-60 lg:w-80 lg:h-96 flex justify-center items-center rounded-md">
              <img src={LogInIllus} alt="Sign Up Image" />
            </div>
          </div>

          <div className=" grid sm:grid-cols-1 z-40 1025:col-span-8 col-span-12 justify-items-center align-items-center bg-primary-c 1025:bg-transparent 1025:rounded-none rounded-lg 1025:shadow-sm shadow-2xl md:w-1/2 1025:h-full h-[70vh]  ">
            <div className="flex items-center justify-center mt-12 ">
              <div className="relative flex flex-col items-center justify-center ">
                <h4 className="text-secondary-a text-2xl">Welcome Back!</h4>
                <div className="flex w-full pt-2 px-4 justify-center items-center">
                  <Button
                    text="Don’t have an account? Sign Up"
                    onClick={() => {
                      navigate('/signup');
                    }}
                    className="text-secondary-a hover:text-primary-a "
                  />
                </div>
                <div
                  className="h-0.5 w-64 bg-primary-a mt-1 mb-8 opacity-50
     "
                ></div>

                <form
                  className="flex justify-center items-center flex-col mb-2 w-80  sm:w-96  "
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Submitted!');
                  }}
                >
                  <div className="mb-4 flex flex-col gap-8 justify-center items-center">
                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        label="Please Enter Email"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-80
              "
                      />
                    </div>
                    <div className=" h-11 w-full min-w-[200px]">
                      <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder=" "
                        label="Please Enter Password"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a
              hover:opacity-80
              "
                      />
                    </div>
                  </div>
                  <div className=" mt-2 flex w-full pt-2 px-4 justify-center items-center"></div>
                  <Button
                    text="Log in"
                    onClick={handleLogIn}
                    isLoading={isLogInLoading}
                    className="mt-2 bg-primary-a text-secondary-b w-24 h-8 flex justify-center items-center
          hover:opacity-75
          "
                  />
                  <div
                    className=" mt-4
     "
                  ></div>
                  <Button
                    text="Forgot your password? Reset"
                    onClick={() => {
                      navigate('/change-password');
                    }}
                    className="text-secondary-a hover:text-primary-a "
                  />
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
