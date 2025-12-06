import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. The Navigation Bar stays at the top */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <Outlet /> renders the child route (e.g., Dashboard.jsx) here */}
          <Outlet />
        </div>
      </main>
      
      {/* 3. Optional Footer */}
      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Company Payroll System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;