import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { changeUserPassword, forgotPassword, verifyResetPasswordToken } from '../services/user.api';
import toast from 'react-simple-toasts';
import { localStorageService } from '../utils/localStorageService';
import { useNavigate } from 'react-router-dom';
const CreatePassword = () => {
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const handleResetCodeChange = (e) => setResetCode(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
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

  const handleChangePassword = async () => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-:])[A-Za-z\d@$!%*?&#\-:]{8,}$/;
    const email = localStorageService.getItem('user-reset-email');
    if (!password || !confirmPassword || !resetCode) {
      toast('All fields are required');
    } else if (!passwordCriteria.test(password) || !passwordCriteria.test(confirmPassword)) {
      toast('Password is not valid');
    } else if (password != confirmPassword) {
      toast('Passwords do not match');
    } else if (!email) {
      toast('Something went wrong. Please try to forgot password again.');
    }

    // Add your Forgot logic here
    else {
      const verifyTokenData = { email: email, reset_token: resetCode };

      try {
        setIsChangePasswordLoading(true);
        const verifyTokenResponse = await verifyResetPasswordToken(verifyTokenData);
        if (!verifyTokenResponse.data.success) {
          toast('Invalid reset token. Please try again');
        } else {
          const createNewPasswordData = { email: email, password: password };
          const response = await changeUserPassword(createNewPasswordData);
          if (response.data.success) {
            localStorageService.removeItem('user-reset-email');
            toast('Password reset successfully. Login with the new password');
            navigate('/login');
          }
        }
      } catch (error) {
        toast('Sorry! Something went wrong. Please try again later.');
      }
    }
    setIsChangePasswordLoading(false);
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
          <div className="align-items-center place-content-center lg:col-span-4  1025:grid hidden  lg:h-[83vh]">
            <div className="bg-secondary-b w-1/2 h-60 lg:w-80 lg:h-96 flex justify-center items-center rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcY0hCdAgzbtF2AM8B9ESuvzALzmiDNR9Ow&s"
                alt="Sign Up Image"
              />
            </div>
          </div>
          <div className=" grid sm:grid-cols-1 z-40 1025:col-span-8 col-span-12 justify-items-center align-items-center bg-primary-c 1025:bg-transparent 1025:rounded-none rounded-lg 1025:shadow-sm shadow-2xl md:w-1/2 1025:h-full  ">
            <div className="flex items-center justify-center mt-12 ">
              <div className="relative flex flex-col items-center justify-center rounded-xl ">
                <h4 className="text-secondary-a text-2xl font-bold tracking-wider">Reset Password</h4>
                <p className="text-secondary-a text-lg mt-1 mb-4">Check your email for a reset code</p>

                <form
                  className="flex justify-center items-center flex-col mb-2 w-80 max-w-screen-lg sm:w-96 mt-4 "
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Submitted!');
                  }}
                >
                  <div className="mb-4 flex flex-col gap-8 justify-center items-center">
                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="text"
                        value={resetCode}
                        onChange={handleResetCodeChange}
                        label="Please Enter Reset Code"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
                      />
                    </div>
                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        label="Please Enter Password"
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
                      />
                    </div>
                    <div className="h-11 w-full min-w-[200px]">
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        label="Please Enter Password again."
                        labelClassName="my-1"
                        className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
                      />
                    </div>
                  </div>
                  <Button
                    text="Reset"
                    className="mt-8 bg-primary-a text-secondary-b w-24 h-8 flex justify-center items-center
          hover:opacity-75
          "
                    onClick={() => {
                      handleChangePassword();
                    }}
                    isLoading={isChangePasswordLoading}
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

export default CreatePassword;
