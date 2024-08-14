import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateLinks from '../pages/CreateLinks';

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
  };

  const handleCreateLinksClick = () => {
    console.log('Create Links clicked');
  };

  const handleCreateSmartLinksClick = () => {
    console.log('Create Smart Links clicked');
  };

  const handleCreateQRCodesClick = () => {
    console.log('Create QR Codes clicked');
  };

  const handleManageLinksClick = () => {
    console.log('Manage Links clicked');
  };

  const handleAnalyticsClick = () => {
    console.log('Analytics clicked');
  };

  const handleProfileSettingsClick = () => {
    console.log('Profile Settings clicked');
  };

  const handleAPIAccessClick = () => {
    console.log('API Access clicked');
  };

  const handleLogoutClick = () => {
    console.log('Log out clicked');
  };

  const sidebarItems = [
    { icon: 'tachometer-alt', text: 'Dashboard', onClick: handleDashboardClick },
    { icon: 'link', text: 'Create Links', onClick: handleCreateLinksClick },
    { icon: 'magic', text: 'Create Smart Links', onClick: handleCreateSmartLinksClick },
    { icon: 'qrcode', text: 'Create QR Codes', onClick: handleCreateQRCodesClick },
    { icon: 'cog', text: 'Manage Links', onClick: handleManageLinksClick },
    { icon: 'chart-line', text: 'Analytics', onClick: handleAnalyticsClick },
    { icon: 'user', text: 'Profile Settings', onClick: handleProfileSettingsClick },
    { icon: 'key', text: 'API Access', onClick: handleAPIAccessClick },
    { icon: 'sign-out-alt', text: 'Log out', onClick: handleLogoutClick },
  ];

  return (
    <div className=" grid grid-cols-12">
      <nav className="bg-primary-b p-4 col-span-2">
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
              <span className={`${selectedIndex === index ? 'text-secondary-a' : ''} hidden lg:inline`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className=" bg-primary-c col-span-10">
        <CreateLinks />
      </div>
    </div>
  );
};

export default SideBar;
