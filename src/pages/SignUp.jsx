import React, { useState, useRef, useEffect } from 'react';

import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { registerUser } from '../services/user.api';
import SignUpIllus from '../assets/grapichs/signup_illus.svg';
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
const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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

  const handleSignUp = async () => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-:])[A-Za-z\d@$!%*?&#\-:]{8,}$/;
    if (!email || !password || !confirmPassword || !userName) {
      customToast('All fields are required');
    } else if (password !== confirmPassword) {
      customToast('Passwords do not match');
    } else if (!validateEmail(email)) {
      customToast('Email is not valid');
    } else if (passwordCriteria.test(password) == false) {
      customToast(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    }

    // Add your sign up logic here
    else {
      const userData = { user_name: userName, email: email, password: password };

      try {
        setIsSignUpLoading(true);
        const response = await registerUser(userData);
        customToast(response.data.message);
        if (response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        customToast('Sorry! Something went wrong. Please try again later.');
      }
    }
    setIsSignUpLoading(false);
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
              <img src={SignUpIllus} alt="Sign Up Image" />
            </div>
          </div>
          <div className=" grid sm:grid-cols-1 z-40 1025:col-span-8 col-span-12 justify-items-center align-items-center bg-primary-c 1025:bg-transparent 1025:rounded-none rounded-lg 1025:shadow-sm shadow-2xl md:w-1/2 1025:h-full  ">
            <div className="flex items-center justify-center mt-12 ">
              <div className="relative flex flex-col items-center justify-center rounded-xl ">
                <h4 className="text-secondary-a text-2xl">Create your account</h4>
                <div className="flex w-full px-4 justify-center items-center">
                  <Button
                    text="Already Registered? Log in here"
                    onClick={() => {
                      navigate('/login');
                    }}
                    className="text-secondary-a hover:text-primary-a "
                  />
                </div>
                <div
                  className="h-0.5 w-64 bg-primary-a mt-2 opacity-50
     "
                ></div>

                <form
                  className="flex justify-center items-center flex-col mb-2 w-80 max-w-screen-lg sm:w-96  "
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Submitted!');
                  }}
                >
                  <div className="mb-4 flex flex-col gap-8 justify-center items-center">
                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="text"
                        value={userName}
                        onChange={handleUserNameChange}
                        label="Please Enter User Name"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-80
              "
                      />
                    </div>
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

                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder=" "
                        label="Please Confirm Password"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a
              hover:opacity-80
              "
                      />
                    </div>
                  </div>
                  <Button
                    text="Sign Up"
                    className="mt-6 bg-primary-a text-secondary-b w-24 h-8 flex justify-center items-center
          hover:opacity-75
          "
                    onClick={() => {
                      handleSignUp();
                    }}
                    isLoading={isSignUpLoading}
                  />
                </form>
                <div className="flex flex-row justify-between items-center mt-2">
                  <div className="h-1 w-24 bg-primary-a opacity-50"></div>
                  <p className="mx-4 text-primary-a  ">OR</p>
                  <div className="h-1 w-24 bg-primary-a opacity-50"></div>
                </div>

                <div className="flex justify-between items-center mt-2 mb-2">
                  <Button
                    text="Sign up with"
                    iconShow={[
                      ['fa-brands', 'google'],
                      ['fa-brands', 'microsoft'],
                      ['fa-brands', 'apple'],
                    ]}
                    iconPosition="right"
                    iconClassName="text-primary-b text-xl bg-primary-c w-8 h-6  flex justify-center items-center  "
                    className="mt-2 bg-primary-a text-secondary-b w-auto h-8 flex justify-center items-center 
          hover:opacity-75
          "
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
