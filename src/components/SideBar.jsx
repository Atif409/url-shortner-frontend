import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { localStorageService } from '../utils/localStorageService';
import { useNavigate } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
export const SideBar = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const splitPath = location.pathname.split('/');
    if (splitPath[splitPath.length - 1] == 'app') {
      setSelectedIndex(0);
    } else {
      sidebarItems.forEach((val, index) => {
        if (splitPath[splitPath.length - 1] == val.path) {
          setSelectedIndex(index);
        }
      });
    }
  }, [location.pathname]);
  const handleHomeClick = () => {
    navigate('/');
    console.log('Home clicked');
  };
  const handleDashboardClick = () => {
    navigate('/app/dashboard');
    console.log('Dashboard clicked');
  };

  const handleCreateLinksClick = () => {
    navigate('/app/create-link');
    console.log('Create Links clicked');
  };

  const handleCreateSmartLinksClick = () => {
    navigate('/app/create-smart-links');
    console.log('Create Smart Links clicked');
  };

  const handleCreateQRCodesClick = () => {
    navigate('/app/create-qrcodes');
    console.log('Create QR Codes clicked');
  };

  const handleManageLinksClick = () => {
    navigate('/app/manage-links');
    console.log('Manage Links clicked');
  };

  const handleAnalyticsClick = () => {
    navigate('/app/analytics');
    console.log('Analytics clicked');
  };

  const handleProfileSettingsClick = () => {
    navigate('/app/profile-settings');
    console.log('Profile Settings clicked');
  };

  const handleAPIAccessClick = () => {
    console.log('API Access clicked');
  };

  const handleLogoutClick = () => {
    localStorageService.removeItem('token');
    localStorageService.removeItem('user_id');
    window.location.reload();
  };

  const sidebarItems = [
    { path: '/', icon: 'home', text: 'Home', onClick: handleHomeClick },
    { path: 'dashboard', icon: 'tachometer-alt', text: 'Dashboard', onClick: handleDashboardClick },
    { path: 'create-link', icon: 'link', text: 'Create Links', onClick: handleCreateLinksClick },
    { path: 'create-smart-link', icon: 'magic', text: 'Create Smart Links', onClick: handleCreateSmartLinksClick },
    { path: 'create-qrcode', icon: 'qrcode', text: 'Create QR Codes', onClick: handleCreateQRCodesClick },
    { path: 'manage-links', icon: 'cog', text: 'Manage Links', onClick: handleManageLinksClick },
    { path: 'analytics', icon: 'chart-line', text: 'Analytics', onClick: handleAnalyticsClick },
    { path: 'profile-settings', icon: 'user', text: 'Profile Settings', onClick: handleProfileSettingsClick },
    { path: 'api-access', icon: 'key', text: 'API Access', onClick: handleAPIAccessClick },

    { path: '', icon: 'sign-out-alt', text: 'Log out', onClick: handleLogoutClick },
  ];

  return (
    <div className=" grid grid-cols-12 h-[100vh] relative">
      <nav
        className={`bg-primary-b p-4 col-span-2 h-[100vh] xsm:absolute xsm:top-0 xsm:left-0 ${!open ? 'xsm:-translate-x-full' : 'xsm:translate-x-0'} lg:translate-x-0 lg:block lg:relative`}
      >
        <ul>
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                item.onClick();
              }}
              className={`flex items-center justify-center lg:justify-start space-x-3 p-2 rounded-lg cursor-pointer mt-2
                ${selectedIndex === index ? 'bg-primary-c text-secondary-a' : 'text-secondary-b hover:bg-primary-a'}`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`${selectedIndex === index ? 'text-secondary-a' : 'text-secondary-b'} 
                  ${!document.querySelector('body').classList.contains('lg') ? 'text-xl' : 'text-base'}`}
              />
              <span className={`${selectedIndex === index ? 'text-secondary-a' : ''}  lg:inline`}>{item.text}</span>
            </li>
          ))}
        </ul>
      </nav>
      <FontAwesomeIcon
        onClick={() => {
          setOpen(!open);
        }}
        className={`${open ? 'text-secondary-b' : 'text-secondary-a'} z-50 lg:hidden xsm:col-span-2 xsm:ml-2 xsm:mt-2`}
        icon={faBars}
      />
      <div className=" bg-primary-c xsm:col-span-11 lg:col-span-10 h-[100vh] overflow-y-auto">{children}</div>
    </div>
  );
};
