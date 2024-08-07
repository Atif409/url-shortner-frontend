import React, { useState } from 'react';
import Button from '../components/Button'; // Import the Button component

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='z-30 bg-primary-a ' >
      <nav className="flex h-auto w-auto mt-4 justify-between md:h-16 bg-transparent">
        <div className="flex w-full justify-between">
          {/* Logo section */}
          <div
            className={`flex px-6 w-1/2 items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center ${open ? 'hidden' : 'flex'}`}
          >
            <a href="" className='flex flex-col justify-center items-center font-hangyaboly text-primary-c text-2xl'>
              <span>ULR</span> <span>SHORTNER</span>
            </a>
          </div>

          {/* Mobile menu */}
          <div
            className={`flex flex-col w-full absolute h-auto md:hidden ${open ? 'flex' : 'hidden'}`}
          >
            <div className="flex flex-col items-center relative z-30 bg-primary-a justify-center gap-2 font-poppins text-primary-c text-xl">
              <a href="">Home</a>
              <a href="">Services</a>
              <a href="">Contact Us</a>
              <a href="">About Us</a>

              {/* Replacing button tags with Button component */}
              <Button text="Log in" className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center " onClick={() => console.log('Login clicked')} />
              <Button text="Sign up free" className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center mb-4 " onClick={() => console.log('Sign Up clicked')} />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden w-3/5 items-center justify-evenly font-poppins text-primary-c text-xl md:flex ">
            <a href="" className='hover:opacity-75'>Home</a>
            <a href="" className='hover:opacity-75'>Services</a>
            <a href="" className='hover:opacity-75'>Contact Us</a>
            <a href="" className='hover:opacity-75'>About Us</a>
          </div>

          <div className="hidden w-1/5 items-center justify-evenly  font-semibold md:flex">
            {/* Replacing button tags with Button component */}
            <Button text="Log in" className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center
            md:text-[12px] lg:text-md hover:opacity-75
            " onClick={() => console.log('Login clicked')} />
            <Button text="Sign Up free" className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center 
             md:text-[12px] lg:text-md 
             hover:opacity-75
            " onClick={() => console.log('Sign Up clicked')} />
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="text-primary-c w-10 h-10 relative focus:outline-none md:hidden z-30"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${open ? 'rotate-45' : '-translate-y-1.5'}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${open ? 'opacity-0' : ''}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${open ? '-rotate-45' : 'translate-y-1.5'}`}
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
