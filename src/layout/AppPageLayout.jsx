import React from 'react';
import { SideBar } from '../components/SideBar';
import { Outlet } from 'react-router-dom';
const AppPageLayout = () => {
  return (
    <div className="h-[100vh]">
      <SideBar children={<Outlet />} />
    </div>
  );
};

export default AppPageLayout;
