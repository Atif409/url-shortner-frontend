import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBar = () => {
  // State to keep track of the selected item
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Define onClick handlers for each button
  const handleHomeClick = () => {
    console.log('Home clicked');
  };

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

  // Array of sidebar items with text, icon, and their respective onClick handlers
  const sidebarItems = [
    { icon: 'home', text: 'Home', onClick: handleHomeClick },
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
    <div className="min-h-screen grid grid-cols-12">
      <nav className="bg-primary-b h-[100vh] p-4 col-span-2">
        <ul>
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                item.onClick(); // Trigger the specific onClick handler
              }}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer mt-2
                ${selectedIndex === index ? 'bg-primary-c text-secondary-a' : 'text-secondary-b hover:bg-primary-a'}`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`${selectedIndex === index ? 'text-secondary-a' : 'text-secondary-b'}`}
              />
              <span className={`${selectedIndex === index ? 'text-secondary-a' : ''} hidden lg:inline`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="h-[100vh] bg-primary-c col-span-10"></div>
    </div>
  );
};

export default SideBar;
