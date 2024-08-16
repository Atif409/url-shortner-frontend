import React, { useState } from 'react';
import Button from '../components/Button'; // Import the Button component
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  return (
    <header className="z-30 bg-primary-a ">
      <nav className="flex h-auto w-auto mt-4 justify-between md:h-16 bg-transparent">
        <div className="flex w-full justify-between">
          {/* Logo section */}
          <div
            className={`flex px-6 w-1/2 items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center ${open ? 'hidden' : 'flex'}`}
          >
            <NavLink
              to="/"
              className="flex flex-col justify-center items-center font-hangyaboly text-primary-c text-2xl"
            >
              <span>ULR</span> <span>SHORTNER</span>
            </NavLink>
          </div>

          {/* Mobile menu */}
          <div className={`flex flex-col w-full absolute h-auto md:hidden ${open ? 'flex' : 'hidden'}`}>
            <div className="flex flex-col items-center relative z-30 bg-primary-a justify-center gap-2 font-poppins text-primary-c text-xl">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
              <NavLink to="/about">About Us</NavLink>
              {/* Replacing button tags with Button component */}
              {!isAuthenticated && (
                <Button
                  text="Log in"
                  className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center "
                  onClick={() => navigate('/login')} // Navigate to the Login page
                />
              )}
              {!isAuthenticated && (
                <Button
                  text="Sign up free"
                  className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center mb-4 "
                  onClick={() => navigate('/signup')} // Navigate to the Login page
                />
              )}
              {isAuthenticated && (
                <Button
                  text="DashBoard"
                  className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center mb-4 "
                  onClick={() => navigate('/app')} // Navigate to the Login page
                />
              )}
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden w-3/5 items-center justify-evenly font-poppins text-primary-c text-xl md:flex ">
            <NavLink to="/" className="hover:opacity-75">
              Home
            </NavLink>
            <NavLink to="/services" className="hover:opacity-75">
              Services
            </NavLink>
            <NavLink to="/contact" className="hover:opacity-75">
              Contact Us
            </NavLink>
            <NavLink to="/about" className="hover:opacity-75">
              About Us
            </NavLink>
          </div>

          <div className="hidden w-1/5 items-center justify-evenly  font-semibold md:flex">
            {/* Replacing button tags with Button component */}
            {isAuthenticated == false && (
              <Button
                text="Log in"
                className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center
            md:text-[12px] lg:text-md hover:opacity-75
            "
                onClick={() => navigate('/login')} // Navigate to the Login page
              />
            )}
            {isAuthenticated == false && (
              <Button
                text="Sign Up free"
                className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center 
             md:text-[12px] lg:text-md 
             hover:opacity-75
            "
                onClick={() => navigate('/signup')} // Navigate to the Login page
              />
            )}
            {isAuthenticated && (
              <Button
                text="DashBoard"
                className="w-auto h-8 rounded-lg bg-primary-c text-primary-b flex justify-center items-center mb-4 "
                onClick={() => navigate('/app')} // Navigate to the Login page
              />
            )}
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
