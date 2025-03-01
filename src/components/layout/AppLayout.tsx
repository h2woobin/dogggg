
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-full">
      <main className="page-container pb-16">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default AppLayout;
