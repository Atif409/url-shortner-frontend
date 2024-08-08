import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => setEmail(e.target.value);
  return (
    <div className="bg-primary-a min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="w-full flex flex-row flex-grow justify-between mt-4">
        <div className="w-2/5 flex justify-center items-center">
          <div className="bg-secondary-b w-96 h-96 flex justify-center items-center rounded-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcY0hCdAgzbtF2AM8B9ESuvzALzmiDNR9Ow&s"
              alt="Sign Up Image"
            />
          </div>
        </div>

        <div className="w-3/5  bg-primary-c rounded-tl-full flex justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center rounded-xl ">
              <h4 className="text-secondary-a text-2xl">Forgot Password</h4>

              <div className="flex w-full px-4 justify-center items-center mb-8">
                <Button
                  text="Create New Password"
                  onClick={() => {
                    console.log('Button already have account');
                  }}
                  className="text-secondary-a hover:text-primary-a"
                />
              </div>

              <form
                className="flex justify-center items-center flex-col mb-2 w-80 max-w-screen-lg sm:w-96"
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
                      labelClassName="my-1 text-sm"
                      className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a"
                    />
                  </div>
                </div>
                <Button
                  text="Send"
                  className="mt-8 bg-primary-a text-secondary-b w-24 h-8 flex justify-center items-center"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forgot;
